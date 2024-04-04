# NestJS에서의 권한 부여

## 개요

**권한 부여(Authorization)** 는 사용자가 할 수 있는 작업을 결정하는 과정입니다. 예를 들어, 관리자는 게시물을 생성, 편집, 삭제할 수 있지만, 비관리자 사용자는 게시물을 읽기만 할 수 있습니다.

권한 부여는 인증(Authentication)과는 독립적이며, 인증 메커니즘이 필요합니다.

프로젝트의 특정 요구 사항에 따라 다양한 접근 방식과 전략이 있습니다.

## 기본 RBAC 구현

### 역할 열거형 (Role Enum)

RBAC(Role-based Access Control, 역할 기반 접근 제어)은 역할과 권한을 중심으로 정의된 접근 제어 메커니즘입니다. 먼저 시스템 내의 역할을 나타내는 `Role` enum을 생성합니다.

```typescript
export enum Role {
  User = "user",
  Admin = "admin",
}
```

### @Roles() 데코레이터

`@Roles()` 데코레이터를 생성하여 특정 리소스에 접근하기 위해 필요한 역할을 지정할 수 있습니다.

```typescript
import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

### RolesGuard

`RolesGuard` 클래스를 생성하여 현재 사용자에게 할당된 역할과 현재 처리 중인 경로에 필요한 실제 역할을 비교합니다.

```typescript
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const requset = context.switchToHttp().getRequest();
    const session = requset.session;
    const user = session.user;

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
```

### CanActivate context

- `CanActivate` 인터페이스는 NestJS의 가드(Guards)에서 사용되며, 특정 조건(예: 사용자 인증 여부, 권한 보유 여부 등)에 따라 요청을 처리할지 여부를 결정하는 로직을 포함합니다. 가드는 주로 요청의 권한을 체크하여 요청이 해당 조건을 만족할 때만 처리를 진행하도록 하는 역할을 합니다.
- `ExecutionContext는` 현재 실행 중인 컨텍스트에 대한 상세 정보를 제공합니다.

### Reflector

`Reflector`는 NestJS의 `@nestjs/core` 패키지에서 제공하는 유틸리티 클래스로, 클래스, 핸들러, 메서드 등에 설정된 메타데이터를 조회하는 데 사용됩니다. 주로 가드나 인터셉터에서 특정 메타데이터(예: 권한 정보)에 기반한 로직을 실행할 필요가 있을 때 활용됩니다.
:::tip
메타데이터(metadata)는 다른 데이터를 설명하는 데이터입니다. 쉽게 말해, 메타데이터는 정보의 정보라고 할 수 있으며, 데이터에 대한 상세한 설명, 출처, 접근 권한, 생성 및 수정 날짜 등 다양한 종류의 데이터에 관한 추가 정보를 제공합니다.
:::

### 참고

[Excution Context](/backend/nestjs/fundamentals/excution-context)

### RolesGuard 전역 등록하기

`RolesGuard`를 컨트롤러 레벨이나 전역적으로 등록합니다.

```typescript
providers: [
{
  provide: APP_GUARD,
  useClass: RolesGuard,
},
],
```

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/2e3a705d1a529496e84bc0f17be3efda9b4b75c2)

먼저 user에 roles를 추가해주도록 합시다.

```typescript
// login.service.ts
{
  id: 1,
  username: 'atreides',
  password: '12',
  roles: [Role.Admin],
},
```

그 다음은 dto를 수정해 줍시다.

```typescript
export class UsersDto {
  roles?: string[];
}
```

마지막으로 권한이 필요한 부분에 적용시켜 봅시다.

```typescript
@ApiParam({
  name: 'id',
  example: 1,
  required: true,
  type: Number,
})
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Get(':id')
findOne(@Param('id', new ParseIntPipe()) id: number): CatsDto {
  return this.cats;
}
```

이제 `docker-compose up --build -V`로 실행하고
session으로 로그인 한 다음 `/api/cats/{id}` api를 요청해보시면 결과가 잘 나올겁니다.<br/><br/>
만약 권한이 없는 User로 `atreides` 의 권한을 수정하고 session 다시 하고 api를 요청해보면 아래와 같은 에러 메세지를 확인할 수 있습니다.

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```
