# Link

[NestJs Lifecycle](https://docs.nestjs.com/faq/request-lifecycle)

## Summary

```
1.Incoming request
2.Middleware
  2.1. Globally bound middleware
  2.2. Module bound middleware
3.Guards
  3.1 Global guards
  3.2 Controller guards
  3.3 Route guards
4. Interceptors (pre-controller)
  4.1 Global interceptors
  4.2 Controller interceptors
  4.3 Route interceptors
5. Pipes
  5.1 Global pipes
  5.2 Controller pipes
  5.3 Route pipes
  5.4 Route parameter pipes
6. Controller (method handler)
7. Service (if exists)
8. Interceptors (post-request)
  8.1 Route interceptor
  8.2 Controller interceptor
  8.3 Global interceptor
9. Exception filters
  9.1 route
  9.2 controller
  9.3 global
10. Server response
```

## Describe

지금 당장은 NestJs의 Lifecycle에 대해서 잘 몰라도 됩니다.<br/>
단, 위의 과정을 눈여겨 보는 것이 좋습니다.<br/>
고객이 요청이 들어오면 middleware, guard, interceptor, pipe, controller, service, intercepter, exception filter의 순서로 진행된다는 것을 잘 알아두세요.<br/>
하나씩 익히면서 NestJs가 어떻게 작동하는지 알 수 있을 겁니다.
