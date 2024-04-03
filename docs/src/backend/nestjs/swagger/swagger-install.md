# Swagger Installation

[NestJs Swagger Installation](https://docs.nestjs.com/openapi/introduction)<br/>
[Gihub Link](https://github.com/gornoba/nestjs-describe/tree/af878a1610a9ed7e9614be2aa96810ba4df401fc)

# Swagger

1. 설치

```sh
npm install --save @nestjs/swagger
```

2. main.ts 추가

```typescript
swagger() {
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();

  const document = SwaggerModule.createDocument(this.server, config);
  SwaggerModule.setup('docs', this.server, document);
}

async bootstrap() {
  this.policy();
  this.session();
  this.nestLib();
  this.swagger();
  await this.server.listen(this.port);
  this.url = await this.server.getUrl();
}
```

3. 접속
   `http://localhost:3000/docs`로 접속

## swagger 보안

swagger의 설치는 간편하게 끝났습니다.<br/>
하지만 나의 API 문서를 아무나 보면 좋지 않겠죠?<br/>
이제는 보안에 관한 것을 진행해보겠습니다.<br/>
express-basic-auth는 middleware로 원하는 route에 간단한 인증과정을 추가 할 수 있습니다.

## express-basic-auth

1. 설치

```sh
npm install express-basic-auth
```

2. main.ts 코드 추가

```typescript
class Application {
  private swaggerAuthInfo: {
    user: string;
    password: string;
  };

  constructor() {
    this.swaggerAuthInfo = process.env.SWAGGER_AUTH
      ? JSON.parse(process.env.SWAGGER_AUTH)
      : { user: "admin", password: "123" };
  }

  private swaggerAuth() {
    this.server.use(
      ["/docs", "/docs-json"],
      expressBasicAuth({
        challenge: true,
        users: {
          [this.swaggerAuthInfo.user]: this.swaggerAuthInfo.password,
        },
      })
    );
  }

  async bootstrap() {
    this.policy();
    this.session();
    this.nestLib();
    this.swaggerAuth();
    this.swagger();
    await this.server.listen(this.port);
    this.url = await this.server.getUrl();
  }
}
```

3. 실행
   이제 `http://localhost:3000/docs`로 가면 아이디와 비밀번호를 요청할 것입니다.<br/>
   이렇게 나의 소중한 api 문서를 잘 지켜보아요~
