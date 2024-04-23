# Caching

[Github Link](https://github.com/gornoba/nestjs-describe/tree/eac66aac7fbabe48e48067190c97c0a7156ea93c)

## 설치

NestJs에서 cache를 이용하기 위해 먼저 설치해야할 패키지들이 있습니다.  
저는 in memory가 아니라 redis를 저장할 예정이라 추가로 설치해야 할 것도 있습니다.

```sh
npm install @nestjs/cache-manager cache-manager cache-manager-redis-yet
npm i -D @types/cache-manager
```

## 설정

```typescript
// cache.config.ts
import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

export const cacheModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<CacheModuleOptions> => {
    const redis = JSON.parse(configService.get('REDIS'));

    return {
      store: await redisStore({
        url: `redis://${redis.host}:${redis.port}`,
      }),
    };
  },
  inject: [ConfigService],
  isGlobal: true,
};

// app.module.ts
CacheModule.registerAsync<RedisClientOptions>(cacheModuleOptions),
```

<br/>
이렇게 하면 redis에 대한 설정은 끝났습니다.   
그럼 cache를 어디서든 이용할수 있게 코드을 만들어 보도록 하겠습니다.

## 구현

### Custom Decorator

간단하게 cache를 저장하고 사용할 수 있게 데코레이터를 만들어 줍니다.

```typescript
@Aspect(CACHE)
export class CacheDecoFn
  implements
    LazyDecorator<
      any,
      {
        mode: "get" | "set" | "del" | "reset" | "wrap";
        ttl?: number;
      }
    >
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  wrap({
    method,
    metadata,
  }: WrapParams<
    any,
    {
      mode: "get" | "set" | "del" | "reset" | "wrap";
      ttl?: number;
    }
  >) {
    return async (...args: any) => {
      const cacheData: { key: string; value?: any } = await method(...args);

      if (metadata.mode === "get") {
        return await this.get(cacheData.key);
      } else if (metadata.mode === "set") {
        return await this.set(cacheData.key, cacheData.value, metadata.ttl);
      } else if (metadata.mode === "del") {
        return await this.del(cacheData.key);
      } else if (metadata.mode === "reset") {
        return await this.reset();
      } else if (metadata.mode === "wrap") {
        return await this.cacheWrap(
          cacheData.key,
          cacheData.value,
          metadata.ttl
        );
      }
    };
  }

  async get(key: string) {
    return await this.cacheManager.get(key.toString());
  }

  async set(key: string, value: any, ttl?: number) {
    return await this.cacheManager.set(key.toString(), value, ttl * 1000);
  }

  async del(key: string) {
    return await this.cacheManager.del(key.toString());
  }

  async reset() {
    return await this.cacheManager.reset();
  }

  async cacheWrap(key: string, value: any, ttl: number) {
    return await this.cacheManager.wrap(
      key.toString(),
      async () => {
        return value;
      },
      ttl * 1000,
      10 * 60 * 1000
    );
  }
}

export const CacheDeco = (metadata: {
  mode: "get" | "set" | "del" | "reset" | "wrap";
  ttl?: number;
}) => createAopDecorator(CACHE, metadata);
```

### Service

```typescript
@Injectable()
export class CatsCacheService {
  constructor(private readonly catsService: CatsService) {}

  @CacheDeco({ mode: "get" })
  async findOne(id: number) {
    return { key: id };
  }

  @CacheDeco({ mode: "wrap", ttl: 10 * 60 })
  async wrap(id: number, value: any) {
    return { key: id, value };
  }
}
```

### controller

```typescript
@Get('get/:id')
async findOne(
  @Param('id', new ParseIntPipe()) id: number,
): Promise<CatsEntity | CatsEntity[]> {
  const cacheData = (await this.catsCacheService.findOne(id)) as unknown as CatsEntity;

  if (!cacheData) {
    const result = await this.catsService.findOne(id);
    await this.catsCacheService.wrap(id, result);
    return result;
  }

  return cacheData;
}
```

간산히 구현되어 이제 해당 아이디가 cache되어 있다면 cache된 데이터를 가져옵니다.

## 구현2

이보다 조금 더 간단한 방법이 있습니다.  
`CacheInterceptor`를 사용하는 방법입니다.  
그럼 controller에서 return 되는 데이터를 cache 할 수 있게 됩니다.

```typescript
@UseInterceptors(CacheInterceptor)
@CacheKey('findAll')
@CacheTTL(10)
@Get()
findAll() {
  return this.catsService.findAll();
}
```

상황에 맞춰 본인에게 필요한 부분에서 알맞게 사용하면 될 것 같습니다.
