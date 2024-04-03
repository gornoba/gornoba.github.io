# Link

[NestJs SWC](https://docs.nestjs.com/recipes/swc)
[GitHub](https://github.com/gornoba/nestjs-describe/commit/1ef3e97ac8f1745c82b8e750ab7c6e3ddb4c605a)

## Describe

이번은 알면 좋은 정도로 하면 좋습니다.<br/>
NestJs는 기본적으로 Webpack을 번들러로 쓰고 있습니다.<br/>
다만 프로젝트가 복잡해지고 부피가 커지면 번들링의 속도가 느려지게 되는데 SWC(Speedy Web Compiler)가 version 10에 업데이트 되었습니다.<br/>
빠른데 기존에 Webpack으로 프로젝트를 만들었다면 변경해야할 부분이 있습니다.<br/>
저는 SWC 기준으로 설명을 하려고 합니다.

## 설치

```sh
npm i --save-dev @swc/cli @swc/core
```

## 사용

### 기존 command를 변경하지 않고 사용하려면

```sh
nest start -b swc

# watch mode
nest start -b swc -w

# type check
nest start -b swc --type-check
```

### default로 사용하려면

- `nest-cli.json` 파일을 아래와 같이 변경

```json
"compilerOptions": {
    "builder": "swc",
    "typeCheck": true, // typechek 하려면
    "options": {
      "swcrcPath": "infrastructure/.swcrc", // 따로 swc configration을 만든다면
    }
  }
```

### SWC configration

```
{
  "$schema": "https://json.schemastore.org/swcrc",
  "sourceMaps": true,
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "decorators": true,
      "dynamicImport": true
    },
    "baseUrl": "./"
  },
  "minify": false
}

```

## SWC Migration

### TypeORM/MikroORM을 사용하고 있었다면

```typescript
@Entity()
export class User {
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Relation<Profile>;
  // Relation은 typeorm에 있습니다. 위와 같은 방식으로 변경이 필요합니다.
}
```

### Service가 순환종속 관계에 있었다면

- 적당한 곳에 아래와 같이 ts 파일 생성
  ```typescript
  export type WrapperType<T> = T;
  ```
- 순환종속성의 type을 아래와 같이 변경
  ```typescript
  @Injectable()
  export class UserService {
    constructor(
      @Inject(forwardRef(() => ProfileService))
      private readonly profileService: WrapperType<ProfileService>
    ) {}
  }
  ```
