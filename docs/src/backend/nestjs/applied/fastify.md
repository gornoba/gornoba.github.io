# Fastify

[NestJs Fastify](https://docs.nestjs.com/techniques/performance)

## 소개

- 성능: Fastify는 빠른 속도를 자랑합니다. 내부 벤치마크와 커뮤니티 테스트 모두에서, Fastify는 응답 시간과 처리량 측면에서 다른 Node.js 웹 프레임워크보다 뛰어난 성능을 보여줍니다.
- 스키마 기반: Fastify는 JSON Schema를 사용하여 라우트의 입력과 출력을 검증합니다. 이는 API의 안정성을 강화하고, 개발자가 API 문서를 쉽게 생성할 수 있도록 도와줍니다.
- 플러그인 시스템: Fastify는 확장 가능한 플러그인 아키텍처를 제공합니다. 이를 통해 개발자는 필요한 기능을 쉽게 추가하거나 커스터마이즈할 수 있습니다.
- 로깅: Fastify는 Pino, 매우 빠른 Node.js 로거를 내장하고 있습니다. 이를 통해 성능을 저하시키지 않으면서 효과적인 로깅이 가능합니다.

[Benchmarks](https://medium.com/deno-the-complete-reference/express-vs-fastify-vs-hapi-vs-koa-hello-world-performance-comparison-dd8cd6866bdd)

가장 중요한 것은 NestJs가 Fastify와 잘 맞고 무척 빠른다는 점입니다.

## express에서 fastify로 변경

### 변경점 1.

```typescript
import { Requset, Response } from "express";

import { FastifyRequest, FastifyReply } from "fastify";
```

위와 같이 변경하고 express와 같은 req, res를 쓰는경우  
fatify는 req['raw'], res['raw']를 써주면 된다.

### 변경점 2.

```typescript
// main.ts에서 middleware 설정 시
// express
app.use();

// fastify
await app.register();
```

## 변경점 3.

아래와 같이 라이브러리를 변경하고 라이브러리가 사용방식이 다른 것은 그에 맞춰 변경하였습니다.

- [helmet](https://docs.nestjs.com/security/helmet#use-with-fastify)
- [cookie](https://docs.nestjs.com/techniques/cookies#use-with-fastify)
- [csrf](https://docs.nestjs.com/security/csrf#use-with-fastify)
- [session](https://docs.nestjs.com/techniques/session#use-with-fastify)
- basic auth > fastifyBasicAuth로 변경하고 추가 코드 작성
  :::details fatifyBasicAuth

  ```typescript
  private async setUpSwaggerAuth() {
    let att = 0;
    const fastify = this.server.getHttpAdapter().getInstance();
    fastify.register(fastifyBasicAuth, {
      validate: async (
        username: string,
        password: string,
        req: FastifyRequest,
        reply: FastifyReply,
        done: () => void,
      ) => {
        if (
          username === this.SWAGGER_USER &&
          password === this.SWAGGER_PASSWORD
        ) {
          done();
        } else {
          reply.code(401).header('WWW-Authenticate', 'Basic');
        }
      },
      authenticate: true,
    });

    fastify.addHook(
      'preHandler',
      (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
        const swaggerPath = ['/docs', '/docs-json'];
        if (swaggerPath.includes(req.url)) {
          att++;
        } else {
          att = 0;
        }

        if (swaggerPath.includes(req.url) && !req.headers.authorization) {
          reply.code(401).header('WWW-Authenticate', 'Basic');
          if (att === 1) {
            done();
          } else {
            reply.redirect('http://' + req.hostname + req.url);
            att = 0;
          }
        } else if (swaggerPath.includes(req.url) && req.headers.authorization) {
          fastify.basicAuth(req, reply, done);
        } else {
          done();
        }
      },
    );
  }
  ```

  :::

## 변경점 4.

`@nestjs/serve-static`와 `@fastify/static`의 의존성 충돌이 일어나  
`@fastify/static`를 6.5.0으로 버전 변경
