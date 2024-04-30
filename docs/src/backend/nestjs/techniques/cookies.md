# Cookies

쿠키는 이전에 JWT 토큰을 Cookie에 넣을때 한번 해봤습니다.  
이번에는 Cookie의 보안을 조금이라도 강화하기 위하여 서명과 암호화를 추가해보겠습니다.

## 설치

```sh
npm i cookie-parser crypto-js
npm i -D @types/cookie-parser @types/crypto-js
```

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/d9df24c8bc819b6f7f21678ee730286f45fd99ec)

### main.ts

cookieParser middleware에 서명을 추가해줍니다.

```typescript
cookieParser(this.cookieSign);
```

### 암호화 & 복호화

iv는 무작위로 생성하여 encrypt된 value와 함께 return 합니다.  
복호화시 iv와 encvrypt된 value를 나누어 복호화된 값을 return 합니다.

```typescript
cookieEncrypt(value: string) {
  const secretKey = CryptoJS.SHA256(
    this.configService.get('COOKIE_SECRET'),
  ).toString();
  const iv = CryptoJS.lib.WordArray.random(128 / 8);

  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(value),
    secretKey,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );

  return iv.toString(CryptoJS.enc.Hex) + encrypted.toString();
}

cookieDecrypt(cookieValue: string) {
  const ivHex = cookieValue.slice(0, 32);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encryptedData = cookieValue.slice(32);
  const secretKey = CryptoJS.SHA256(
    this.configService.get('COOKIE_SECRET'),
  ).toString();

  const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
```

### cookie

쿠키를 넣을 때 signed를 true로 만들어 줍니다.  
cookie를 request에서 받아올 때 cookies가 아니라 signedCookies로 받아옵니다.  
원하는 key가 없다면 error를 발생시키고 값을 복호화해서 return 합니다.

```typescript
setSignedCookie(res: Response, key: string, value: string) {
  res.cookie(key, this.cookieEncrypt(value), {
    secure: process.env.ENV === 'production', // https 프로토콜을 사용하는 경우 true
    httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 함
    maxAge: 1000 * 60 * 60, // 쿠키 유효 시간
    signed: true,
  });
}

getCookie(req: Request) {
  const signedCookies = req.signedCookies;
  if (!signedCookies?.test) {
    throw new NotFoundException('쿠키가 없습니다.');
  }

  return this.cookieDecrypt(req.signedCookies.test);
}
```

## 결과

위와 같은 코드라면 cookie가 클라이언트에게 노출되어 있는 값이긴 하지만 보안을 조금 더 높일 수 있을 것입니다.
