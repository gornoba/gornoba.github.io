# Cookies

## API

https://quasar.dev/quasar-plugins/cookies#cookies-api<br/>

## 설치

```js
// quasar.config file

return {
  framework: {
    plugins: ["Cookies"],
  },
};
```

## 사용

```typescript
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const value = $q.cookies.get('cookie_name')
}
```
