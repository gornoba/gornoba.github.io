# Configuration

보통 express에서 `dotenv`를 사용하여 환경변수를 관리합니다.  
NestJs에서는 `@nestjs/config`를 사용하여 환경변수를 이용합니다.  
[Github Link](https://github.com/gornoba/nestjs-describe/tree/01cf7327a17bbaa6fc75d08aaa5495a933303127)

## 설치

```sh
npm i --save @nestjs/config
```

## 시작하기

```typescript
// app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

## config module options

1. `cache`: 만약 "true"로 설정된다면, process.env 객체에서 값을 메모리에 캐싱합니다. 이는 전체 애플리케이션 성능을 향상시킵니다.
2. `isGlobal`: 만약 "true"로 설정된다면, ConfigModule을 전역 모듈로 등록합니다. 전역 모듈로 설정하면 다른 모듈에서 모듈을 재사용 할 수 있습니다.
3. `ignoreEnvFile`: 만약 "true"로 설정된다면, 환경 파일 (.env)은 무시됩니다. 이는 .env 파일을 사용하지 않고 OS레벨의 설정된 환경변수만을 이용합니다.
4. `ignoreEnvVars`: 만약 "true"로 설정된다면, 사전에 정의된 환경 변수들은 검증되지 않습니다.
5. `envFilePath`: 로드할 환경 파일의 경로를 지정합니다. 문자열 또는 문자열 배열로 경로를 설정할 수 있습니다.
6. `validate`: 환경 변수를 검증하는 사용자 정의 함수입니다. 이 함수는 환경 변수를 포함한 객체를 입력으로 받고, 검증된 환경 변수를 출력합니다. 함수에서 예외가 발생하면 애플리케이션의 부트스트랩을 방지할 수 있습니다.
7. `validationSchema`: 환경 변수 검증 스키마 (Joi)를 설정합니다. 이는 Joi 라이브러리를 사용하여 환경 변수의 유효성을 검사합니다.
8. `validationOptions`: 스키마 검증 옵션입니다. Joi 라이브러리의 API 문서에서 자세한 옵션을 확인할 수 있습니다.
9. `load`: 로드할 사용자 정의 설정 파일의 배열입니다. 이 배열은 설정 파일을 동적으로 로드하는 데 사용됩니다.
   - `js-yaml`을 사용하여 yaml파일을 load 할 수도 있습니다.
   - https://docs.nestjs.com/techniques/configuration#custom-configuration-files
10. `expandVariables`: 확장 변수의 사용 여부를 나타내는 부울 값이거나, dotenv-expand에 전달할 옵션을 포함하는 객체입니다. .env 파일에 확장 변수가 포함된 경우, 이 속성이 true로 설정되어야만 파싱됩니다.

## 사용

```typescript
// some Service
constructor(private configService: ConfigService) {}

const dbUser = this.configService.get<string>('DATABASE_USER');

// 첫번째 환경변수가 없으면 두번쨰 환경변수를 찾습니다.
const dbUser = this.configService.get<string>('DATABASE_USER', "SECOND_USER");
```

### 제네릭 타입을 이용한 타입 설정

```typescript
interface EnvironmentVariables {
  PORT: number;
  TIMEOUT: string;
}

// somewhere in the code
constructor(private configService: ConfigService<EnvironmentVariables>, true) // tsconfig에서 strictNullChecks가 false일 경우 두번쨰 인수를 true로 만들어준다.
{
  const port = this.configService.get('PORT', { infer: true });

  // TypeScript Error: this is invalid as the URL property is not defined in EnvironmentVariables
  const url = this.configService.get('URL', { infer: true });
}
```

## namespace 사용

### 정의

```typescript
export const database = registerAs("database", () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
}));
```

### 설정

```typescript
import databaseConfig from "./config/database.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
})
export class AppModule {}
```

### 사용

```typescript
// 방법1
const dbHost = this.configService.get<string>("database.host");

// 방법2
constructor(
  @Inject(databaseConfig.KEY)
  private dbConfig: ConfigType<typeof databaseConfig>,
) {}
```

## validation

```sh
npm install --save joi
```

### envValidationSchema

Joi는 Json을 지원해주지 않아서 직접 만들 필요가 있습니다.  
반복되는 코드를 줄이고자 fn을 만들어 Joi로 validation을 합니다.

```typescript
import * as Joi from "joi";

export const envValidationSchema = Joi.object({
  ENV: Joi.string().valid("development", "production").required(),
  PORT: Joi.number().required().default(3000),
  CORS_ORIGIN: Joi.string().required().default("*"),
  DEFAULT_SRC: Joi.string().required(),
  SCRIPT_SRC: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
  SWAGGER_AUTH: Joi.string().custom((value) =>
    joiCustom(value, ["user", "password"])
  ),
  JWT_SECRET: Joi.string().required(),
  REDIS: Joi.string().custom((value) => joiCustom(value, ["host", "port"])),
  POSTGRE: Joi.string().custom((value) =>
    joiCustom(value, [
      "host",
      "port",
      "username",
      "password",
      "database",
      "schema",
    ])
  ),
});

function joiCustom<V = any>(value: V, objKeys: string[]) {
  try {
    const config = JSON.parse(String(value));

    const joyObj = {};
    objKeys.forEach((key) => {
      if (key === "port") {
        joyObj[key] = Joi.number().required();
      } else {
        joyObj[key] = Joi.string().required();
      }
    });

    const configSchema = Joi.object(joyObj);
    const { error } = configSchema.validate(config);
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Joi.ValidationError(error.message, [error.details], value);
  }
}
```

### app.module

```typescript
ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: envValidationSchema,
}),
```
