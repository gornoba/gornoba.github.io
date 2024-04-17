# Lazy loading modules

lazy module은 보통 cold start가 필요한 환경에서 많이 쓰이게 됩니다.  
worker/cron job/lambda & serverless function/webhook, input arguments (route path/date/query parameters, etc.) 쓰이며 처음 loading 시간을 줄여주게 됩니다.

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/411d5fbffe827f6d7a9288324486627ab36c85fd)

```typescript
@Injectable()
export class CatsService {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  someMethod() {
    const { LazyModule } = await import("./lazy.module");
    const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

    const { LazyService } = await import("./lazy.service");
    const lazyService = moduleRef.get(LazyService);
  }
}
```

위의 코드를 보아하니 코드의 반복이 느껴접니다.

### custom decorator로 변경

`@toss/nestjs-aop`를 이용하여 코드를 줄여보기로 합니다.  
모든 lazy는 lazy module안에서만 만든다고 가정해보겠습니다.

#### lazy.module, lazy.service

```typescript
// module

import { Module } from "@nestjs/common";
import { LazyService } from "./lazy.service";

@Module({
  providers: [LazyService],
  exports: [LazyService],
})
export class LazyModule {}

// servcie
export const LazyServiceMethods = {
  lazy: "lazy",
};
@Injectable()
export class LazyService {
  lazy(data: { is: boolean; name: string }) {
    const { is, name } = data;

    return `${name} is ${is ? "lazy" : "not lazy"}`;
  }
}
```

## custom decorator

```typescript
import {
  LazyDecorator,
  WrapParams,
} from "../interfaces/lazy-decorator.interface";
import { Aspect } from "./aspect.decorator";
import { createAopDecorator } from "./create-aop.decorator";
import { LAZYLOAD } from "../constants/lazy.constant";
import { LazyModuleLoader } from "@nestjs/core";

@Aspect(LAZYLOAD)
export class Lazy
  implements
    LazyDecorator<
      any,
      {
        provider: Function;
        method: string;
      }
    >
{
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  wrap({
    method,
    metadata,
  }: WrapParams<
    any,
    {
      provider: Function;
      method: string;
    }
  >) {
    return async (...args: any) => {
      const { LazyModule } = await import("../../lazy/lazy.module");
      const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

      const provider = metadata.provider;

      if (!provider.prototype[metadata.method]) {
        throw new Error(`Method ${metadata.method} not found in provider`);
      }

      const instance = moduleRef.get(provider);

      const methodReturn = await method(...args);
      return instance[metadata.method](methodReturn);
    };
  }
}

export const LazyDeco = (metadata: { provider: Function; method: string }) =>
  createAopDecorator(LAZYLOAD, metadata);
```

### 서비스에서 적용

```typescript
@LazyDeco({
  provider: LazyService,
  method: LazyServiceMethods.lazy,
})
async lazy() {
  return { is: true, name: '나나나나' };
}

// return: "나나나나 is lazy"
```

## 알면 좋은것

- lazy module은 캐시되서 첫번쨰만 좀 오래 걸리고 나중에는 빨리 로딩됩니다.
- constroller, gateway, resolver는 lazy module을 사용할 수 없습니다.
