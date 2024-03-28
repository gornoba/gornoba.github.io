# Local Guard

이번에는 passport를 이용해서 로그인을 인증하는 과정을 해보도록 하겠습니다!<br/>
[NestJs Passport](https://docs.nestjs.com/recipes/passport)<br/>
[Github Link](https://github.com/gornoba/nestjs-describe/tree/4991e666ccda1f50d63641b444432dc847059c19)

## 기본개념

- **인증**: 사용자의 자격 증명(예: 사용자 이름/비밀번호, JWT)을 검증하는 과정입니다.
- **상태 관리**: 인증된 사용자에 대한 정보를 관리하고, 이를 통해 인증된 사용자의 요청을 처리합니다.
- **전략(Strategy)**: 다양한 인증 메커니즘을 구현하기 위한 방법입니다. Passport는 다양한 전략을 지원합니다.

## 필요한 패키지 설치

```sh
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
```

## passport를 이용한 Login 구현

lib - auth 폴더에 local 폴더를 만들고 두개의 파일을 만듭니다.<br/>

### local.strategy.ts

```typescript
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  // default passport name: 'local'
  constructor(private readonly loginService: LoginService) {
    super({
      usernameField: "username", // default: 'username'
      passwordField: "password", // default: 'password'
    });
  }

  validate(username: string, password: string) {
    return this.loginService.login(username, password);
  }
}
```

여기서 validate의 method에서 return된 값은 requst.user로 들어게 됩니다.

### local.guard.ts

```typescript
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
```

## login 만들기

### cli

```sh
nest g mo login
nest g s login --no-spec
nest g co login --no-spec
```

### login controller

```typescript
@ApiTags("login")
@Controller("login")
export class LoginController {
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Req() req: Request) {
    return req.user;
  }
}
```

### login service

```typescript
@Injectable()
export class LoginService {
  private readonly users: UsersDto[] = [
    {
      id: 1,
      username: "atreides",
      password: "12",
    },
    {
      id: 2,
      username: "harkonnen",
      password: "23",
    },
    {
      id: 3,
      username: "Fremen",
      password: "34",
    },
    {
      id: 4,
      username: "Corrino",
      password: "45",
    },
  ];

  login(username: string, password: string): UsersDto {
    const findUser = this.users.find((user) => user.username === username);

    if (!findUser) {
      throw new BadRequestException("사용자를 찾을 수 없습니다.");
    }

    if (findUser.password !== password) {
      throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");
    }

    return new UsersDto(findUser);
  }
}
```

Nestjs에서는 다양한 경우의 excpeiton class를 제공합니다.<br/>
[Exception Class](/backend/nestjs/exception-class)

### login dto

```typescript
export class UsersDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @Exclude() // 이 부분을 적용하여 제외시킵니다.
  @IsNotEmpty()
  @IsNumberString()
  password: string;

  constructor(partial: Partial<UsersDto>) {
    Object.assign(this, partial);
  }
}
```

### login module

```typescript
@Module({
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
```

## 실행

저는 vscode의 Thunder Client를 이용해서 `http:localhost:3000/api/login`으로 post 요청을 해보겠습니다.<br/>
그럼 아래와 같이 request에 비밀번호가 빠진 user 정보를 받게 됩니다.
![alt](/local-guard-01.png)<br/>
비밀번호가 틀렸다면 아래와 같이 에러가 발생됩니다.
![alt](/local-guard-02.png)<br/>
아이디가 없다면 아래와 같은 에러가 발생합니다.
![alt](/local-guard-03.png)

## 다음..

다음으로는 cookie에 jwt(Json Web Token)을 넣어보는 과정을 해보도록 하죠!<br/>
그래서 메뉴를 준비과정에 있던 [Cookie Parser](http://localhost:5173/backend/nestjs/cookie-parser)로 가봅시다~
