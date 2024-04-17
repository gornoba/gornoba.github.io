# Quasar Icon Sets

## 지원 아이콘

https://github.com/quasarframework/quasar/tree/dev/ui/icon-set

<p><a class="doc-link" href="https://fonts.google.com/icons?icon.set=Material+Icons" target="_blank" rel="noopener">Material Icons</a><br/> <a class="doc-link" href="https://fonts.google.com/icons?icon.set=Material+Symbols" target="_blank" rel="noopener">Material Symbols</a><br/> <a class="doc-link" href="https://fontawesome.com/icons" target="_blank" rel="noopener">Font Awesome</a><br/> <a class="doc-link" href="http://ionicons.com/" target="_blank" rel="noopener">Ionicons</a><br/> <a class="doc-link" href="https://materialdesignicons.com/" target="_blank" rel="noopener">MDI</a><br/> <a class="doc-link" href="https://akveo.github.io/eva-icons" target="_blank" rel="noopener">Eva Icons</a><br/> <a class="doc-link" href="https://themify.me/themify-icons" target="_blank" rel="noopener">Themify Icons</a><br/> <a class="doc-link" href="https://icons8.com/line-awesome" target="_blank" rel="noopener">Line Awesome</a><br/> <a class="doc-link" href="https://icons.getbootstrap.com/" target="_blank" rel="noopener">Bootstrap Icons</a><br/></p>

## 아이콘 라이브러리 설치

### 목록

https://github.com/quasarframework/quasar/tree/dev/extras

### quasar.config

```json
extras: [
  'material-icons',
  'mdi-v7',
  'ionicons-v4', // last webfont was available in v4.6.3
  'eva-icons',
  'fontawesome-v6',
  'themify',
  'line-awesome',
  'bootstrap-icons'
],
framework: {
  iconSet: 'fontawesome-v6'
}
```

extras에 포함되면 프로젝트 전체에서 사용되고 iconset은 기본적으로 사용할 아이콘을 설정.

## 동적변경

boot 파일 생성

```sh
quasar new boot quasar-icon-set [--format ts]
```

```js
import { Quasar } from "quasar";

// relative path to your node_modules/quasar/..
// change to YOUR path
const iconSetList = import.meta.glob(
  "../../node_modules/quasar/icon-set/*.mjs"
);
// or just a select few (example below with only mdi-v7 and fontawesome-v6):
// import.meta.glob('../../node_modules/quasar/icon-set/(mdi-v7|fontawesome-v6).mjs')

export default async () => {
  const iconSetName = "mdi-v7"; // ... some logic to determine it (use Cookies Plugin?)

  try {
    iconSetList[`../../node_modules/quasar/icon-set/${iconSetName}.mjs`]().then(
      (lang) => {
        Quasar.iconSet.set(setDefinition.default);
      }
    );
  } catch (err) {
    // Requested Quasar Icon Set does not exist,
    // let's not break the app, so catching error
  }
};
```
