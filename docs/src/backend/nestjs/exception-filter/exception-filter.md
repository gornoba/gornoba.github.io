# NestJS 예외 필터

[NestJs Exception Filters](https://docs.nestjs.com/exception-filters)
[Github Link](https://github.com/gornoba/nestjs-describe/tree/ba4be31f8affde88596bd0ce44c9b07518064b84)

NestJS는 애플리케이션 전반에 걸쳐 처리되지 않은 모든 예외를 처리하는 내장 예외 계층을 제공합니다. 애플리케이션 코드에서 처리되지 않은 예외는 이 계층에 의해 잡히며, 사용자 친화적인 응답을 자동으로 전송합니다.

:::details 잘 사용하지는 않지만 알아두면 좋은 내용

### 기본 제공 예외 필터

- 기본적으로, 내장 글로벌 예외 필터는 `HttpException` 및 그 하위 클래스의 예외를 처리합니다.
- 인식되지 않는 예외의 경우, 다음과 같은 기본 JSON 응답을 생성합니다:

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

- 이 글로벌 예외 필터는 `http-errors` 라이브러리를 부분적으로 지원합니다.

### Throwing standard exceptions

- Nest는 `@nestjs/common` 패키지에서 `HttpException` 클래스를 제공합니다.
- 예시: `CatsController`의 `findAll()` 메소드에서 예외를 던집니다.

```typescript
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

- 응답은 다음과 같습니다:

```json
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

### Custom exceptions

- Custom exceptions를 생성할 때는 `HttpException` 클래스에서 상속받아야 합니다.

```typescript
export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
  }
}
```

- `ForbiddenException`을 `findAll()` 메소드 내부에서 던질 수 있습니다.

### 내장 HTTP 예외

- Nest는 `BadRequestException`, `NotFoundException` 등 다양한 표준 HTTP 예외를 제공합니다.
- 모든 내장 예외는 오류 원인과 설명을 포함할 수 있습니다.

```typescript
throw new BadRequestException("Something bad happened", {
  cause: new Error(),
  description: "Some error description",
});
```

:::

## Exception filters

- 예외 필터를 사용하여 예외 처리 계층을 완전히 제어할 수 있습니다.
- 코드 구현

```sh
# ip를 확인하기 위한 라이브러리 설치
npm i request-ip
```

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      success: false,
      timestamp: this.koreaTime(),
      statusCode: status,
      path: request.url,
      message: exception?.message || null,
      ip: this.requestIp(request),
    });
  }

  koreaTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  requestIp(request: Request) {
    return request.header["cf-connecting-ip"]
      ? request.header["cf-connecting-ip"]
      : requestIp.getClientIp(request);
  }
}
```

- `@Catch(HttpException)` 데코레이터는 `HttpException` 유형의 예외를 대상으로 합니다.
- 이제 app.controller.ts에 아래와 같이 에러를 일으켜 봅니다.

```typescript
@Get()
getHello(): string {
  throw new BadRequestException('에러발생!');
}
```

- 그럼 아래와 같이 return 됩니다.

```json
{
  "success": false,
  "timestamp": "2024-04-07 08:32:55",
  "statusCode": 400,
  "path": "/api",
  "message": "에러발생!",
  "ip": "::ffff:"
}
```

## 필터 바인딩

```typescript
private nestLib() {
  this.server.useGlobalFilters(new HttpExceptionFilter());
}
```

:::details controller에서 등록법

```typescript
@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

:::

## 모든 예외 처리

모든 예외처리는 모두가 다 처리되지 않는 경우가 있을 수 있습니다.  
예를들이 Error 입니다.  
모든 처리되지 않은 예외를 잡으려면 `@Catch()` 데코레이터의 매개변수 리스트를 비워 둡니다.

```typescript
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof Error) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response.status(500).json({
        success: false,
        timestamp: this.koreaTime(),
        statusCode: 500,
        path: request.url,
        message: exception?.message || null,
        ip: this.requestIp(request),
      });
    } else {
      if (exception !== null && typeof exception === "object") {
        this.logger.error(
          `Error type is constructor name: ${
            (exception as any).constructor.name
          }`
        );
      } else {
        this.logger.error(`Error type is ${typeof exception}`);
      }

      super.catch(exception, host);
    }
  }
}
```

코드는 그

이제 app.controller.ts에 아래와 같이 에러를 일으켜 봅니다.

```typescript
@Get()
getHello(): string {
  throw new Error('모든 에러!');
}
```

그럼 아래와 같이 return 됩니다.

```json
{
  "success": false,
  "timestamp": "2024-04-07 08:46:11",
  "statusCode": 500,
  "path": "/api",
  "message": "모든 에러!",
  "ip": "::ffff:"
}
```

:::tip
특정 유형에 바인딩된 필터와 함께 `AllExceptionsFilter` 필터를 결합할 때는 `AllExceptionsFilter` 필터를 먼저 선언하여 특정 필터가 바인딩된 유형을 올바르게 처리할 수 있도록 해야 합니다.
:::
