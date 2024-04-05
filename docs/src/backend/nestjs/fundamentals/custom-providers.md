# NestJS 커스텀 프로바이더

## 의존성 주입(Dependency Injection) 기초

NestJS는 의존성 주입(DI)을 핵심적으로 내장하고 있으며, 이는 주로 서비스 제공자 인스턴스를 클래스에 주입하는 생성자 기반 의존성 주입을 통해 이루어집니다. `@Injectable()` 데코레이터를 사용하여 클래스를 프로바이더로 선언하고, 모듈에 등록함으로써 Nest IoC(Inversion of Control) 컨테이너에서 관리할 수 있게 합니다.

예제 코드:

```typescript
// cats.service.ts
import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}
```

```typescript
// cats.controller.ts
import { Controller, Get } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";

@Controller("cats")
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

```typescript
// app.module.ts
import { Module } from "@nestjs/common";
import { CatsController } from "./cats/cats.controller";
import { CatsService } from "./cats/cats.service";

@Module({
  controllers: [CatsController],
  providers: [
    CatsService
    // 아래 코드와 동일
    {
      provide: CatsService,
      useClass: CatsService,
    },
  ],
})
export class AppModule {}
```

## 커스텀 프로바이더

애플리케이션의 복잡도가 증가함에 따라 표준 프로바이더만으로는 충분하지 않을 수 있습니다. Nest는 이를 위해 커스텀 프로바이더를 정의할 수 있는 여러 방법을 제공합니다. 커스텀 프로바이더는 다음과 같은 경우에 유용합니다:

- Nest가 클래스의 인스턴스를 생성하는 대신 사용자 정의 인스턴스를 생성하고 싶을 때
- 기존 클래스를 두 번째 의존성으로 재사용하고 싶을 때
- 테스트를 위해 클래스를 모의(mock) 버전으로 대체하고 싶을 때

## Value providers: `useValue`

- `useValue`는 상수 값, 외부 라이브러리, 또는 실제 구현을 모의 객체로 대체할 때 유용합니다.
- 테스트 목적으로 `CatsService`의 모의 버전을 사용하도록 Nest에 지시할 수 있습니다.

```typescript
// AppModule에서 useValue 예제
@Module({
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
})
export class AppModule {}
```

## 비클래스 기반 토큰 (Non-class-based provider tokens)

- 클래스 이름 대신 문자열이나 심볼을 DI 토큰으로 사용할 수 있습니다.
- 예를 들어, 외부 파일에서 가져온 연결 객체에 문자열 값을 토큰으로 사용할 수 있습니다.

```typescript
@Module({
  providers: [
    {
      provide: "CONNECTION",
      useValue: connection,
    },
  ],
})
export class AppModule {}

@Injectable()
export class CatsRepository {
  constructor(@Inject("CONNECTION") connection: Connection) {}
}
```

## Class providers: `useClass`

- `useClass`는 토큰이 해결해야 하는 클래스를 동적으로 결정할 수 있게 합니다.
- 현재 환경에 따라 다른 구성 서비스 구현을 제공하도록 할 수 있습니다.

```typescript
// configServiceProvider 예제
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === "development"
      ? DevelopmentConfigService
      : ProductionConfigService,
};
```

## Factory providers: `useFactory`

- `useFactory`는 팩토리 함수에서 반환된 값으로 프로바이더를 동적으로 생성할 수 있게 합니다.
- 팩토리 함수는 필요한 다른 프로바이더를 주입받을 수 있으며, 이들은 선택적일 수도 있습니다.

```typescript
// connectionProvider 예제
const connectionProvider = {
  provide: "CONNECTION",
  useFactory: (optionsProvider: OptionsProvider) =>
    new DatabaseConnection(optionsProvider.get()),
  inject: [OptionsProvider],
};
```

## Alias providers: `useExisting`

- `useExisting`을 사용하면 기존 프로바이더에 대한 별칭을 생성할 수 있습니다.
- 이를 통해 같은 프로바이더를 다른 두 가지 방법으로 접근할 수 있습니다.

```typescript
@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerAliasProvider = {
  provide: "AliasedLoggerService",
  useExisting: LoggerService,
};

@Module({
  providers: [LoggerService, loggerAliasProvider],
})
export class AppModule {}
```

## 비서비스 기반 프로바이더 (Non-service based providers)

- 프로바이더는 서비스를 제공하는 것에만 한정되지 않습니다. 예를 들어, 현재 환경에 따라 구성 객체 배열을 제공할 수 있습니다.

```typescript
const configFactory = {
  provide: "CONFIG",
  useFactory: () => {
    return process.env.NODE_ENV === "development" ? devConfig : prodConfig;
  },
};

@Module({
  providers: [configFactory],
})
export class AppModule {}
```

## 커스텀 프로바이더 내보내기 (Export custom provider)

- 커스텀 프로바이더는 선언된 모듈에 한정되어 있습니다. 다른 모듈에서도 사용하려면 내보내야 합니다.
- 커스텀 프로바이더를 내보낼 때는 토큰 또는 전체 프로바이더 객체를 사용할 수 있습니다.

```typescript
// 토큰 사용하여 내보내기 예제
@Module({
  providers: [connectionFactory],
  exports: ["CONNECTION"],
})
export class AppModule {}
```

```typescript
// 전체 프로바이더 객체를 사용하여 내보내기 예제
@Module({
  providers: [connectionFactory],
  exports: [connectionFactory],
})
export class AppModule {}
```
