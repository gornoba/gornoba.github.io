# Compression

응답 본문의 크기를 크게 줄여 웹 앱의 속도를 높일 수 있습니다.
프로덕션 환경에서 트래픽이 많은 웹 사이트 의 경우 일반적으로 역방향 프록시(예: Nginx)에서 애플리케이션 서버의 압축하는 것이 좋습니다.

## 설치 및 사용

### 설치

```sh
npm i --save compression
```

### main.ts

```typescript
import * as compression from "compression";
this.server.use(compression());
```
