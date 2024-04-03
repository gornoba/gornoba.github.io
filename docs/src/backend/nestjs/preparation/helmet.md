# Helmet

[NestJs Helmet](https://docs.nestjs.com/security/helmet)

## 소개

Helmet은 Node.js 애플리케이션의 보안을 강화하기 위해 사용되는 미들웨어 패키지로, Express.js와 같은 웹 애플리케이션 프레임워크와 함께 사용됩니다. Helmet은 여러 보안 관련 HTTP 헤더를 설정함으로써 일반적인 웹 취약성으로부터 애플리케이션을 보호합니다. 이는 기본적으로 보안을 강화하는 다양한 미들웨어 함수들의 집합입니다. Helmet을 사용하면 다음과 같은 보안 헤더를 쉽게 관리할 수 있습니다.
:::warning
Express나 Fastify 작동구성상 Route를 정의하기 이전에 helmet이나 cors가 사용되어야 합니다.
:::

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/8871e4216f8f74d6bb9b0c84253c9de8f8aa33ea)

1. helmet 설치

```sh
npm i --save helmet
```

2. main.ts에 코드 추가

```typescript
class Application {
  private directives: {
    "default-src": string[];
    "script-src": string[];
  } = {
    "default-src": [],
    "script-src": [],
  };

  constructor() {
    process.env.DEFAULT_SRC?.split(",").forEach((src) =>
      this.directives["default-src"].push(src.trim())
    );
    process.env.SCRIPT_SRC?.split(",").forEach((src) =>
      this.directives["script-src"].push(src.trim())
    );
  }

  policy() {
    this.server.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            ...contentSecurityPolicy.getDefaultDirectives(), // 기본 정책
            ...this.directives, // 추가 정책 설정
          },
        },
      })
    );
  }
}
```
