# Link

[NestJs Module](https://docs.nestjs.com/modules)

## Describe

![NestJs Module](/module.png)
Module 부분은 설명만 있음으로 읽고 넘어가시면 됩니다.<br/>
Module은 NestJs의 주 컨셉인 캡슐화에 중추적인 역할을 합니다.<br/>
Module은 RestAPI의 용도나 프로젝트의 성향에 따라 구성된다고 보면 됩니다.<br/>
예를들어 app.module은 아래와 같은 구성요소를 갖고 있습니다.

## module의 구성

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
```

여기서 새로운 문법을 볼 수 있는데 @(decorator) 입니다.<br/>
데코레이터는 NestJs 전반에 걸쳐 쓰이게 됩니다. <br/>
클래스, 메소드, 속성, 파라미터에 메타데이터를 추가하거나 해당 요소의 동작을 수정하는 데 사용되는 특별한 종류의 선언입니다.<br/>
TypeScript의 실험적 기능이지만, NestJS는 이를 활용하여 모듈성, 재사용성, 테스트 용이성을 높이고, 다양한 프레임워크 기능을 제공합니다.<br/>
간단히 말해 나 이거 할꺼다~ 라고 미리 손들고 이야기하는 것과 비슷하다고 보면 될 것 같습니다.

## module의 구성요소

- imports
  - NestJs에서 지원하는 Library를 import 할 수 있습니다. ex) ConfigModule
  - 다른 module에서 export한 provider를 사용하기 위해 해당 module을 import 할 수 있습니다.
- controllers
  - lifecycle에서 보면 6번째에 위치한 컨트롤러 입니다.
  - RestAPI의 경우 route가 위치하게 되면 인스턴스화 하게 됩니다.
- providers
  - 보통은 service가 이곳에 위치하게 됩니다.
  - 일련의 작업이 일어나는 곳이라 보면 되고 exports하여 다른 module에서도 사용가능하게 합니다.
- exports
  - provider를 다른 module에서도 사용가능하게 exports 합니다.
    :::tip
    imports는 module을 exports는 provider를 직접하게 됩니다.
    :::
- class 내부
  - middleware나 dynamic module을 생성할 때 사용하게 됩니다.
    - milddleware는 middleware를 다루는 곳에서 살펴보겠습니다.
    - dynamic module의 경우 좀 복잡할 수 있습니다. 고급과정이라 보면 더 좋을 것 같습니다.
    - dynamic module을 사용하는 이유는 불필요한 코드 사용을 줄이고 유지보수를 편리하기 하기 위함이나 NestJs를 완숙하게 이해하기 전에는 사용방법을 익히기가 어려울 수 있습니다.
    - 하지만, 우리는 똑같은 코드를 반복/숙달하면 언젠가 이해가 되겠죠? 몰라도 일단 쓰면 됩니다. 복붙하세요. 언젠가는 스스로 쓸 수 있게 됩니다.
    - dynamic module은 한~참 뒤에 다룰겁니다.
  - module의 class에서 직접 의존성주입을 하는 방법도 있으나 실제로 사용해본적은 없습니다.

## 주의할 점

[NestJs Circular dependency](https://docs.nestjs.com/fundamentals/circular-dependency)

- module이나 provider를 사용함에 있어 자주 헷갈리는 부분이 순환종속성 입니다.
- 각 module은 서로 캡슐화되어 이곳저곳에 사용됩니다.
- Architecture View NestJS를 사용하면 시각화가 되어 나은데 그래도 헷갈리고 오류가 생기게 됩니다.
- 순환종속성이 생기면 아래와 같이 코드를 수정하면 됩니다.

```typescript
@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class CommonModule {}
```

- 하지만 이것보다 오류를 생기지 않게 구조를 만드는 것이 좋겠죠?

### 순환종속의 해결법

- 개인적으로 순환종속을 해결하기 위해 자주 사용하는 부분을 따로 module을 만들어 모아놓습니다.
- 대표적인 것이 DB와 연결되어 사용되는 repository 입니다.
  - 지금 NestJs는 repository 데코레이터는 사라지고 injectable로 통합되었습니다.
- 순환종속성을 피하기 위해서 아래와 같은 구조를 갖게 됩니다.

```
project/
├── src/
│ ├── main.ts
│ ├── app.module.ts
│ └── app.controller.ts
│
├── datbase/
│ ├── entities/
│ │     ├── first.entity.ts
│ │     └── second.entitys.ts
│ ├── repositories/
│ │     ├── first.repository.ts
│ │     └── second.repositorys.ts
│ └── database.module.ts
│
├── lib/
│ ├── config/
│ │     └── config.service.ts
│ ├── auth/
│ │     ├── local.gaurd.ts
│ │     └── jwt.guard.ts
│ └── lib.module.ts
├── nest-cli.json
└── package.json
```

- 간단하게 말해 자주 import 되는 것들을 따로 모아 놓는 것이죠.
- 폴더구조가 이렇다면 순환종속성을 피할 수 있게 됩니다.
