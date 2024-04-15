# @toss/nestjs-aop

## referrence

https://toss.tech/article/nestjs-custom-decorator<br/>
https://github.com/toss/nestjs-aop?tab=readme-ov-file<br/>
[Github Link](https://github.com/gornoba/nestjs-describe/tree/592d893f53d9c87316ee27266f6384ac514c8e3e)

## description

refference의 내용을 참고해보면.. 음.. 복잡합니다.  
간단하게 말하면 NestJs의 구조상 반복되는 코드를 줄이기 위해  
module이 init할 때 각 instance와 method를 순회하면서 매칭되는 metadata에 원하는 코드를 wrap한다는 이야기...도 어렵군요 ㅎㅎ;;  
그냥 감사하게 toss에서 코드를 줄일 수 있는 라이브러리를 만들어주셨다 정도로 생각하면 될 것 같습니다.  
저는 typeorm의 transaction의 코드를 줄여보았습니다.

## TypeORM transaction

트랜잭션(transaction)은 데이터베이스의 상태를 변경하는 하나 이상의 작업을 그룹화하여 이들이 하나의 단위로 처리되도록 하는 것을 의미합니다. 트랜잭션을 사용하는 주된 목적은 데이터의 일관성과 무결성을 유지하는 것입니다.
이전 [저의 글](/whoiam/company/nestjs-orm-transaction#찾은-대안)에서 반복되는 transaction을 줄이고 query를 한번에 database에 보낼 수 있게 제작한 코드가 있습니다.  
코드의 양이 줄어들었으나 그래도 그렇게 만족할만큼은 아니었습니다.  
[TypeORM transaction](https://docs.nestjs.com/techniques/database#typeorm-transactions)은 기본적으로 아래와 같이 만들어 집니다.

```typescript
async createMany(users: User[]) {
  const queryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.manager.save(users[0]);
    await queryRunner.manager.save(users[1]);

    await queryRunner.commitTransaction();
  } catch (err) {
    // since we have errors lets rollback the changes we made
    await queryRunner.rollbackTransaction();
  } finally {
    // you need to release a queryRunner which was manually instantiated
    await queryRunner.release();
  }
}
```

## @toss/nestjs-aop

### 설치전 버전변경

설치전 `package.json`에서 `reflect-metadata`를 `0.1.13`으로 변경합니다.  
[@toss/nestjs-aop](https://github.com/toss/nestjs-aop?tab=readme-ov-file)의 `package.json`을 보면 `peerDependencies`에 위와 같이 설정되어 있습니다.  
일반 개발환경에서는 문제가 되지 않을 수도 있지만 docker를 이용한다거나 하면 `npm install`이 안됩니다.

### 설치

```sh
npm install @toss/nestjs-aop nestjs-cls
```

### 구현

0. typeorm의 queryRunner를 전달하기 위해서 Async Local Storage를 사용할 것입니다. Async Local Storage는 NodeJs에서 특정 데이터를 지속적으로 전달할 수 있습니다. `nestjs-cls`를 사용합니다.
1. metadata로 사용할 constant를 파일을 하나 만들어 줍니다.
   ```typescript
   export const TRANSACTION_CONSTANT = Symbol("TRANSACTION_CONSTANT");
   ```
2. wrap 해줄 provider를 만들어 줍니다.

   ```typescript
   import {
     Aspect,
     LazyDecorator,
     WrapParams,
     createDecorator,
   } from "@toss/nestjs-aop";
   import { TRANSACTION_CONSTANT } from "../constants/transaction.constant";
   import { DataSource } from "typeorm";
   import { ClsService } from "nestjs-cls";

   @Aspect(TRANSACTION_CONSTANT)
   export class Transaction implements LazyDecorator<any, any> {
     constructor(
       private readonly dataSource: DataSource,
       private readonly cls: ClsService
     ) {}

     wrap({ method }: WrapParams<any, any>) {
       return async (...args: any) => {
         const queryRunner = this.dataSource.createQueryRunner();
         this.cls.set("transaction", queryRunner.manager);

         await queryRunner.connect();
         await queryRunner.startTransaction();

         try {
           const result = await method(...args);
           await queryRunner.commitTransaction();

           return result;
         } catch (error) {
           await queryRunner.rollbackTransaction();
         } finally {
           await queryRunner.release();
         }
       };
     }
   }
   ```

   `WrapParams`에는 `instance`, `methodName`, `mothod`, `metadata`를 받을 수 있습니다.  
   `mothod`는 wrap되기 이전 mothod에서 return되는 내용을 `...arg`로 전달합니다.  
   `metadata`는 아래 custom decorator를 만들때 전달 할 수 있습니다.  
   문서에는 CacheOption을 전달하는 것으로 예제가 나와있습니다.

3. 그리고 저는 같은 파일 안에 custom decorator도 만들어 줬습니다.

   ```typescript
   export const TransactionDeco = () => createDecorator(TRANSACTION_CONSTANT);
   ```

4. 이제 service에서 필요한 method 부분에 `TransactionDeco`를 적용시켜 줍니다.

   ```typescript
   @TransactionDeco()
   async create(cat: CreateCatDto): Promise<CatsEntity | CatsEntity[]> {
     return await this.catsRepository.upsert(CatsEntity, [cat]);
   }
   ```

5. repository에서는 queryRunner를 받아 필요한 작업을 해줍니다.

   ```typescript
   async find(
     entity: EntityTarget<T>,
     options?: FindManyOptions,
   ): Promise<T[] | T> {
     const queryRunner = this.dataSource.createQueryRunner();
     const queryRunner: EntityManager = this.cls.get('transaction');
     const repository = queryRunner.getRepository<T>(entity);
     const result = await repository.find(options);

     if (result.length === 1) {
       return result[0];
     }

     return result;
   }
   ```

   :::details 원래라고 하면..

   ```typescript
   async find(
     entity: EntityTarget<T>,
     options?: FindManyOptions,
   ): Promise<T[] | T> {
     const queryRunner: EntityManager = this.cls.get('transaction');

     await queryRunner.connect();
     await queryRunner.startTransaction();

     try {
      const repository = queryRunner.getRepository<T>(entity);
      const result = await repository.find(options);

      if (result.length === 1) {
        return result[0];
      }

      await queryRunner.commitTransaction();
      return result;
     } catch (error) {
      await queryRunner.rollbackTransaction();
     } finally {
      await queryRunner.release();
     }
   }
   ```

   :::

6. 이제 실행해보면 잘되는것 볼 수 있습니다. 덕분에 코드량이 많이 줄었습니다.
