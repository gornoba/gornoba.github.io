# Quasar Language Packs

## language pack

https://github.com/quasarframework/quasar/tree/dev/ui/lang

## 언어팩 구성

default는 `en-US`

## quasar.config

```json
framework: {
  lang: 'ko-KR'
}
```

## 동적변경

boot 파일 생성

```sh
quasar new boot quasar-lang-pack [--format ts]
```

```js
import { Quasar } from "quasar";

// relative path to your node_modules/quasar/..
// change to YOUR path
const langList = import.meta.glob("../../node_modules/quasar/lang/*.mjs");
// or just a select few (example below with only DE and FR):
// import.meta.glob('../../node_modules/quasar/lang/(de|fr).mjs')

export default async () => {
  const langIso = "de"; // ... some logic to determine it (use Cookies Plugin?)

  try {
    langList[`../../node_modules/quasar/lang/${langIso}.mjs`]().then((lang) => {
      Quasar.lang.set(lang.default);
    });
  } catch (err) {
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
};
```

quasar.config에 등록

```json
boot: [
  'quasar-lang-pack'
]
```
