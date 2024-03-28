# Cookie

HTTP Cookie는 브라우저에 저장되는 작은 데이터 조각입니다.

## 필수패키지 설치

```sh
npm i cookie-parser
npm i -D @types/cookie-parser
```

## main.ts에 전역 미들웨어로 적용

```typescript
private nestLib() {
  this.server.use(cookieParser());
}
```

## 로그인 뒤 jwt 토큰 쿠키에 넣기

### login.controller.ts

```typescript
@UseGuards(LocalAuthGuard)
@Post()
async login(
  @Req() req: Request,
  @Res({ passthrough: true }) res: Response,
): Promise<string> {
  const user = req.user as UsersDto;
  const jwt = await this.jwtSignService.signJwt({ ...user });
  this.loginService.setCookie(res, jwt);
  return '로그인 성공';
}
```

### login.service.ts

```typescript
setCookie(res: Response, token: string) {
  res.cookie('token', token, {
    secure: process.env.ENV === 'production', // https 프로토콜을 사용하는 경우 true
    httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 함
    maxAge: 1000 * 60 * 60, // 쿠키 유효 시간
    sameSite: 'none', // 쿠키 전송 위치 설정
  });
  return res;
}
```

아래와 같이 쿠키가 token 키값으로 들어가 있는 것을 볼 수 있습니다.
![alt](/cookie-01.png)<br/>
![alt](/cookie-02.png)
