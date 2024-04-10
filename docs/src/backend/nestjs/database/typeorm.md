# Database

[NestJs Database](https://docs.nestjs.com/techniques/database)
[NestJs SQL (TypeORM)](https://docs.nestjs.com/recipes/sql-typeorm)

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
