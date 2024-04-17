# Plugin

## 소개

```js
import { createApp } from "vue";

const app = createApp({});

app.use(myPlugin, {
  /* 선택적인 옵션 */
});
```

```js
const myPlugin = {
  install(app, options) {
    // 앱 환경설정
  },
};
```

1. app.component() 및 app.directive()를 사용하여 하나 이상의 전역 컴포넌트 또는 커스텀 디렉티브를 등록합니다.

2. app.provide()를 호출하여 앱 전체에 리소스를 주입 가능하게 만듭니다.

3. 일부 전역 인스턴스 속성 또는 메서드를 app.config.globalProperties에 첨부하여 추가합니다.

4. 위 목록의 몇 가지를 조합해 무언가를 수행해야 하는 라이브러리(예: vue-router).
