# Color Palette

## API

https://quasar.dev/style/color-palette#brand-api
![](2024-04-19-13-48-43.png)

## Color List

https://quasar.dev/style/color-palette#color-list<br/>
![](2024-04-19-13-50-32.png)<br/>
![](2024-04-19-13-50-41.png)<br/>
![](2024-04-19-13-51-00.png)

## Using Classes

text 적용시 `text-`, background 적용시 `bg-`로 합니다.

```js
<!-- changing text color -->
<p class="text-primary">....</p>

<!-- changing background color -->
<p class="bg-positive">...</p>
```

## Using Sass/SCSS Variables

```css
<!-- Notice lang="scss" -->
<style lang="scss">
div {
  color: $red-1;
  background-color: $grey-5;
}
</style>
```

## Adding Your Own Colors

```html
<template>
  <q-btn color="brand" ... />
</template>
<style>
  .text-brand {
    color: #a2aa33 !important;
  }
  .bg-brand {
    background: #a2aa33 !important;
  }
</style>
```

## Dynamic Theme Colors

### setCssVar

setCssVar를 이용하면 컴포넌트에서 주요 브랜드 색상을 변경할 수 있습니다.  
해당 클래스로 된 색상은 모두 변경됩니다.

<table class="q-table">
  <thead>
    <tr>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">매개변수</font></font
        >
      </th>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">유형</font></font
        >
      </th>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">필수의</font></font
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
      <td><code class="doc-token">colorName</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">string</font></font
        >
      </td>
      <td>
        <em
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;">예</font></font
          ></em
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"></font
        ><code class="doc-token">primary</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">, </font></font
        ><code class="doc-token">secondary</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">, </font></font
        ><code class="doc-token">accent</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">, </font></font
        ><code class="doc-token">dark</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">, </font></font
        ><code class="doc-token">positive</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">, </font></font
        ><code class="doc-token">negative</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">, </font
          ></font
        ><code class="doc-token">info</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">, </font></font
        ><code class="doc-token">warning</code>
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">colorValue</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">끈</font></font
        >
      </td>
      <td>
        <em
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;">예</font></font
          ></em
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >유효한 CSS 색상 값</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">element</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">요소</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">-</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">(기본값: </font></font
        ><code class="doc-token">document.body</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >) 사용자 정의 속성이 설정될 요소입니다.</font
          ></font
        >
      </td>
    </tr>
  </tbody>
</table>

```js
import { setCssVar } from "quasar";

setCssVar("light", "#DDD");
setCssVar("primary", "#33F");
setCssVar("primary", "#F33", document.getElementById("rebranded-section-id"));
```

## getCssVar

<table class="q-table"><thead><tr><th class="text-left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">매개변수</font></font></th><th class="text-left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">유형</font></font></th><th class="text-left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">필수의</font></font></th><th class="text-left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">설명</font></font></th></tr></thead><tbody><tr><td><code class="doc-token">colorName</code></td><td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">끈</font></font></td><td><em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">예</font></font></em></td><td><font style="vertical-align: inherit;"></font><code class="doc-token">primary</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">, </font></font><code class="doc-token">secondary</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">, </font></font><code class="doc-token">accent</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">, </font></font><code class="doc-token">dark</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">, </font></font><code class="doc-token">positive</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">, </font></font><code class="doc-token">negative</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">, </font><font style="vertical-align: inherit;">중 </font></font><code class="doc-token">info</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">하나</font></font><code class="doc-token">warning</code></td></tr><tr><td><code class="doc-token">element</code></td><td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">요소</font></font></td><td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">-</font></font></td><td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">(기본값: </font></font><code class="doc-token">document.body</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">) 사용자 정의 속성을 읽을 요소입니다.</font></font></td></tr></tbody></table>

```js
import { getCssVar } from "quasar";

getCssVar("primary"); // '#33F'
getCssVar("primary", document.getElementById("rebranded-section-id"));
```
