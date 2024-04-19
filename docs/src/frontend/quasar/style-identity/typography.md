# Typography

## Headings Classes

https://quasar.dev/style/typography#headings<br/>
<br/>
text-h1<br/>
text-h2<br/>
text-h3<br/>
text-h4<br/>
text-h5<br/>
text-h6<br/>
text-subtitle1<br/>
text-subtitle2<br/>
text-body1<br/>
text-body2<br/>
text-caption<br/>
text-overline<br/>

## Font Weights Classes

https://quasar.dev/style/typography#font-weights<br/>
<br/>
text-weight-thin<br/>
text-weight-light<br/>
text-weight-regular<br/>
text-weight-medium<br/>
text-weight-bold<br/>
text-weight-bolder<br/>

## CSS Helper Classes

<table class="q-table">
  <thead>
    <tr>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">클래스 이름</font></font
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
      <td><code class="doc-token">text-right</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트를 오른쪽으로 정렬</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-left</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트를 왼쪽으로 정렬</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-center</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트를 가운데로 정렬</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-justify</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트가 정렬됩니다.</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-bold</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트는 굵게 표시됩니다.</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-italic</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트는 이탤릭체로 표시됩니다.</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-no-wrap</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >줄바꿈할 수 없는 텍스트(적용
          </font></font
        ><code class="doc-token">white-space: nowrap</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">)</font></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-strike</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">적용</font></font
        ><code class="doc-token">text-decoration: line-through</code>
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-uppercase</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트를 대문자로 변환</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-lowercase</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트를 소문자로 변환</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">text-capitalize</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >텍스트의 첫 글자를 대문자로 표시</font
          ></font
        >
      </td>
    </tr>
  </tbody>
</table>

## 기본글꼴

default는 Roboto이며 100, 300, 400, 500, 700, 900 등 6가지 글꼴 두께를 사용할 수 있습니다.

### quasar.config

```js
extras: ["roboto-font"];
```

## custom 글꼴 추가

1. 새 웹폰트 `[customfont].woff`(또는 어떤 확장명이든 상관없이 woff모든 브라우저에서 호환성을 위해 권장됨)를 원하는 디렉토리에 복사하세요. 예시) `../src/css/fonts/[customfont.woff]`
2. 글꼴을 선언하십시오 `./src/css/app.{css|sass|scss|styl}`(또는 적합하다고 판단되는 모든 위치에서 웹 글꼴 파일의 상대 경로를 올바르게 업데이트하십시오).

```css
@font-face {
  font-family: customfont;
  src: url(./fonts/customfont.woff);
}

// declare a class which applies it
.my-font {
  font-family: "customfont";
}
```
