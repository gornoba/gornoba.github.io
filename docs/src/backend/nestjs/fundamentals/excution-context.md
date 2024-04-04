# Execution Context

## appplication context 파악

여러 애플리케이션 컨텍스트에서 실행되는 `guards`, `filters`, `interceptors` 구축할 때는 메서드가 현재 실행 중인 애플리케이션 유형을 확인할 수 있는 방법이 필요합니다. 이 작업은 ArgumentsHost의 getType() 메서드를 사용하여 수행합니다:

```typescript
if (host.getType() === "http") {
  // HTTP requests (REST)
} else if (host.getType() === "rpc") {
  // Microservice requests
} else if (host.getType<GqlContextType>() === "graphql") {
  // GraphQL requests
}
```

| <center>name</center> | <center>describe</center>                      |
| :-------------------: | :--------------------------------------------- |
|   context.getType()   | 현재 실행 중인 컨텍스트의 유형을 문자열로 반환 |

## ArgumentsHost 클래스

`ArgumentsHost` 클래스는 핸들러에 전달되는 인수를 검색하는 메소드를 제공합니다. 예를 들어, HTTP, RPC(마이크로서비스) 또는 WebSockets 컨텍스트에서 인수를 검색하는 데 적합한 컨텍스트를 선택할 수 있습니다. 예외 필터의 `catch()` 메소드와 같이 인스턴스에 접근하고 싶은 곳에서 주로 `host` 매개변수로 참조됩니다.

```typescript
const [req, res, next] = host.getArgs();
const request = host.getArgByIndex(0);
const response = host.getArgByIndex(1);
```

`ArgumentsHost`를 사용하여 특정 애플리케이션 컨텍스트로 전환하는 유틸리티 메소드의 예는 다음과 같습니다.

```typescript
const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```

|  <center>name</center>  | <center>describe</center>                                       |
| :---------------------: | :-------------------------------------------------------------- |
|    context.getArgs()    | 컨트롤러로 전달되는 모든 인자의 배열을 반환                     |
| context.getArgByIndex() | 컨트롤러로 전달되는 특정 인자를 인덱스를 기반으로 검색하여 반환 |
|  context.switchToRpc()  | RPC 컨텍스트로 전환                                             |
| context.switchToHttp()  | HTTP 컨텍스트로 전환                                            |
|  context.switchToWs()   | websocket 컨텍스트로 전화                                       |

## ExecutionContext 클래스

`ExecutionContext`은 `ArgumentsHost`를 확장하며, 현재 실행 프로세스에 대한 추가적인 세부 정보를 제공합니다. 예를 들어 가드의 `canActivate()` 메소드나 인터셉터의 `intercept()` 메소드에서 필요할 때 Nest가 `ExecutionContext` 인스턴스를 제공합니다.

```typescript
const methodKey = ctx.getHandler().name; // "create"
const className = ctx.getClass().name; // "CatsController"
```

| <center>name</center> | <center>describe</center>                 |
| :-------------------: | :---------------------------------------- |
| context.getHandler()  | 특정 요청을 처리하는 컨트롤러 내의 메서드 |
|  context.getClass()   | 컨트롤러의 클래스 참조를 반환             |

`ExecutionContext`는 현재 클래스와 핸들러 메소드에 대한 참조에 액세스할 수 있는 유연성을 제공합니다. 이를 통해 가드나 인터셉터 내에서 데코레이터를 통해 설정된 메타데이터에 접근할 수 있는 기회를 제공합니다.

## Reflector를 사용한 데코레이터 생성

`Reflector#createDecorator`를 사용하여 타입이 지정된 데코레이터를 생성하려면, 타입 인자를 명시해야 합니다. 예를 들어, 문자열 배열을 인자로 받는 `Roles` 데코레이터를 생성해봅시다.

```typescript
import { Reflector } from "@nestjs/core";

export const Roles = Reflector.createDecorator<string[]>();
```

이제 이 데코레이터를 사용하려면 핸들러에 주석을 달면 됩니다.

```typescript
@Roles(["user"])
@Controller("cats")
export class CatsController {
  @Post()
  @Roles(["admin"])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
```

여기서는 `create()` 메소드에 `Roles` 데코레이터 메타데이터를 첨부하여, 관리자 역할을 가진 사용자만 이 라우트에 접근할 수 있도록 지정했습니다.

```typescript
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}

  guard() {
    const roles = this.reflector.get(Roles, context.getHandler());
    const roles = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);
    const roles = this.reflector.getAllAndMerge(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
```

|    <center>name</center>    | <center>describe</center>                                                                           |
| :-------------------------: | :-------------------------------------------------------------------------------------------------- |
|        reflector.get        | 특정 타겟(클래스나 함수)에서 메타데이터를 조회                                                      |
|      reflector.getAll       | 여러 타겟에서 메타데이터를 조회할 때 사용                                                           |
|  reflector.getAllAndMerge   | 여러 타겟에서 메타데이터를 조회하고, 조회된 결과를 병합하는 데 사용                                 |
| reflector.getAllAndOverride | 여러 타겟에서 메타데이터를 조회하고, class의 역할을 무시하고 contoller의 역할로 override 할 때 사용 |

## @SetMetadata를 사용한 저수준 접근 방법

`Reflector#createDecorator` 대신 내장된 `@SetMetadata()` 데코레이터를 사용하여 핸들러에 메타데이터를 첨부할 수도 있습니다.

```typescript
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

이 구조를 사용하면, `roles` 메타데이터(메타데이터 키는 'roles'이고, 연관 값은 ['admin']입니다)를 `create()` 메소드에 첨부했습니다. 이 방법은 작동하지만, 라우트에 `@SetMetadata()`를 직접 사용하는 것은 좋은 관행이 아닙니다. 대신 아래와 같이 자체 데코레이터를 생성할 수 있습니다.

```typescript
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
```

이 방법은 훨씬 깨끗하고 읽기 쉽습니다. `@SetMetadata`를 사용하면 메타데이터 키와 값에 대한 더 많은 제어권을 가지며, 하나 이상의 인자를 받는 데코레이터를 생성할 수 있습니다.

## 메타데이터 접근

가드나 인터셉터 내에서 라우트의 역할(사용자 정의 메타데이터)에 접근하기 위해 `Reflector` 도우미 클래스를 다시 사용합니다.

```typescript
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}
}

const roles = this.reflector.get<string[]>("roles", context.getHandler());
```

여기에서는 데코레이터 참조 대신 첫 번째 인자로 메타데이터 키('roles'인 경우)를 전달합니다. 이 방법은 Reflector#createDecorator 예제와 마찬가지로 메타데이터에 접근합니다. 하지만 메타데이터 키를 직접 지정하는 점에서 차이가 있습니다.

메타데이터를 여러 수준에서 제공할 수 있는 능력을 감안할 때, 여러 컨텍스트에서 메타데이터를 추출하고 병합해야 할 수도 있습니다. Reflector 클래스는 이를 돕기 위한 두 가지 유틸리티 메소드를 제공합니다. 이 메소드들은 컨트롤러와 메소드 메타데이터를 한 번에 추출하고, 다양한 방식으로 결합합니다.

예를 들어, 두 수준 모두에서 Roles 메타데이터를 제공한 시나리오를 고려해 봅시다.

```typescript
@Roles(["user"])
@Controller("cats")
export class CatsController {
  @Post()
  @Roles(["admin"])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
```

이 경우, 'user'를 기본 역할로 지정하고, 특정 메소드에 대해 선택적으로 오버라이드하려는 의도가 있다면, getAllAndOverride() 메소드를 사용할 것입니다.

```typescript
const roles = this.reflector.getAllAndOverride<string[]>(Roles, [
  context.getHandler(),
  context.getClass(),
]);
```

이 코드를 실행하는 가드는 create() 메소드의 컨텍스트에서 위 메타데이터를 가진 상태에서 실행되며, 결과적으로 roles는 ['admin']을 포함하게 됩니다.

메타데이터를 모두 가져와서 병합하려면(이 메소드는 배열과 객체 모두를 병합합니다), getAllAndMerge() 메소드를 사용합니다.

```typescript
const roles = this.reflector.getAllAndMerge<string[]>(Roles, [
  context.getHandler(),
  context.getClass(),
]);
```

이렇게 하면 roles는 ['user', 'admin']을 포함하게 됩니다.

이러한 병합 메소드를 사용할 때, 첫 번째 인자로 메타데이터 키를 전달하고, 두 번째 인자로 메타데이터 타겟 컨텍스트의 배열(즉, getHandler() 및/또는 getClass() 메소드의 호출)을 전달합니다.
