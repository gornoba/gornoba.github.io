# CORS

[NestJs CORS](https://docs.nestjs.com/security/cors)

## CORS란?

웹 애플리케이션에서 실행 중인 스크립트가 다른 출처의 리소스에 접근할 수 있게 해주는 보안 메커니즘입니다. 기본적으로 웹 브라우저는 같은 출처 정책(Same-Origin Policy)을 사용하여, 스크립트가 다른 도메인, 프로토콜 또는 포트의 리소스를 요청할 때 이를 제한합니다. CORS는 특정 조건 하에서 이러한 요청을 허용하는 방법을 제공합니다.

## 작동 원리

CORS 요청은 일반적으로 두 가지 방식으로 이루어집니다: 단순 요청(Simple Requests)과 사전 요청(Preflight Requests).

- **단순 요청 (Simple Requests):** HTTP 메소드가 GET, HEAD, POST 중 하나이며, 특정 조건을 만족하는 경우에 해당합니다. 이러한 요청은 특별한 CORS 헤더 없이도 보내질 수 있습니다.

- **사전 요청 (Preflight Requests):** 서버에 본 요청을 보내기 전에 `OPTIONS` 메소드를 사용하여 사전에 요청을 보내는 것입니다. 이는 서버가 요청을 수락할 준비가 되어 있는지 확인하기 위한 것입니다. 사전 요청은 리소스가 사용하는 메소드, 헤더, 그리고 출처 등에 대한 정보를 포함합니다.

## 중요 헤더

- `Access-Control-Allow-Origin`: 서버가 응답에 이 헤더를 포함시켜, 특정 출처의 리소스 요청을 허용합니다.
- `Access-Control-Allow-Methods`: 서버가 허용하는 HTTP 메소드를 명시합니다.
- `Access-Control-Allow-Headers`: 서버가 허용하는 헤더를 명시합니다.
- `Access-Control-Max-Age`: 사전 요청의 결과를 캐시하는 시간을 명시합니다.

## 사용 사례

CORS는 API를 다른 도메인의 웹 애플리케이션에서 사용하고자 할 때 흔히 사용됩니다. 예를 들어, https://api.example.com에서 데이터를 제공하는 API가 있고, https://web.example.com에서 이 API를 사용하는 클라이언트가 있는 경우, API 서버는 적절한 CORS 헤더를 응답에 포함시켜 클라이언트의 요청을 허용해야 합니다.

## 주의사항

CORS는 데이터의 공개적인 접근을 허용하기 위한 것이므로, 중요한 데이터를 다룰 때는 보안에 주의해야 합니다. 예를 들어, 민감한 정보를 포함하는 API는 오직 신뢰할 수 있는 출처에서만 접근을 허용해야 합니다.

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/e1823ca26a0f483c3dabe46c1dfc93e77dbc952a)

1. Class로 변경한 main.ts에 policy라는 method를 만들어 제작하겠습니다.<br/>
   이제 env 사용을 위해서 dotenv를 설치하겠습니다.

```sh
npm i dotenv
```

2. policy라는 메서드를 만들어 봅니다.

```typescript
policy() {
    this.server.enableCors({
      origin: this.corsOrigin,
      credentials: true, // cookie를 사용하기 위해 설정
    });
  }
```

3. 변수를 만들어주고 환경변수에서 쉼표(,)로 구분하여 여러 도메인을 넣을 수 있게 만들어 줍니다.

```typescript
class Application {
  private corsOrigin: string[];

  constructor() {
    this.corsOrigin = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
      : ["*"];
  }
}
```
