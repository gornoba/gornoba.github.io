# Injection scopes

NestJS에서의 Injection Scope에 대해 알아볼 때, 기본적으로 Nest 애플리케이션에서 거의 모든 것이 들어오는 요청들 사이에서 공유된다는 사실을 알게 될 수 있습니다. 예를 들어, 데이터베이스 연결 풀이나 전역 상태를 가진 싱글톤 서비스 등이 있습니다. Node.js는 각 요청이 별도의 스레드에 의해 처리되는 요청/응답 멀티 스레드 무상태 모델을 따르지 않기 때문에, 싱글톤 인스턴스를 사용하는 것이 안전합니다.

그러나 요청 기반의 수명이 필요한 경우도 있습니다. 예를 들어, GraphQL 애플리케이션에서의 요청 당 캐싱, 요청 추적, 다중 테넌시 등이 있습니다. Injection Scope는 원하는 공급자 수명 동작을 얻기 위한 메커니즘을 제공합니다.

## Provider Scope

Provider는 다음과 같은 Scope를 가질 수 있습니다:

- **DEFAULT**: Provider의 단일 인스턴스가 전체 애플리케이션에서 공유됩니다. 인스턴스 수명은 애플리케이션 생명주기에 직접적으로 연결됩니다.
- **REQUEST**: 각 들어오는 요청마다 Provider의 새 인스턴스가 생성됩니다. 요청 처리가 완료된 후 인스턴스는 가비지 컬렉트됩니다.
- **TRANSIENT**: Transient Provider는 소비자 간에 공유되지 않습니다. Transient Provider를 주입하는 각 소비자는 새롭고 전용 인스턴스를 받습니다.

## Usage

Injection Scope를 지정하기 위해 `@Injectable()` 데코레이터 옵션 객체에 scope 속성을 전달합니다:

```typescript
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class CatsService {}
```

Custom Provider에 대해서도, provider 등록을 위한 긴 형식에서 scope 속성을 설정합니다

```typescript
{
  provide: 'CACHE_MANAGER',
  useClass: CacheManager,
  scope: Scope.TRANSIENT,
}
```

:::warning
Websocket 게이트웨이는 request scope 공급자를 사용해서는 안 됩니다. 이는 실제 소켓을 캡슐화하며, 여러 번 인스턴스화될 수 없기 때문에 싱글톤으로 작동해야 합니다. 이 제한은 Passport 전략이나 Cron 컨트롤러와 같은 일부 다른 공급자에도 적용됩니다.
:::

## Controller Scope

Controller 역시 Scope를 가질 수 있으며, 해당 Controller에서 선언된 모든 요청 메소드 핸들러에 적용됩니다

```typescript
@Controller({
  path: "cats",
  scope: Scope.REQUEST,
})
export class CatsController {}
```

## Scope 계층 구조(Scope Hierarchy)

- 요청(Request) Scope는 주입 체인을 따라서 상향 전파됩니다. 예를 들어, request scope Provider에 의존하는 Controller는 자체적으로 request scope가 됩니다.
- 예를 들어 `CatsController <- CatsService <- CatsRepository`의 의존성 그래프가 있다고 가정해보겠습니다. 여기서 `CatsService`가 request scope이고(다른 것들은 기본 싱글톤), `CatsController`는 주입된 서비스에 의존하기 때문에 request scope가 됩니다. `CatsRepository`는 의존하지 않으므로 singleton scope를 유지합니다.
- Transient scope 의존성은 이러한 패턴을 따르지 않습니다. singleton scope인 `DogsService`가 Transient Provider `LoggerService`를 주입받는 경우, 새로운 인스턴스를 받지만 `DogsService`는 singleton scope를 유지합니다. 원하는 동작이라면 `DogsService`도 명시적으로 TRANSIENT로 표시해야 합니다.

## Request Provider

HTTP 서버 기반 애플리케이션에서, request scope 공급자를 사용하여 원본 요청 객체에 대한 참조를 얻을 수 있습니다. 이는 `REQUEST` 객체를 주입함으로써 이루어집니다.

```typescript
import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(REQUEST) private request: Request) {}
}
```

Microservice나 GraphQL 애플리케이션에서는 요청에 접근하는 방식이 조금 다릅니다. GraphQL에서는 CONTEXT를 REQUEST 대신 주입합니다.

```typescript
import { Injectable, Scope, Inject } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(CONTEXT) private context) {}
}
```

## Inquirer provider

logging or metrics provider instance에서 상위 클래스를 가져오고 싶다면 `INQUIRER` token을 사용하면 됩니다.

```typescript
// hellow.service
import { Inject, Injectable, Scope } from "@nestjs/common";
import { INQUIRER } from "@nestjs/core";

@Injectable({ scope: Scope.TRANSIENT })
export class HelloService {
  constructor(@Inject(INQUIRER) private parentClass: object) {}

  sayHello(message: string) {
    console.log(`${this.parentClass?.constructor?.name}: ${message}`);
  }
}

// app.service
import { Injectable } from "@nestjs/common";
import { HelloService } from "./hello.service";

@Injectable()
export class AppService {
  constructor(private helloService: HelloService) {}

  getRoot(): string {
    this.helloService.sayHello("My name is getRoot");

    return "Hello world!";
  }
}

// return: "AppService: My name is getRoot"
```

## 성능 고려 사항

request scope 공급자를 사용하면, Nest는 가능한 한 많은 메타데이터를 캐시하려고 하지만, 각 요청마다 클래스의 인스턴스를 생성해야 합니다. 따라서, 평균 응답 시간이 느려지고 전반적인 벤치마킹 결과에 영향을 줄 수 있습니다. 공급자가 request scope일 필요가 없다면, 기본 singleton scope 사용을 강력히 권장합니다.

:::info
request scope 공급자를 활용하여 잘 설계된 애플리케이션은 지연 시간 측면에서 5% 미만으로 느려질 수 있습니다.
:::

## 내구성 있는(Durable) 공급자

티-테넌트(multi-tenant) 애플리케이션과 같이 복잡한 사용 사례에서 공급자의 생명주기와 관리 방법을 최적화하기 위해 도입된 개념입니다. 공급자 인스턴스를 요청(request) 스코프로 한정하지 않고, 더 긴 생명주기를 가지도록 함으로써 성능과 리소스 활용도를 개선합니다.

### Durable Providers의 정의

NestJS의 내구성 있는 공급자는 특정 속성(예: 테넌트 ID)에 기반하여 요청들을 분류하고, 각 분류에 대한 고유한 Dependency Injection(DI) 서브트리를 생성합니다. 이러한 서브트리는 해당 분류에 속하는 모든 요청에 걸쳐 재사용될 수 있으며, 각 요청마다 공급자를 새로 생성하는 대신 기존 인스턴스를 재사용함으로써 리소스 사용을 최적화합니다.

### 사용 이유

- **성능 최적화**: 멀티-테넌트 애플리케이션에서 각 테넌트별로 공급자를 재사용함으로써, 인스턴스 생성 비용을 절감하고 전체적인 애플리케이션 성능을 향상시킬 수 있습니다.

- **리소스 활용 최적화**: 각 요청마다 새로운 공급자 인스턴스를 생성하는 것은 메모리 사용량 증가로 이어질 수 있습니다. 내구성 있는 공급자를 사용함으로써 메모리 사용을 최적화하고, 가비지 컬렉션에 따른 오버헤드를 줄일 수 있습니다.

- **멀티-테넌트 지원 강화**: 멀티-테넌트 애플리케이션에서는 각 테넌트가 고유한 설정, 데이터베이스 연결 등을 가질 수 있습니다. 내구성 있는 공급자를 사용함으로써 테넌트별 공급자 인스턴스를 효율적으로 관리하고, 테넌트 간 격리를 유지하며 데이터 보안을 강화할 수 있습니다.

:::details AggregateByTenantContextIdStrategy

```typescript
import {
  HostComponentInfo,
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
} from "@nestjs/core";
import { Request } from "express";

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  private tenants = new Map<string, ContextId>();

  attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers["x-tenant-id"] as string;
    if (!tenantId) {
      return contextId;
    }

    let tenantContextId = this.tenants.get(tenantId);
    if (!tenantContextId) {
      tenantContextId = ContextIdFactory.create();
      this.tenants.set(tenantId, tenantContextId);
    }

    return {
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantContextId : contextId,
      payload: { tenantId },
    };
  }
}
```

:::warning
해당 코드는 대규모 서비스에는 적합하지 않습니다. tenant를 cache등에 저장하는 방법이 필요합니다.
:::
전역적으로 등록하려면 main.ts에 아래와 같이 등록하세요.

```typescript
ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
```

마지막으로 provider에 등록을 하면 됩니다.

```typescript
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class CatsService {}

// custom provider
{
  provide: 'foobar',
  useFactory: () => { ... },
  scope: Scope.REQUEST,
  durable: true,
}
```
