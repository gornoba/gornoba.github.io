# TypeORM MongoDB

## NestJs에서 지원하는 MongoDB

https://docs.nestjs.com/techniques/mongodb<br/>
NestJs는 2가지로 MongoDB를 지원합니다. 하나는 TypeORM을 이용하는 방법이고 다른 하나는 Mongoose를 이용하는 방법입니다. 공식문서는 Mongoose를 이용한 방법이 나와 있습니다.<br/><br/>
https://medium.com/crocusenergy/typeorm-mongodb-%EC%A0%81%EC%9A%A9%EA%B3%BC-%EC%93%B0%EC%A7%80-%EC%95%8A%EA%B2%8C%EB%90%9C-%EC%9D%B4%EC%9C%A0-d3ce790b1455<br/>
해당 블로그를 보면 2021년에 작성된 글인데 TypeORM이 현재 MongoDB의 버전을 따라가지 못하고 있습니다.<br/><br/>
https://typeorm.io/<br/>
TypeORM의 공식홈페이지에서 보면 5버전때까지 지원하는 것 같습니다. 5.9.2가 설치되고 잘 실행되는 것을 볼 수 있었습니다.<br/>

## v5와 v6의 차이

1. 집계 작업의 향상: MongoDB 6.0은 집계 기능을 강화하여, 데이터베이스 내에서 더 복잡한 쿼리 및 데이터 변환을 직접 수행할 수 있게 되었습니다.
2. 시계열 컬렉션의 개선: 시계열 데이터 처리 기능이 향상되어, 시간 기반 데이터의 저장 및 쿼리가 더욱 효율적으로 이루어집니다. 이는 IoT, 금융 서비스와 같이 시계열 데이터를 많이 사용하는 애플리케이션에 특히 유용합니다.
3. 변경 스트림의 확장: 변경 스트림 기능이 확장되어, 애플리케이션이 데이터 변경을 실시간으로 더 쉽게 추적할 수 있게 되었습니다. 데이터 변경에 즉시 반응해야 하는 애플리케이션에 유용합니다.
4. 보안 기능 강화: 버전 6.0은 보안 기능을 대폭 강화하여, 데이터를 관리하고 보호하는 데 필요한 더 나은 방법을 제공합니다. 이는 현대 보안 표준에 부합하는 데 필수적입니다.
5. 클러스터드 컬렉션: MongoDB 5.0에서 도입된 이 기능은 계속해서 발전하고 있으며, 데이터 모델링의 유연성을 높이고 성능을 향상시키는 데 도움을 줍니다.
6. 쿼리 가능한 암호화 (Queryable Encryption): 쿼리 가능한 암호화 기능이 추가되어, 암호화된 데이터를 서버 측에서 쿼리할 수 있게 되었습니다. 이는 데이터 보안을 유지하면서도 성능을 저하시키지 않는 방법을 제공합니다.

## ORM을 사용하는 목적

제가 생각했을 때 ORM을 사용하는 목적은 무척 간단합니다. 추가적인 다른 언어를 배우지 않아도 된다는 점입니다.  
하지만 **ORM은 완벽하지 않습니다.** 저는 PostgreSQL을 오랫동안 써왔지만 ORM만을 이용하지 않습니다.  
Raw Query도 많이 쓰고 디버깅이나 최적화 할떄는 Raw Query를 로그에 출력하여 봅니다.  
하지만 그것을 뛰어넘는 간편함과 코드의 간결함과 일치성, 그리고 운영의 편리함에 사용하게 됩니다.  
이번에는 TypeORM으로 MongoDB를 구현해보겠습니다.

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/64bf5e36a043db96110aa0419f2b4d22e8541bb3)

### docker-compose

```yaml
mongo:
  image: mongo:latest
  environment:
    MONGO_INITDB_ROOT_USERNAME: root
    MONGO_INITDB_ROOT_PASSWORD: example
  volumes:
    - ./mongo-data:/data/db
  ports:
    - "27017:27017"

mongo-express:
  image: mongo-express
  ports:
    - 8081:8081
  environment:
    ME_CONFIG_MONGODB_ADMINUSERNAME: root
    ME_CONFIG_MONGODB_ADMINPASSWORD: example
    ME_CONFIG_BASICAUTH_USERNAME: user
    ME_CONFIG_BASICAUTH_PASSWORD: abcd
    ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017
    ME_CONFIG_BASICAUTH: true
  depends_on:
    - mongo
```

`docker-compose`에 위을 추가하고 나머지 부분을 주석처리한 뒤 먼저 실행(`docker-compose up --build -V`)해주세요.  
저는 `mongodb compass`를 설치하기가 싫어서 `mongo-express`를 함께 올렸습니다.  
`localhost:8081`로 접속하고 `user/abcd`를 입력해서 로그인을 해줍니다.  
그리고 `Database Name`이라고 placeholder가 보이는 Input에 test라고 입력해주고 `Create Database` 클릭합니다.  
이제 나머지 주석을 풀어 줍니다. 아직 실행하진 마시고 설치와 세팅을 먼저 해주겠습니다.

### NestJs Setting

#### mongodb 설치

```sh
# 공식문서에는 이렇게 나와 있는데 설치하면 5.9.2가 설치 됩니다.
npm install mongodb@^5.2.0 --save
```

#### TypeORM Mongo config

아래와 같이 config 파일을 하나 만들어 줍니다.  
이제 `datasource`에서 `mongo`라는 이름으로 접속이 가능해집니다.

```typescript
export const TypeOrmMongoConfig = {
  name: "mongo",
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => {
    const db = JSON.parse(configService.get("MONGO"));
    const { username, password, host, port, database, authSource } = db;

    const config: TypeOrmModuleOptions = {
      type: "mongodb",
      url: `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`,
      entities: [
        join(
          __dirname,
          "..",
          "..",
          "mongoDb",
          "entities",
          "**",
          "*.entity{.ts,.js}"
        ),
      ],
      synchronize: true,
      logging: ["error"],
    };

    return config;
  },
  inject: [ConfigService],
};
```

<br/>
app.module에 내용을 해당 config를 추가해줍니다.

```typescript
TypeOrmModule.forRootAsync(TypeOrmMongoConfig),
```

#### entity 생성

entity는 2가지 수준에서 만들었습니다.  
만드는 collection은 person 1개지만 subdocument로 cat을 만들고 cat이 집을 나갔으면 active가 false로 집에 있으면 active가 true로 할수 있게 하였습니다.

```typescript
// abstract.document.entity
@Entity()
export class AbstractMongoEntity {
  @ObjectIdColumn()
  @Transform(
    ({ value }) => (value instanceof ObjectId ? value.toHexString() : value),
    { toPlainOnly: true }
  )
  _id: ObjectId;

  @CreateDateColumn({
    type: "timestamp",
  })
  @Transform(({ value }) => currentTime(value))
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  @Transform(({ value }) => currentTime(value))
  updatedAt: Date;
}

// abstract.subdocument.entity
@Entity()
export class AbstractSubDocumentEntity extends AbstractMongoEntity {
  @Column({ type: "bool" })
  active: boolean;

  constructor(
    _id: ObjectId = new ObjectId(),
    active: boolean = true,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    super();
    this._id = _id;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
```

이제 person과 cat을 만들어 줍니다.

```typescript
// person.mongo.entity
import { Column, Entity } from "typeorm";
import { AbstractMongoEntity } from "../common/abstract.document.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CatsMongoEntity } from "../sub-document/cat.mongo.entity";

@Entity({
  name: "person",
})
export class PersonMongoEntity extends AbstractMongoEntity {
  @ApiProperty({
    description: "The name of a person",
    example: "John Doe",
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Column({
    type: "varchar",
  })
  name: string;

  @Column(() => CatsMongoEntity)
  cats: CatsMongoEntity[]; // mongo는 간단하게 이런식으로 하부에 연결이 가능합니다.
}

// cat.mongo.entity
Entity({
  name: "cats",
});
export class CatsMongoEntity extends AbstractSubDocumentEntity {
  @ApiProperty({
    description: "The name of a cat",
    example: "Kitty",
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Column({
    type: "varchar",
  })
  @Index()
  name: string;

  @ApiProperty({
    description: "The age of a cat",
    example: 3,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({
    type: "int",
  })
  age: number;

  @ApiProperty({
    description: "The breed of a cat",
    example: "Scottish Fold",
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Column({
    type: "varchar",
  })
  breed: string;

  constructor(cat: CatsMongoEntity) {
    super();
    Object.assign(this, cat);
  }
}
```

#### repository 생성

공통으로 사용할 repository를 만들어 줍니다.

```typescript
export abstract class AbstractMongoRepository<T extends AbstractMongoEntity> {
  constructor(private readonly cls: ClsService) {}

  async findAll(
    mongoEntity: EntityTarget<T>,
    options?: FindManyOptions<T> | Partial<T> | FilterOperators<T>
  ): Promise<T[]> {
    const queryRunner: EntityManager = this.cls.get("transaction");
    return queryRunner.getMongoRepository(mongoEntity).find(options);
  }

  async findOne(mongoEntity: EntityTarget<T>, id: string): Promise<T | null> {
    const queryRunner: EntityManager = this.cls.get("transaction");
    return queryRunner.getMongoRepository(mongoEntity).findOne({
      where: { _id: new ObjectId(id) },
    });
  }

  async create(mongoEntity: EntityTarget<T>, body: DeepPartial<T>): Promise<T> {
    const queryRunner: EntityManager = this.cls.get("transaction");
    const result = await queryRunner.getMongoRepository(mongoEntity).save(body);
    const idTransform = {
      ...result,
      _id:
        result._id instanceof ObjectId ? result._id.toHexString() : result._id,
    };

    return idTransform;
  }

  async deleteAll(mongoEntity: EntityTarget<T>): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }> {
    const queryRunner: EntityManager = this.cls.get("transaction");
    return queryRunner.getMongoRepository(mongoEntity).deleteMany({});
  }

  async deleteOne(
    mongoEntity: EntityTarget<T>,
    id: string
  ): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }> {
    const queryRunner: EntityManager = this.cls.get("transaction");
    return queryRunner
      .getMongoRepository(mongoEntity)
      .deleteOne({ _id: new ObjectId(id) });
  }

  queryRunner(): EntityManager {
    return this.cls.get("transaction");
  }
}
```

<br/>
여기서도 Async Localstorage를 이용해서 EntityManager를 받고 있습니다.   
transaction을 위해서 transaction 데코레이터를 약간 손봐줍니다.
<br/>

#### transaction decorator

constructor에 MongoDB를 사용하기 위한 datasource를 추가해줍니다.  
그리고 metadata가 mongo라면 mongo의 datasource를 사용하고 그렇지 않다면 postgre의 datasource를 사용하게 만들어줍니다.

```typescript
@Aspect(TRANSACTION_CONSTANT)
export class Transaction implements LazyDecorator<any, string> {
  constructor(
    @InjectDataSource("mongo") private readonly mongoDataSource: DataSource,
    private readonly dataSource: DataSource,
    private readonly cls: ClsService
  ) {}

  wrap({ method, metadata }: WrapParams<any, string>) {
    return async (...args: any) => {
      const queryRunner =
        metadata === "mongo"
          ? this.mongoDataSource.createQueryRunner()
          : this.dataSource.createQueryRunner();
      this.cls.set("transaction", queryRunner.manager);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await method(...args);
        await queryRunner.commitTransaction();

        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException(error.message);
      } finally {
        await queryRunner.release();
      }
    };
  }
}
```

#### controller > service > repository

이제 드디어 실행하면 됩니다. 복잡한것만 일단 해보겠습니다.

```typescript
// controller
@Post('person')
async createPerson(@Body() body: PersonMongoDto) {
  return await this.mongoService.createPerson(body);
}

// dto
export class PersonMongoDto extends PickType(PersonMongoEntity, [
  'name',
] as const) {
  @ApiProperty({
    type: [CatMongoDto],
    description: 'The cats of a person',
  })
  @ValidateNested({ each: true })
  @Type(() => CatMongoDto)
  cats: CatMongoDto[];
}

// service
@TransactionDeco('mongo')
async createPerson(body: PersonMongoDto) {
  return await this.personMongoRepository.createPerson(body);
}

// repository
async createPerson(body: PersonMongoDto) {
  const queryRuuner: EntityManager = this.queryRunner();
  const person = new PersonMongoEntity();
  person.name = body.name;
  person.cats = body.cats.map(
    (cat: CatsMongoEntity) => new CatsMongoEntity(cat),
  );

  const result = await queryRuuner
    .getMongoRepository(PersonMongoEntity)
    .save(person);

  return result;
}
```

이제 생성 swagger를 통해서 실행해보면 person 밑에 cats data가 잘 들어간 것을 확인 할 수 있습니다.
:::details

```json
{
  "success": true,
  "data": {
    "name": "나에요",
    "cats": [
      {
        "_id": "66261b3cb84c7fed3ef48c2d",
        "active": true,
        "createdAt": "2024-04-22 17:09:32.156",
        "updatedAt": "2024-04-22 17:09:32.156",
        "name": "Kitty",
        "age": 3,
        "breed": "Scottish Fold"
      },
      {
        "_id": "66261b3cb84c7fed3ef48c2e",
        "active": true,
        "createdAt": "2024-04-22 17:09:32.156",
        "updatedAt": "2024-04-22 17:09:32.156",
        "name": "papa",
        "age": 3,
        "breed": "Scottish Fold"
      },
      {
        "_id": "66261b3cb84c7fed3ef48c2f",
        "active": true,
        "createdAt": "2024-04-22 17:09:32.156",
        "updatedAt": "2024-04-22 17:09:32.156",
        "name": "popo",
        "age": 3,
        "breed": "Scottish Fold"
      }
    ],
    "createdAt": "2024-04-22 17:09:32.158",
    "updatedAt": "2024-04-22 17:09:32.158",
    "_id": "66261b3cb84c7fed3ef48c30"
  }
}
```

:::

## 후기

아직까지 MongoDB를 쓰면서 개발을 해본적은 없지만 typeorm으로 꽤나 간편하게 구현이 가능하다는 것은 참 좋은일 같습니다.  
typeorm이 계속 발전하면 더 많이 지원될 것이라 생각됩니다.
