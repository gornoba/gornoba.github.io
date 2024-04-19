# Dark Plugin

## API

https://quasar.dev/quasar-plugins/dark#dark-api

## Configuration

```js
return {
  framework: {
    config: {
      dark: /* look at QuasarConfOptions from the API card */
    }
  }
}
```

## options

- `isActive`: 다크모드인지 확인
- `mode`: 처음 다크모드 설정 `boolean | "auto"`
- `set`: 다크모드 변경 `boolean | "auto"`
- `toggle`: 다크모드 순차 변경
