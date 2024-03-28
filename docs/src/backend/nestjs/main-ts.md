# Describe

[Github](https://github.com/gornoba/nestjs-describe/tree/f51bd73272b2fb3b0bf383425b5bd8a9fcf2a00d) <br/>
main.ts는 NestJs의 주된 설정을 하는 곳이라고 보면 됩니다.<br/>
express를 사용해신 분들은 아시겠지만 port를 listen하거나 cors등의 설정을 하게 됩니다.<br/>
저는 기존 코드를 좀 변형하여 class로 제작해보려고 합니다.<br/><br/>
NestJs는 Express 뿐만 아니라 Fastify도 지원하는데 여기서는 Express 기준으로 코드를 제작하겠습니다.<br/>
또한 ENV도 함께 올려 알아보시는데 쉽게 만들어보려고 합니다.

## class로 코드 변경

```typescript
class Application {
  private readonly logger = new Logger(Application.name);
  private port: string;
  private url: string;

  constructor(private server: NestExpressApplication) {
    this.server = server;
    this.port = process.env.PORT || "8000";
  }

  async bootstrap() {
    await this.server.listen(this.port);
    this.url = await this.server.getUrl();
  }

  startLog() {
    this.logger.log(
      `Server running on ${this.url.replace(/\[::1\]/, "localhost")}`
    );
  }
}

async function init() {
  try {
    const server = await NestFactory.create<NestExpressApplication>(AppModule);
    const app = new Application(server);
    await app.bootstrap();

    app.startLog();
  } catch (error) {
    new Logger("init").error(error);
  }
}

init();
```

- Logger는 @nestjs/common에서 사용하며 로깅의 목적으로 사용됩니다.
- contructor에서 NestExpressApplication 타입의 server 객체를 받습니다.
- contructor 내부에서 전달받은 server 인스턴스를 클래스의 server 속성을 할당합니다.
- 코드가 바뀌었다면 아래와 같이 성공했다는 log를 확인할 수 있습니다.

```sh
npm run start:dev

[Nest] 94344  - 03/25/2024, 5:40:14 PM     LOG [NestFactory] Starting Nest application...
[Nest] 94344  - 03/25/2024, 5:40:14 PM     LOG [InstanceLoader] AppModule dependencies initialized +7ms
[Nest] 94344  - 03/25/2024, 5:40:14 PM     LOG [RoutesResolver] AppController {/}: +3ms
[Nest] 94344  - 03/25/2024, 5:40:14 PM     LOG [RouterExplorer] Mapped {/, GET} route +1ms
[Nest] 94344  - 03/25/2024, 5:40:14 PM     LOG [NestApplication] Nest application successfully started +1ms
[Nest] 94344  - 03/25/2024, 5:40:14 PM     LOG [Application] Server running on http://localhost:8000
```
