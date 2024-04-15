# Database

[NestJs Database](https://docs.nestjs.com/techniques/database)<br/>
[NestJs SQL (TypeORM)](https://docs.nestjs.com/recipes/sql-typeorm)<br/>
[Github Link](https://github.com/gornoba/nestjs-describe/tree/592d893f53d9c87316ee27266f6384ac514c8e3e)

## 설치

```sh
npm install --save @nestjs/typeorm typeorm mysql2
```

## PostgreSQL Setting

### PostgreSQL 설치

docker-compose.yml에 postgre를 추가합니다.

```yml
postgres:
  image: postgres:alpine
  environment:
    POSTGRES_PASSWORD: abcde
  volumes:
    - ./postgres-data:/var/lib/postgresql/data
  ports:
    - "5432:5432"
```

### Connection Config File 생성

`lib/config/typeorm.conn.ts`

```typescript
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig = {
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => {
    const db = JSON.parse(configService.get("POSTGRE"));

    return {
      type: "postgres",
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      schema: db.schema,
      autoLoadEntities: true,
      entities: [
        join(
          __dirname,
          "..",
          "..",
          "db",
          "entities",
          "**",
          "*.entity{.ts,.js}"
        ),
      ],
      synchronize: true,
      logging: ["error"],
    };
  },
  inject: [ConfigService],
};
```

## entity 생성

### Abstract Entity

`db/common/abstract.entity.ts`에 공통적으로 필요한 column을 생성 합니다.

```typescript
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}
```

### Entity

`db/entities/` 폴더 밑에 필요한 entity를 생성합니다. 위에서 만든 abstract를 extends 합니다.

```typescript
import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

@Entity({
  name: "cats",
})
export class CatsEntity extends AbstractEntity {
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
}
```

### dto 정리

entity에서 ApiProperty와 Validation 코드가 있는 것을 볼 수 있습니다.  
dto에서 만든 코드와 겹치는데 entity에서 사용한 코드를 그대로 사용할 수 있게 코드를 변경합니다.

```typescript
export class CreateCatDto extends PickType(CatsEntity, [
  "name",
  "age",
  "breed",
] as const) {}
```

picktype은 `@nestjs/swagger`에 있습니다.

## Repository

repository 또한 provider로 만들어 집니다.<br/>
사실 service와 동일하게 만들어도 되지만 코드를 분리하기 위해 service와 repository를 분리하여 만듭니다.

### transaction

[@toss/nestjs-aop](/whoiam/company/toss-aop)

### Abstract Repository

공통으로 사용될 repository를 만들어 줍니다.

```typescript
export abstract class AbstractRepository<T extends AbstractEntity> {
  constructor(
    private readonly dataSource: DataSource,
    protected readonly cls: ClsService
  ) {}

  async find(
    entity: EntityTarget<T>,
    options?: FindManyOptions
  ): Promise<T[] | T> {
    const queryRunner: EntityManager = this.cls.get("transaction");
    const repository = queryRunner.getRepository<T>(entity);
    const result = await repository.find(options);

    if (result.length === 1) {
      return result[0];
    }

    return result;
  }

  async upsert(
    entity: EntityTarget<T>,
    data: DeepPartial<T[]>
  ): Promise<T[] | T> {
    const queryRunner: EntityManager = this.cls.get("transaction");
    const repository = queryRunner.getRepository<T>(entity);
    const tmpArr = [];

    for (const item of data) {
      try {
        if (item?.id) {
          const findOne = await this.find(entity, {
            where: { id: item.id },
          });

          if (!findOne) {
            throw new BadRequestException(`${item.id} Not found`);
          }

          const updatData = Object.assign(findOne, item);
          tmpArr.push(updatData);
        } else {
          tmpArr.push(item);
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    const result = await repository.save(tmpArr);
    return result.length === 1 ? (result[0] as T) : (result as T[]);
  }

  async delete(entity: EntityTarget<T>, id: number): Promise<T> {
    const queryRunner: EntityManager = this.cls.get("transaction");
    const repository = queryRunner.getRepository<T>(entity);
    const findOne = (await this.find(entity, {
      where: { id },
    })) as T;

    if (!findOne) {
      throw new BadRequestException(`${id} Not found`);
    }

    return repository.remove(findOne);
  }

  createQueryBuilder(): EntityManager {
    return this.cls.get("transaction");
  }
}
```

### repository

필요한 부분에 abstract repository 주입받아 사용합니다.

```typescript
@Injectable()
export class CatsRepository extends AbstractRepository<CatsEntity> {
  constructor(dataSource: DataSource, cls: ClsService) {
    super(dataSource, cls);
  }
}
```

## module에 등록

repository도 모두 provider라서 module의 provider에 등록해줍니다.  
그리고 다른 module에서 사용함으로 exports도 해줍니다.

```typescript
@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [UserRepository, CatsRepository],
  exports: [UserRepository, CatsRepository],
})
export class DbModule {}
```

## 사용

```typescript
@Injectable()
export class CatsService {
  private readonly cats: CatsDto[] = [];

  constructor(private readonly catsRepository: CatsRepository) {}

  @TransactionDeco()
  async create(cat: CreateCatDto): Promise<CatsEntity | CatsEntity[]> {
    return await this.catsRepository.upsert(CatsEntity, [cat]);
  }
}
```
