# Module Reference

NestJS에서 ModuleRef 클래스는 애플리케이션의 모듈 내에서 제공자(provider)를 탐색하고 참조를 얻는데 사용됩니다. ModuleRef는 인젝션 토큰을 사용하여 특정 제공자, 컨트롤러 또는 인젝터블(예: 가드, 인터셉터 등)을 검색할 수 있는 기능을 제공합니다. 이 클래스는 일반적인 방법으로 클래스에 주입될 수 있습니다.

## 모듈 참조 사용 방법

1. 인스턴스 검색하기:
   ModuleRef 인스턴스는 get() 메소드를 사용하여 현재 모듈에서 제공자를 검색할 수 있습니다. 이 메소드는 인젝션 토큰이나 클래스 이름을 사용하여 제공자를 검색합니다. 예를 들어, 특정 서비스 클래스의 인스턴스를 가져오고자 할 때 사용할 수 있습니다.

```typescript
// CatsService에서 다른 서비스를 검색하는 예시
import { Injectable, ModuleRef } from "@nestjs/common";

@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    const service = this.moduleRef.get(Service);
  }
}
```

2. 범위가 지정된 제공자 해결하기:
   범위가 지정된 제공자(예: 요청-스코프 또는 일시적(transient))는 resolve() 메소드를 사용하여 동적으로 해결할 수 있습니다. 이 메소드는 제공자의 새 인스턴스를 생성하며, 이 인스턴스는 각각 고유한 DI 컨테이너 하위 트리에서 관리됩니다.

```typescript
// CatsService에서 일시적 서비스를 동적으로 해결하는 예시
import { Injectable, ModuleRef } from "@nestjs/common";

@Injectable()
export class CatsService {
  private transientService: TransientService;

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.transientService = await this.moduleRef.resolve(TransientService);
  }
}
```

3. 요청 객체에 기반한 컨텍스트 식별자 사용하기:
   ContextIdFactory를 사용하여 요청 기반의 컨텍스트 식별자를 생성하고, 이를 사용하여 요청-스코프 제공자를 검색할 수 있습니다. 이를 통해 요청과 연결된 동일한 DI 컨테이너 하위 트리에서 인스턴스를 해결할 수 있습니다.

```typescript
// 요청 객체를 기반으로 컨텍스트 식별자 생성 후 CatsRepository 인스턴스를 검색하는 예시
import { Injectable, Inject, REQUEST } from "@nestjs/common";
import { ContextIdFactory, ModuleRef } from "@nestjs/core";

@Injectable()
export class CatsService {
  constructor(
    @Inject(REQUEST) private request: any,
    private moduleRef: ModuleRef
  ) {}

  async someMethod() {
    const contextId = ContextIdFactory.getByRequest(this.request);
    const catsRepository = await this.moduleRef.resolve(
      CatsRepository,
      contextId
    );
  }
}
```

4. 동적으로 사용자 정의 클래스 인스턴스화하기:
   ModuleRef의 create() 메소드를 사용하면 프레임워크의 DI 컨테이너 외부에서 클래스를 조건적으로 인스턴스화할 수 있습니다. 이 기능은 특정 클래스가 제공자로 사전 등록되지 않았을 때 유용합니다.

```typescript
// CatsFactory 클래스를 동적으로 인스턴스화하는 예시
import { Injectable, ModuleRef } from "@nestjs/common";

@Injectable()
export class CatsService {
  private catsFactory: CatsFactory;

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.catsFactory = await this.moduleRef.create(CatsFactory);
  }
}
```

이 기법을 사용하면 프레임워크 컨테이너 외부에서 조건에 따라 다양한 클래스를 인스턴스화할 수 있으며, 이를 통해 애플리케이션의 유연성을 크게 향상시킬 수 있습니다.

## 추가적인 기능과 주의사항

- **전역 컨텍스트에서 제공자 검색하기**: 어떤 제공자가 다른 모듈에 주입되어 있고, 그 모듈이 현재 모듈과는 다르더라도, `get()` 메소드에 `{ strict: false }` 옵션을 전달함으로써 전역 컨텍스트에서 제공자를 검색할 수 있습니다.

```typescript
const service = this.moduleRef.get(Service, { strict: false });
```

REQUEST 스코프 제공자 등록하기: 수동으로 생성된 컨텍스트 식별자를 사용하여 요청 스코프의 제공자를 등록할 수 있습니다. 이는 ModuleRef#registerRequestByContextId() 메소드를 사용하여 구현할 수 있으며, 이 기능을 통해 수동으로 생성된 DI 서브트리에 사용자 정의 요청 객체를 등록할 수 있습니다.

```typescript
const contextId = ContextIdFactory.create();
this.moduleRef.registerRequestByContextId(/* YOUR_REQUEST_OBJECT */, contextId);
```

커스텀 클래스 동적 인스턴스화하기: 이미 등록된 제공자가 아닌 클래스를 동적으로 인스턴스화하려면, ModuleRef의 create() 메소드를 사용할 수 있습니다. 이 방법은 특정 상황에 맞게 클래스를 조건부로 인스턴스화하고자 할 때 유용합니다.

```typescript
const customClassInstance = await this.moduleRef.create(CustomClass);
```

이러한 기능들은 NestJS에서 제공하는 강력한 도구로, 애플리케이션의 유연성을 크게 높이고, 복잡한 의존성 관리 문제를 해결하는 데 도움을 줄 수 있습니다. ModuleRef를 사용함으로써, 애플리케이션의 모듈 간의 상호 작용을 보다 세밀하게 제어하고, 범위가 지정된 서비스의 생명 주기를 관리하며, 동적으로 서비스를 조작할 수 있게 됩니다.

## 적용

[Github Link](https://github.com/gornoba/nestjs-describe/tree/520083fd813b1bb00c404ce32821be4d717ea5a5)

### module 변경

- lib.module.ts에서 login.module이 imports 되고 있는 것을 삭제
- login.module에서 순환참조를 해결하기 위해 `forwardRef`를 쓰고 있는 부분을 삭제하고 그냥 imports

### local.strategy

```typescript
@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy, "local")
  implements OnModuleInit
{
  private loginService: LoginService;

  constructor(private readonly moduleRef: ModuleRef) {
    super({
      usernameField: "username", // default: 'username'
      passwordField: "password", // default: 'password'
    });
  }

  onModuleInit() {
    this.loginService = this.moduleRef.get(LoginService, { strict: false });
  }

  validate(username: string, password: string) {
    return this.loginService.login(username, password);
  }
}
```

위와 같이 변경하면 loginservie를 불러와 쓸수 있게 됩니다.
