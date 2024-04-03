# JWT(Json Web Token)

[Github link](https://github.com/gornoba/nestjs-describe/tree/77be5a5ce8f1cd731ad3269cfe0db180d003c7c4)

- 사용자가 사용자 이름/비밀번호로 인증할 수 있도록 허용하여 보호된 API 엔드포인트에 대한 후속 호출에서 사용할 수 있도록 JWT를 반환해야 합니다. 이 요구 사항을 충족하기 위한 작업은 순조롭게 진행 중입니다. 이를 완료하려면 JWT를 발급하는 코드를 작성해야 합니다.
- bearer 토큰 혹은 cookie로 유효한 JWT의 존재를 기반으로 보호되는 API 경로를 만듭니다.

## 필수 패키지 설치

```sh
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

## JWT module의 옵션 설명

JWT는 아래와 같이 정말 방대한 옵션을 담고 있습니다.<br/>
production 환경에서는 미세하게 다뤄주면 좋기 떄문에 여러가지 옵션을 사용하지만..<br/>
우리는 secret과 signOptions - expiresIn 정도만 다뤄 봅시다.

| Name                             |                    type                     | Description                                                                                                 |
| :------------------------------- | :-----------------------------------------: | :---------------------------------------------------------------------------------------------------------- |
| global                           |                   boolean                   | JWT 모듈이 전역 모듈로 설정되어 애플리케이션의 어느 곳에서나 쉽게 접근할 수 있습니다. 기본값은 false입니다. |
| signOptions                      |                                             | 토큰을 서명할 때 사용할 옵션들을 지정합니다.                                                                |
| ├ algorihm                       |                  Algorithm                  | JWT의 서명 알고리즘. HS256(default),HS384,HS512,RS256,RS384,RS512,ES256,ES384,ES512,none                    |
| ├ keyid                          |                   string                    | JWT의 헤더에 포함될 kid (키 ID) 값을 지정합니다. 이는 서명에 사용되는 특정 키를 식별하는 데 사용됩니다.     |
| ├ expiresIn                      |              string \| number               | 토큰의 만료 시간을 설정합니다. 예를 들어, 60, "2 days", "10h" 등으로 지정할 수 있습니다.                    |
| ├ notBefore                      |              string \| number               | 토큰이 활성화되기 전의 대기 시간을 설정합니다.                                                              |
| ├ audience                       |             string \| string[]              | 토큰의 대상 수신자를 지정합니다.                                                                            |
| ├ subject                        |                   string                    | 토큰의 주제를 지정합니다.                                                                                   |
| ├ issuer                         |                   string                    | 토큰의 발행자를 지정합니다.                                                                                 |
| ├ jwtid                          |                   string                    | JWT의 고유 식별자를 지정합니다. 토큰을 고유하게 식별하고 중복 사용을 방지하는 데 사용됩니다.                |
| ├ mutatePayload                  |                   boolean                   | 페이로드를 변경할 수 있게 할지 여부를 설정합니다.                                                           |
| ├ noTimestamp                    |                   boolean                   | 토큰에 iat (issued at) 타임스탬프를 포함하지 않을지 결정합니다.                                             |
| ├ header                         |                  JwtHeader                  | JWT의 헤더에 추가적인 정보를 포함시킬 수 있습니다.                                                          |
| ├ encoding                       |                   string                    | 인코딩 방식을 지정합니다.                                                                                   |
| ├ allowInsecureKeySizes          |                   boolean                   | 보안에 취약한 키 크기를 허용할지 결정합니다.                                                                |
| ├ allowInvalidAsymmetricKeyTypes |                   boolean                   | 유효하지 않은 비대칭 키 유형을 허용할지 결정합니다.                                                         |
| secret                           |              string \| Buffer               | 대칭 키 서명에 사용될 비밀 키입니다.                                                                        |
| publicKey                        |              string \| Buffer               | 비대칭 키 서명/검증에 사용될 공개 키입니다.                                                                 |
| privateKey                       |                 jwt.Secret                  | 비대칭 키 서명에 사용될 개인 키입니다.                                                                      |
| secretOrKeyProvider              |                                             | 이 함수는 요청 유형, 토큰 또는 페이로드, 옵션에 따라 동적으로 비밀 키를 제공합니다.                         |
| verifyOptions                    |                                             | 토큰을 검증할 때 사용할 옵션들입니다.                                                                       |
| ├ algorithms                     |                 Algorithm[]                 | 허용할 알고리즘을 지정합니다.                                                                               |
| ├ audience                       | string \| RegExp \| Array<string \| RegExp> | 검증할 수신자를 지정합니다.                                                                                 |
| ├ clockTimestamp                 |                   number                    | 현재 시간을 기준으로 설정합니다.                                                                            |
| ├ clockTolerance                 |                   number                    | 타임스탬프 검증 시 허용할 시간 오차 범위를 지정합니다.                                                      |
| ├ complete                       |                   boolean                   | 검증 성공 시 토큰의 전체 payload를 반환할지 여부를 결정합니다.                                              |
| ├ issuer                         |             string \| string[]              | 토큰 발행자를 검증합니다.                                                                                   |
| ├ ignoreExpiration               |                   boolean                   | 토큰의 만료를 무시할지 결정합니다.                                                                          |
| ├ ignoreNotBefore                |                   boolean                   | notBefore 클레임을 무시할지 결정합니다                                                                      |
| ├ jwtid                          |                   string                    | JWT ID를 검증합니다.                                                                                        |
| ├ nonce                          |                   string                    | nonce 값을 검증합니다.                                                                                      |
| ├ subject                        |                   string                    | 주제(subject)를 검증합니다.                                                                                 |
| ├ maxAge                         |              string \| number               | 이 값을 초과하는 토큰은 무효로 처리됩니다.                                                                  |
| ├ allowInvalidAsymmetricKeyTypes |                   boolean                   | 유효하지 않은 비대칭 키 유형을 허용할지 결정합니다.                                                         |

## JWT Sign

### lib.module.ts

```typescript
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService
      ): Promise<JwtModuleOptions> => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: "5m" },
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
```

useFactory가 나왔네요. 이것은 [custom providers](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory)에서 나옵니다.<br/>
간단하게 설정을 내가 원하는데로 동적으로 바꿔줄수 있고 비동기적인 설정도 가능하게 합니다.<br/>
나중에 provider 때 더 자세히 배워 봅시다.

### lib - auth - jwt - jwt-sign.service.ts

```typescript
@Injectable()
export class JwtSignService {
  constructor(private readonly JwttService: JwtService) {}

  async signJwt(user: UsersDto) {
    return await this.JwttService.signAsync(user);
  }
}
```

### login.module.ts

```typescript
@Module({
  imports: [forwardRef(() => LibModule)],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
```

서로 참조하여 순환종속성이 생김으로 forwardRef를 해줍니다.

### login.controller.ts

```typescript
@UseGuards(LocalAuthGuard)
@Post()
async login(@Req() req: Request): Promise<string> {
  const user = req.user as UsersDto;
  const jwt = await this.jwtSignService.signJwt({ ...user });
  return jwt;
}
```

## JWT 토큰 쿠키에 넣기

[Cookie Parser](/backend/nestjs/preparation/cookie-parser)

## JWT Verify

### lib - auth - jwt - jwt.strategy.ts

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.token;
        },
      ]), // 요청에서 JWT를 추출하는 방법을 제공
      ignoreExpiration: false, // 만료된 JWT 허용 여부
      secretOrKey: configService.get("JWT_SECRET"), // 비밀 키
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}
```

이제 guard에서 사용하고 jwt를 verify 하는 passport를 만듭니다.<br/>
requst를 받아 extract해주는 ExtractJwt는 여러 기능을 제공합니다.
|name|<center>description</center>|
|:--:|:--|
|fromHeader|string, 지정된 헤더에서 token을 가져옵니다.|
|fromBodyField|string, body에서 token을 가져옵니다.|
|fromUrlQueryParameter|string, query parameter에서 token을 가져옵니다.|
|fromAuthHeaderWithScheme|string, authorization header에서 scheme를 찾고 token을 가져옵니다.|
|fromExtractors|RequestFn[], request의 원하는 property에서 token을 가져옵니다.|
|fromAuthHeaderAsBearerToken|authorization header에서 Bearer token을 가져옵니다.|

우리는 cookie에 token이 있으니까 cookie를 extract 해줍니다.<br/>
ignoreExpiration(만료여부)은 일단 무시하고 secretOrKey에 sign을 했었던 값을 넣어줍니다.<br/>
validate에서 return 된 값은 request.user에 있습니다.

### lib - auth - jwt - jwt.guard.ts

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
```

guard를 만들어주고..

### lib - lib.module.ts

```typescript {16}
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService
      ): Promise<JwtModuleOptions> => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: "5m" },
      }),
    }),
    LoginModule,
    PassportModule,
  ],
  providers: [LocalStrategy, JwtSignService, JwtStrategy],
  exports: [JwtSignService],
})
export class LibModule {}
```

잊지말고 module의 provider에 넣어줍니다.

### cats.controller.ts

```typescript
@Post('many')
@UseGuards(JwtAuthGuard)
createMany(@Body() createCatDto: ArrayCreateCatDto): CatsDto[] {
  return [this.cats];
}
```

이제.. 로그인 했다 치고~ 우리 이전에 local guard에서 로그인하고 쿠키 넣어주는것 했으니까~<br/>
이번에 cats controller에 createMany에 guard를 적용해봅시다.<br/>
토큰이 제대로 되었다면 결과를 return하고 그렇지 않다면 Unauthorized 에러가 발생합니다!
