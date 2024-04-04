# Custom route decorator

[Github Link](https://github.com/gornoba/nestjs-describe/tree/d3c451500c9e01f2c3026952099b736f2afd7e09)

## Param 데코레이터

Nest는 HTTP 라우트 핸들러와 함께 사용할 수 있는 유용한 param 데코레이터 세트를 제공합니다. 아래는 제공된 데코레이터와 이들이 대표하는 일반 Express(또는 Fastify) 객체의 목록입니다.

- `@Request()`, `@Req()` => `req`
- `@Response()`, `@Res()` => `res`
- `@Next()` => `next`
- `@Session()` => `req.session`
- `@Param(param?: string)` => `req.params / req.params[param]`
- `@Body(param?: string)` => `req.body / req.body[param]`
- `@Query(param?: string)` => `req.query / req.query[param]`
- `@Headers(param?: string)` => `req.headers / req.headers[param]`
- `@Ip()` => `req.ip`
- `@HostParam()` => `req.hosts`

또한, 사용자 정의 데코레이터를 생성할 수 있습니다. 이것이 왜 유용한가요?

node.js 세계에서는 요청 객체에 속성을 첨부하는 것이 일반적인 관행입니다. 그런 다음 각 라우트 핸들러에서 다음과 같은 코드를 사용하여 수동으로 이를 추출합니다

```javascript
const user = req.user;
```

코드를 더 읽기 쉽고 투명하게 만들기 위해, `@User()` 데코레이터를 생성하고 모든 컨트롤러에서 재사용할 수 있습니다.

```typescript
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.session?.user;
  }
);
```

그런 다음 요구 사항에 맞는 곳이라면 어디서든 간단히 사용할 수 있습니다.

```typescript
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Get(':id')
findOne(@Param('id', new ParseIntPipe()) id: number, @User() user: UsersDto) {
  return user;
}
```

## 데이터 전달

데코레이터의 동작이 일부 조건에 따라 달라질 때, `data` 매개변수를 사용하여 데코레이터 팩토리 함수에 인수를 전달할 수 있습니다.  
속성 이름을 키로 취하고, 존재하는 경우 연관된 값을 반환하는(존재하지 않거나 사용자 객체가 생성되지 않았다면 undefined를 반환하는) 데코레이터를 정의해 보겠습니다.

```typescript
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.session?.user?.[data] : request.session?.user;
  }
);
```

이제 컨트롤러에서 @User() 데코레이터를 사용하여 특정 속성에 접근하는 방법은 다음과 같습니다:

```typescript
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Get(':id')
findOne(
  @Param('id', new ParseIntPipe()) id: number,
  @User('username') username: string,
) {
  return username;
}
```

이와 같은 데코레이터를 다른 키와 함께 사용하여 다양한 속성에 접근할 수 있습니다. 사용자 객체가 복잡하거나 깊은 경우, 이 방법은 요청 핸들러 구현을 더 쉽고 읽기 쉽게 만들 수 있습니다.

## 파이프와 함께 작동

Nest는 사용자 정의 param 데코레이터를 내장된 것들(@Body(), @Param(), @Query())과 같은 방식으로 처리합니다. 이는 사용자 정의 데코레이터에 주석이 달린 매개변수에 대해서도 파이프가 실행된다는 것을 의미합니다(예제에서는 user 인자). 또한, 파이프를 직접 사용자 정의 데코레이터에 적용할 수 있습니다:

```typescript
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Get(':id')
findOne(
  @Param('id', new ParseIntPipe()) id: number,
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UsersDto,
) {
  return user;
}
```

## Decorator composition

Nest는 여러 데코레이터를 구성하는 헬퍼 메소드를 제공합니다. 예를 들어, 모든 인증 관련 데코레이터를 단일 데코레이터로 결합하고 싶다면, 다음 구조를 사용할 수 있습니다:

```typescript
import { applyDecorators } from "@nestjs/common";

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(SessionGuard, RolesGuard)
  );
}
```

이 사용자 정의 @Auth() 데코레이터는 다음과 같이 사용할 수 있습니다.

```typescript
@Auth(Role.Admin)
@Get(':id')
findOne(@Param('id', new ParseIntPipe()) id: number, @User() user: UsersDto) {
  return user;
}
```

이렇게 하면 단일 선언으로 네 개의 데코레이터를 모두 적용하는 효과가 있습니다.

사용자 정의 데코레이터를 사용함으로써, NestJS 애플리케이션의 코드를 더욱 읽기 쉽고 관리하기 쉬운 형태로 만들 수 있습니다. 또한, 요청 객체에서 직접 속성을 추출하는 반복적인 작업을 줄이고, 보다 선언적인 방식으로 의도를 명확하게 표현할 수 있게 해줍니다.
