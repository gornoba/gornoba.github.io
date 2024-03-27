# Express-session

[NestJs Session](https://docs.nestjs.com/techniques/session)<br/>
Express-session 미들웨어를 사용하면 서버 측에서 세션을 생성, 관리할 수 있습니다. 이는 사용자별로 고유한 세션 ID를 발급하고, 이 ID를 클라이언트의 쿠키로 저장하여 추후 요청 시 이를 통해 사용자를 식별합니다.

## 주요 옵션

- `secret`: 세션 ID 쿠키를 서명하는 데 사용되는 비밀키입니다. 공격자가 쿠키를 위조하는 것을 방지하는 데 필요합니다.
- `saveUninitialized`: 초기화되지 않은 세션(세션에 아무런 데이터도 설정되지 않은 상태)을 세션 스토어에 저장할지 여부를 결정합니다. 일반적으로 로그인 세션 관리에 `false`로 설정됩니다.
- `resave`: 세션에 변경 사항이 없어도 세션을 다시 저장할지 여부를 결정합니다. 대부분의 경우 `false`로 설정하는 것이 좋습니다.
- `cookie`: 세션 쿠키 설정을 담당합니다. 여기에는 `maxAge`, `httpOnly`, `secure` 등의 쿠키 옵션이 포함됩니다.
  - `maxAge`: 쿠키의 생존 기간을 결정합니다. 기간이 지나면 쿠키가 만료됩니다.
  - `httpOnly`: JavaScript를 통한 클라이언트 측에서 쿠키에 접근하는 것을 방지합니다. 보안을 위해 `true`로 설정하는 것이 좋습니다.
  - `secure`: HTTPS를 통해서만 쿠키가 전송되도록 합니다. 배포 환경에서 `true`로 설정해야 합니다.

## 세션이 유지되기 위한 설정

1. **적절한 `secret` 값 사용:** 세션을 안전하게 유지하기 위해, 복잡하고 예측하기 어려운 `secret` 값을 설정해야 합니다.
2. **`saveUninitialized`와 `resave` 옵션 조정:** 불필요한 세션 데이터의 저장을 방지하고, 세션 스토어의 과부하를 줄이기 위해 이 두 옵션을 적절히 설정합니다.
3. **안전한 쿠키 옵션 사용:** `httpOnly`, `secure`, `sameSite` 등의 쿠키 옵션을 적절히 설정하여, 쿠키의 안전한 사용을 보장합니다.
4. **세션 타임아웃 관리:** `cookie.maxAge`를 설정하여, 사용하지 않는 세션이 너무 오래 유지되지 않도록 관리합니다.
5. **세션 스토어 선택:** 기본 메모리 스토어 대신, Redis나 MongoDB와 같은 영구 스토어를 사용하여 세션의 안정성을 높일 수 있습니다. 추후 설정 예정.
6. **세션 스토어 선택:** 세션 정보를 메모리에 저장하는 것은 개발 환경에서는 편리할 수 있으나, 실제 운영 환경에서는 메모리 누수의 위험이 있으며, 서버를 재시작할 때마다 세션 정보가 손실됩니다. 따라서, Redis, MongoDB, PostgreSQL과 같은 외부 데이터베이스를 세션 스토어로 사용하는 것이 권장됩니다. 이렇게 하면 세션 데이터의 지속성과 안정성을 높일 수 있습니다.

7. **클라이언트 측 쿠키 보안 강화:** `cookie.secure` 옵션을 `true`로 설정하여 HTTPS를 통해서만 쿠키가 전송되게 함으로써, 데이터 도청 위험을 줄일 수 있습니다. 또한, `cookie.httpOnly`를 `true`로 설정하여 클라이언트 측 스크립트가 쿠키에 접근하는 것을 방지하고, XSS 공격을 어렵게 만들 수 있습니다.

8. **세션 타임아웃 설정:** 사용자가 일정 시간 동안 활동이 없을 경우 자동으로 로그아웃되도록 세션 타임아웃을 설정합니다. 이는 `cookie.maxAge`를 통해 구현할 수 있으며, 세션 하이재킹 공격으로부터 사용자를 보호하는 데 도움이 됩니다.

9. **SameSite 쿠키 속성 사용:** `cookie.sameSite` 속성을 설정하여 CSRF 공격을 방지할 수 있습니다. `SameSite=Strict` 또는 `SameSite=Lax` 설정을 사용하여 쿠키가 같은 사이트의 요청에서만 전송되도록 제한할 수 있습니다.

이러한 설정과 조치들은 Express-session을 사용하여 웹 애플리케이션의 세션 관리를 효과적으로 하고, 보안을 강화하기 위한 기본적인 지침입니다. 항상 최신의 보안 관련 업데이트와 권장 사항을 확인하고, 애플리케이션의 특성에 맞게 세부 설정을 조정하는 것이 중요합니다.

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/cdb0ccf8cf75ab41ab24a237bf54c136c5fb3721)

1. express-session 설치

```sh
npm i express-session
npm i -D @types/express-session
```

2. main.ts에 코드 추가

```typescript
class Application {
  private sessionSecret: string;

  constructor() {
    !process.env.SESSION_SECRET &&
      this.logger.error('session secret 설정이 필요합니다!'); // 세션 비밀 설정이 없는 경우 에러 출력
  } {
    this.sessionSecret = process.env.SESSION_SECRET || 'secret';
  }

  session() {
    this.server.use(
      session({
        secret: Buffer.from(this.sessionSecret).toString('base64'), // 세션을 안전하게 유지하기 위한 비밀
        resave: false, // 세션에 변경사항이 없으면 다시 저장하지 않음
        saveUninitialized: false, // 초기화되지 않은 세션을 스토어에 저장하지 않음
        cookie: {
          secure: process.env.ENV === 'production', // https 프로토콜을 사용하는 경우 true
          httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 함
          maxAge: 1000 * 60 * 60, // 쿠키 유효 시간
          sameSite: 'none', // 쿠키 전송 위치 설정
        },
      }),
    );
  }

  async bootstrap() {
    this.policy();
    this.session();
    await this.server.listen(this.port);
    this.url = await this.server.getUrl();
  }
}
```
