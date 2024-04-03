# Global prefix

[Nestjs Global prefix](https://docs.nestjs.com/faq/global-prefix)

# 설명

모든 route에 prefix를 추가 합니다.

```sh
curl localhost:3000
curl localhost:3000/api
```

# 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/90a3da19a22070252f8a6f8b682c286e6e204fe1)

```typescript
policy() {
  this.server.setGlobalPrefix('api');
}

```
