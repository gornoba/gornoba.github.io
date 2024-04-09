# NestJS 미들웨어 구현 및 적용

NestJS에서 미들웨어는 Express 미들웨어와 동등하며, 요청-응답 사이클에서 다양한 작업을 수행할 수 있습니다. 미들웨어 함수는 코드 실행, 요청 및 응답 객체 수정, 요청-응답 사이클 종료, 스택 내의 다음 미들웨어 함수 호출 등을 할 수 있습니다. 모든 미들웨어 함수는 `next()` 함수를 호출하여 제어를 다음 미들웨어로 넘겨야 합니다.

## 미들웨어 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/c8da2df71c27e5fd9a229472032ffef5885ea2cb)
미들웨어는 함수 또는 `@Injectable()` 데코레이터가 있는 클래스로 구현할 수 있습니다. 클래스는 `NestMiddleware` 인터페이스를 구현해야 합니다.

### 예시: LoggerMiddleware 구현

```typescript
// /lib/middlewares/logger.middleware.ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(req.url);
    next();
  }
}
```

## 의존성 주입

Nest 미들웨어는 의존성 주입을 완벽하게 지원합니다. 컨트롤러와 프로바이더와 마찬가지로 동일한 모듈 내에서 사용 가능한 의존성을 주입할 수 있습니다.

## 미들웨어 적용

미들웨어는 `@Module()` 데코레이터가 아닌 모듈 클래스의 `configure()` 메서드를 사용하여 설정합니다. 미들웨어를 포함하는 모듈은 `NestModule` 인터페이스를 구현해야 합니다.

### AppModule에 LoggerMiddleware 적용

```typescript
// app.module.ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
```

미들웨어는 `forRoutes()` 메서드를 사용하여 특정 경로 또는 컨트롤러에 적용됩니다. 요청 메서드에 따라 미들웨어를 더 세밀하게 제한할 수도 있습니다.

## 경로와 메서드에 따른 미들웨어 적용

```typescript
// app.module.ts
@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "cats", method: RequestMethod.GET });
  }
}
```

미들웨어를 적용하는 과정은 NestJS의 유연성과 모듈성을 잘 보여줍니다. 미들웨어를 통해 어플리케이션의 다양한 요구 사항을 충족시킬 수 있습니다.

## 라우트 제외하기

특정 라우트에서 미들웨어를 제외하려면 `exclude()` 메서드를 사용할 수 있습니다. 이 메서드는 문자열, 여러 문자열, `RouteInfo` 객체를 인자로 받아 제외할 라우트를 식별합니다.

```typescript
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: "cats", method: RequestMethod.GET },
    { path: "cats", method: RequestMethod.POST },
    "cats/(.*)"
  )
  .forRoutes(CatsController);
```

## Middleware consumer

`MiddlewareConsumer`는 미들웨어를 관리하기 위한 헬퍼 클래스입니다. `forRoutes()` 메서드를 사용하여 단일 컨트롤러나 여러 컨트롤러에 미들웨어를 적용할 수 있습니다.

```typescript
consumer.apply(LoggerMiddleware).forRoutes(CatsController);
```

## 함수형 미들웨어

간단한 기능의 미들웨어는 클래스가 아닌 함수로 정의할 수 있습니다. 이런 경우 함수형 미들웨어라고 합니다.

```typescript
// logger.middleware.ts
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
}
```

함수형 미들웨어는 의존성이 없을 때 간단하게 사용할 수 있는 좋은 대안입니다.

## 여러 미들웨어 적용하기

여러 미들웨어를 순차적으로 적용하려면, `apply()` 메서드에 콤마로 구분된 미들웨어 리스트를 제공합니다.

```typescript
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

## 글로벌 미들웨어

모든 라우트에 미들웨어를 적용하려면, `INestApplication` 인스턴스가 제공하는 `use()` 메서드를 사용할 수 있습니다. 이 방법은 앱이 시작할 때 설정됩니다.

```typescript
// main.ts
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

이렇게 NestJS에서 미들웨어를 구현하고 적용하는 방법을 알아보았습니다. 미들웨어는 요청 처리 과정에서 중요한 역할을 하며, NestJS의 유연성을 더욱 확장시켜 줍니다. 애플리케이션의 보안, 로깅, 요청 사전 처리 등 다양한 목적으로 미들웨어를 활용할 수 있습니다.
