# NestJS Interceptors

[NestJs Interceptor](https://docs.nestjs.com/interceptors)<br/>
interceptor는 [lifecycle](/backend/nestjs/preparation/lifecycle)에서 4번쨰와 8번쨰에 위치합니다.<br/>
intercept 내부가 4번째에서 실행되고 return이 8번째에서 실행됩니다.<br/>
우리는 response, Stream Overriding(나중에 cache에서 해보죠), time out을 공식문서에 있는데로 만들어 적용해봅니다.<br/>
[Github Link](https://github.com/gornoba/nestjs-describe/tree/624f56c1b5866ddb3c85a5bf3df30d2131f185c9)

## 소개

**Interceptors**는 @Injectable() 데코레이터로 주석된 클래스이며, `NestInterceptor` 인터페이스를 구현합니다. Aspect Oriented Programming (AOP) 기법에서 영감을 받아, 다음과 같은 유용한 기능을 제공합니다. 그리고 [RxJs](/backend/nestjs/applied/rxjs)를 사용합니다.

- 메서드 실행 전후에 추가 로직 바인딩
- 함수로부터 반환된 결과 변환
- 함수로부터 발생한 예외 변환
- 기본 함수 동작 확장
- 특정 조건에 따라 함수 완전 오버라이드 (예: 캐싱 목적)

## 기본사항

각 인터셉터는 `intercept()` 메서드를 구현하며, 두 개의 인수를 받습니다: `ExecutionContext` 인스턴스와 `CallHandler`.

### Execution Context

`ExecutionContext`는 `ArgumentsHost`에서 상속받으며, 원래 핸들러에 전달된 인수들의 래퍼 역할을 합니다.

### Call Handler

`CallHandler`는 route 핸들러 메서드를 호출할 수 있는 `handle()` 메서드를 구현합니다. `handle()` 메서드가 호출되지 않으면, route 핸들러 메서드는 실행되지 않습니다.

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
```

## Interceptors 바인딩

인터셉터를 설정하기 위해서는 `@UseInterceptors()` 데코레이터를 사용합니다. 이는 컨트롤러, 메서드 또는 전역 범위로 적용될 수 있습니다.

### 글로벌 Interceptors 설정 예시

```typescript
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```

## response mapping

`handle()` 메서드가 반환하는 `Observable`을 사용하여 route 핸들러로부터 반환된 값을 변형할 수 있습니다.

```typescript
// lib/interceptors/response.interface.ts
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseInterface<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterface<T>> {
    return next.handle().pipe(map((data) => ({ success: true, data })));
  }
}

// main.ts
private nestLib() {
  this.server.useGlobalInterceptors(new ResponseInterceptor());
}
```

위와 같이 interceptor를 만들고 `/api`로 요청해보면 아래와 같은 응답을 받을 수 있습니다.

```json
{
  "success": true,
  "data": "Hello World!"
}
```

## exception mapping

RxJS의 `catchError()` 연산자를 사용하여 발생한 예외를 오버라이드할 수 있습니다.

```typescript
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {+
    return next
      .handle()
      .pipe(catchError((err) => throwError(() => new BadGatewayException())));
  }
}
```

## Stream Overriding

때로는 핸들러를 전혀 호출하지 않고 다른 값을 반환하는 것이 필요할 수 있습니다. 예를 들어, 응답 시간을 개선하기 위해 캐시를 구현하는 경우가 있습니다. 다음은 캐시에서 응답을 반환하는 간단한 캐시 인터셉터 예제입니다.

```typescript
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
```

이 `CacheInterceptor`는 하드코드된 `isCached` 변수와 하드코드된 응답 `[]`를 가집니다. 여기서 주목할 점은 route 핸들러가 전혀 호출되지 않고 RxJS의 `of()` 연산자로 생성된 새 스트림을 반환한다는 것입니다. `CacheInterceptor`를 사용하는 엔드포인트를 호출하면 응답(하드코드된 빈 배열)이 즉시 반환됩니다.

## More Operators

스트림을 조작하기 위해 RxJS 연산자를 사용하는 것은 많은 가능성을 제공합니다. 또 다른 일반적인 사용 사례는 route 요청에 대한 타임아웃을 처리하는 것입니다. 엔드포인트가 일정 시간 후에도 아무것도 반환하지 않을 때, 에러 응답으로 종료하고 싶을 수 있습니다. 다음 구성은 이를 가능하게 합니다.

```typescript
// lib/interceptors/timeout.interceptor.ts
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
      finalize(() => {
        // resource를 정리하는 로직
        console.log('Cleaning up resources...');
      }),
    );
  }
}

// main.ts
private nestLib() {
  this.server.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
}

// app.controller.ts
@Get('sleep')
async sleep(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return 'sleep';
}
```

위와 같이 코드를 만들고 `/api/sleep`에 api를 요청해보면 아래와 같이 에러가 발생합니다.

```json
{
  "message": "Timeout has occurred",
  "error": "Request Timeout",
  "statusCode": 408
}
```
