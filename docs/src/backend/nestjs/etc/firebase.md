# Firebase

firebase는 요금이 조금 많이 사악하긴 하지만 어느정도는 무료로 사용할 수 있습니다. ([요금](https://firebase.google.com/pricing?hl=ko))  
구현 이전에 기본적인 세팅이 필요한데 이것은 인터넷에 검색해보시면 잘 나와있으니 참고해서 준비해주시면 될 것 같습니다.

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/5041b7819e17e7206ba9fd6d99e80115f7e958b2)

### 설치

백엔드는 firebase-admin을 설치하여 사용할 수 있습니다.  
firebase는 단순히 백엔드에서만의 구현 뿐만 아니라 프론트엔드에서도 역할이 있습니다.  
백엔드는 관리의 영역에 한정해서 사용한다고 보면 될 것 같습니다.

```sh
npm i firebase-admin
```

### custom provider

자주 사용할 firebase에 대한 custom provider를 만들어 줍니다.  
private key의 경우 개행문자도 들어가 있어 base64로 인코딩해서 환경변수에 넣어줍니다.

```typescript
import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";

export const FirebaseConfigProvier = {
  provide: "FirebaseAdmin",
  useFactory: async (configService: ConfigService) => {
    const firebase = JSON.parse(configService.get("FIREBASE") || "{}");

    if (!firebase?.projectId) {
      return null;
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: firebase.projectId,
        clientEmail: firebase.clientEmail,
        privateKey: Buffer.from(firebase.privateKey, "base64").toString(),
      }),
    });
    return admin;
  },
  inject: [ConfigService],
};
```

이렇게 만들고 module의 provider에 넣어주면 `@Inect`를 사용한 의존성주입으로 원하는데서 간편히 사용할 수 있습니다.

## service

```typescript
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { FirebaseCreateAccountDto } from "../dto/firebase.dto";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

@Injectable()
export class FirebaseAccountService {
  constructor(@Inject("FirebaseAdmin") private firebase: admin.app.App) {}

  async getAccount(uid: string): Promise<UserRecord> {
    const user = await this.firebase.auth().getUser(uid);
    return user;
  }

  async createAccount(body: FirebaseCreateAccountDto): Promise<UserRecord> {
    const { phoneNumber, displayName } = body;

    const user = await this.firebase.auth().createUser({
      phoneNumber,
      displayName,
      disabled: false,
    });

    await this.firebase.auth().setCustomUserClaims(user.uid, {
      role: "user",
      mbti: "INTJ",
      purpose: "study",
    });

    return user;
  }

  async updateAccount(
    uid: string,
    body: FirebaseCreateAccountDto
  ): Promise<UserRecord> {
    const { phoneNumber, displayName, disabled } = body;

    const user = await this.getAccount(uid);

    if (!user) {
      throw new BadRequestException("User not found");
    }

    await this.firebase.auth().updateUser(uid, {
      phoneNumber,
      displayName,
      disabled: disabled || false,
    });

    await this.firebase.auth().setCustomUserClaims(user.uid, {
      ...user.customClaims,
      role: "user2",
      purpose: "study",
    });

    const updateUser = await this.getAccount(uid);

    return updateUser;
  }

  async deleteAccount(uid: string) {
    const user = await this.firebase.auth().deleteUser(uid);
    return user;
  }

  async changePassword(email: string) {
    const result = await this.firebase.auth().generatePasswordResetLink(email, {
      url: "http://localhost:3000", // redirect url
      handleCodeInApp: true,
    });

    return result.replace("lang=en", "lang=ko");
  }

  async verifyEmail(email: string) {
    const result = await this.firebase
      .auth()
      .generateEmailVerificationLink(email, {
        url: "http://localhost:3000", // redirect url
        handleCodeInApp: true,
      });

    return result.replace("lang=en", "lang=ko");
  }
}
```

email이 아니라 전화번호를 unique key로 사용하여 아이디를 만드는 방법을 사용하였습니다.  
만약 이메일을 통해 인증 및 비밀번호 변경을 하려면 이메일과 비밀번호 수집하는 것으로 코드를 수정해야 할 것입니다.

## refference

https://firebase.google.com/docs/auth/admin?hl=ko&authuser=0&_gl=1*hntgyj*_up*MQ..*_ga*NTI1ODI3MzI0LjE2NzgyNTMxMTM.*_ga_CW55HF8NVT*MTcxNjE3MDE2MS4zOS4wLjE3MTYxNzAxODEuNDAuMC4w
