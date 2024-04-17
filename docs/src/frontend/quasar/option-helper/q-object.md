# $q Obejct

<table class="q-table">
  <thead>
    <tr>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">소품 이름</font></font
        >
      </th>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">유형</font></font
        >
      </th>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">설명</font></font
        >
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="doc-token">$q.version</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">String</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">퀘이사 버전.</font></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">$q.platform</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Object</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Quasar에서 </font></font
        ><a href="/frontend/quasar/option-helper/platform-detection" class="doc-link"
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;">Platform을</font></font
          ></a
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">
            가져오는 것과 동일한 개체입니다 .</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">$q.screen</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Object</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"></font
        ><a href="/frontend/quasar/option-helper/screen-plugin" class="doc-link"
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;">Screen Plugin</font></font
          ></a
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">
            에서 제공하는 개체입니다 </font
          ><font style="vertical-align: inherit;">.</font></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">$q.lang</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Object</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >레이블 등을 포함하는 Quasar 언어 팩 관리(
          </font></font
        ><a
          class="doc-link"
          href="https://github.com/quasarframework/quasar/tree/dev/ui/lang"
          target="_blank"
          rel="noopener"
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;"
              >lang 파일 중 하나)</font
            ></font
          ></a
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >). Quasar 구성 요소용으로 설계되었지만 앱 구성 요소에서도 사용할 수
            있습니다. 추가 정보:
          </font></font
        ><a href="/frontend/quasar/option-helper/language-packs" class="doc-link"
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;">Quasar 언어 팩</font></font
          ></a
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"> .</font></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">$q.iconSet</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Object</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><a
            class="doc-link"
            href="https://github.com/quasarframework/quasar/tree/dev/ui/icon-set"
            target="_blank"
            rel="noopener"
            ><font style="vertical-align: inherit;"
              >퀘이사 아이콘 세트 관리( 아이콘 세트 파일</font
            ></a
          ><font style="vertical-align: inherit;"> 중 하나 )</font></font
        ><a
          class="doc-link"
          href="https://github.com/quasarframework/quasar/tree/dev/ui/icon-set"
          target="_blank"
          rel="noopener"
          ><font style="vertical-align: inherit;"></font
          ></a
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >). Quasar 구성 요소용으로 설계되었지만 앱 구성 요소에서도 사용할 수
            있습니다. 추가 정보:
          </font></font
        ><a href="/frontend/quasar/option-helper/icon-sets" class="doc-link"
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;"
              >퀘이사 아이콘 세트</font
            ></font
          ></a
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"> .</font></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">$q.cordova</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Object</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >Cordova 전역 개체에 대한 참조입니다. Cordova 앱에서 실행되는
            경우에만 사용할 수 있습니다.</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">$q.capacitor</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Object</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >Capacitor 전역 개체에 대한 참조입니다. Capacitor 앱에서 실행하는
            경우에만 사용할 수 있습니다.</font
          ></font
        >
      </td>
    </tr>
  </tbody>
</table>

## 사용법

```vue-html
<template>
  <div>
    <div v-if="$q.platform.is.ios">
      Gets rendered only on iOS platform.
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

console.log($q.platform.is.ios)

// showing an example on a method, but
// can be any part of Vue script
function show () {
  // prints out Quasar version
  console.log($q.version)
}
</script>
```

### vue 파일 외부

```js
import { Quasar, Platform } from "quasar";

console.log(Quasar.version);
console.log(Platform.is.ios);
```
