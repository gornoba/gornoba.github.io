# 반복되는 transaction 코드 줄이기

## 공식문서의 방법

공식문서에서는 transaction 관리에 대해서 아래와 같이 하기를 추천한니다.  
물론 read에 대해서는 간단하게 repository api를 쓰기만해도 됩니다.  
그런데 아래와 같이 하면 무진장 코드가 반복됩니다.  
작은 단위로 transaction을 관리 할 수 있게 되면 안정성은 높아질 것 같습니다.

```typescript
async transaction<T>(target: EntityTarget<T>): Promise<T> {
  const queryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    queryRunner.manager.getRepository(target);
    await queryRunner.commitTransaction();
    return result;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
```

## 찾은 대안

나는 코드의 반복을 줄이고 transaction을 한번만 하기위해서 아래와 같은 서비스를 만들었습니다.  
work callback 함수에 queryRunner를 인수로 주고 그 안에서 repository 데이터 처리를 하였습니다.

```typescript
@Injectable()
export class QueryRunnerService {
  constructor(private readonly dataSource: DataSource) {}

  async runInTransaction<T>(
    work: (queryRunner: QueryRunner) => Promise<T>
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner("master");

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
```

실제 사용은 아래와 같이 진행 됩니다.

```typescript
async someReposity() {
  return await this.queryRunnerService.runInTransaction(
    async (queryRunner) => {

  })
}
```

## 새로 찾은 대안

### reference

https://velog.io/@hee_kyoung11/AsyncLocalStorage%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-Transaction-%EA%B4%80%EC%8B%AC%EC%82%AC-%EB%B6%84%EB%A6%AC%ED%95%98%EA%B8%B0-lines-40-%EA%B0%90%EC%86%8C

### 분석

블로그에 나온 코드는 사실 좀 난해하였다.  
왜나면 공식문서에도 잘 나오지 않는 @nestjs/core 사용하는 부분이 많았다.  
과정은 이렇다.

- transaction에 관한 custom decorator를 만들어 meta data를 입력
- @nestjs/core를 이용해서 각 instance의 prototype에 접근
- instance의 각 method를 순회하여 custom decorator로 입력한 meta data에 맞게 메서드를 만들어 준다.
- 메서드는 AsyncLocalstorage를 이용하여 비동기가 일어나는 동안 queryrunner를 저장하고 이용할 수 있게 해준다.
- 사용하는 서비스나 레파지토리에서 custom decorator를 쓰고 AsyncLocalstorage에서 queryrunner를 받아서 사용한다.

### transaction.decorator.ts

```typescript
import { SetMetadata, applyDecorators } from "@nestjs/common";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { AsyncLocalStorage } from "async_hooks";

export const TRANSACTION_KEY = Symbol("TRANSACTION_KEY");
export type DAEATORM = "default" | "ilsan";
export function TypeormTranscation(orm: DAEATORM = "default") {
  return applyDecorators(SetMetadata(TRANSACTION_KEY, orm));
}

export function getLocalStorageQueryRunner<T extends ObjectLiteral>(
  target: EntityTarget<T>
): Repository<T> {
  const localStorage = new AsyncLocalStorage();
  const queryRunner = localStorage.getStore();
  return queryRunner["qr"]?.manager;
}
```

### transaction.service.ts

```typescript
import { Injectable, OnModuleInit } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import * as _ from "lodash";
import { DAEATORM, TRANSACTION_KEY } from "../decorators/transaction.decorator";
import { AsyncLocalStorage } from "async_hooks";

@Injectable()
export class TransactionService implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
    @InjectDataSource("default") private readonly defaultDataSource: DataSource,
    @InjectDataSource("ilsan") private readonly ilsanDataSource: DataSource,
    private readonly als: AsyncLocalStorage<any>
  ) {}

  onModuleInit() {
    const providers = this.discoveryService.getProviders();

    const instances = _(providers)
      .filter(
        (a) => a.isDependencyTreeStatic() && !(!a.metatype || !a.instance)
      )
      .map(({ instance }) => instance)
      .value();

    instances.forEach((instance) => {
      const names = this.metadataScanner.getAllMethodNames(
        Object.getPrototypeOf(instance)
      );

      for (const name of names) {
        const originalMethod = instance[name];
        const metadata = this.reflector.get<DAEATORM>(
          TRANSACTION_KEY,
          originalMethod
        );
        switch (metadata) {
          case "default":
            instance[name] = this.typeormTransaction(originalMethod, instance);
            return;
          case "ilsan":
            instance[name] = this.typeormIlsanTransaction(
              originalMethod,
              instance
            );
        }
      }
    });
  }

  private typeormTransaction(originalMethod: any, instance: any) {
    return async function (...args: any[]) {
      const queryRunner = this.defaultDataSource.createQueryRunner();

      await this.als.run({ queryRunner }, async () => {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          const result = await originalMethod.apply(instance, args);
          await queryRunner.commitTransaction();
          return result;
        } catch (e) {
          await queryRunner.rollbackTransaction();
          throw e;
        } finally {
          await queryRunner.release();
        }
      });
    };
  }

  private typeormIlsanTransaction(originalMethod: any, instance: any) {
    return async function (...args: any[]) {
      const queryRunner = this.ilsanDataSource.createQueryRunner();

      await this.als.run({ queryRunner }, async () => {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          const result = await originalMethod.apply(instance, args);
          await queryRunner.commitTransaction();
          return result;
        } catch (e) {
          await queryRunner.rollbackTransaction();
          throw e;
        } finally {
          await queryRunner.release();
        }
      });
    };
  }
}
```

## transaciton.module.ts

```typescript
import { TransactionService } from "./services/transaction.servcie";
import { AsyncLocalStorage } from "async_hooks";

@Module({
  providers: [
    TransactionService,
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
  ],
  exports: [AsyncLocalStorage],
})
export class TransactionModule {}
```

## 적용서비스

```typescript
@TypeormTranscation()
async someRepository(user: UserDto) {
  const queryRunner = getLocalStorageQueryRunner();
  const newUser = queryRunner.create<UserEntity>(user);
  const result = await queryRunner.save(newUser);
  return result
}
```

### 결과

코드의 양이 상당히 줄어드는 걸 볼 수 있습니다. 하지만 해당코드는 진입장벽이 있는 편입니다.  
일단 하나하나 찾아보면서 @nestjs/core에 대한 공부가 필요하다는 것을 알았습니다.

## 기존 service에 AsyncLocalStorage 적용

그래도 새롭게 알게 된 것을 적용하고 매번 인수를 전달해야하는 불편함을 없애고자 asynclocalstorage를 적용해보았습니다.

### 코드변경

```typescript
async runLocalStorage<T>(work: () => Promise<T>): Promise<T> {
  const queryRunner = this.dataSource.createQueryRunner();

  return await this.als.run({ queryRunner }, async () => {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work();
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  });
}

async getQueryRunner(): Promise<QueryRunner> {
  return this.als.getStore()['queryRunner'].manager;
}
```

### 코드사용

```typescript
async someRepository(user:UserDto) {
  return result = await this.queryRunnerService.runLocalStrage(async () => {
    const queryRunner = this.queryRunnerService.getLocalStorageQueryRunner();
    const newUser = queryRunner.create<UserEntity>(user);
    const result = await queryRunner.save(newUser);
    return result
  })
}
```

데코레이터를 이용하는게 더 깔끔합니다
