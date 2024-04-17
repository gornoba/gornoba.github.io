# Platform Detection

## API

https://quasar.dev/options/platform-detection#platform-api

## 사용

```vue-html
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.platform.is.mobile
}
```

### 외부에서 사용될 떄

```js
import { Platform } from "quasar";
```

### Platform.is의 return

```json
{
  "chrome": true,
  "desktop": true,
  "mac": true,
  "name": "chrome",
  "platform": "mac",
  "version": "70.0.3538.110",
  "versionNumber": 70,
  "webkit": true
}
```

## Api Property

<table class="q-table">
  <thead>
    <tr>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">재산</font></font
        >
      </th>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">유형</font></font
        >
      </th>
      <th class="text-left">
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">의미</font></font
        >
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="doc-token">Platform.is.mobile</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 모바일 장치에서 실행되고 있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.cordova</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Cordova 내에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.capacitor</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Capacitor 내에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.nativeMobile</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 기본 모바일 래퍼(
          </font></font
        ><em
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;"
              >Cordova/Capacitor</font
            ></font
          ></em
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">
            ) 내에서 실행되고 있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.nativeMobileWrapper</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">String</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >네이티브 모바일 래퍼의 이름(
          </font></font
        ><em
          ><code class="doc-token">'cordova'</code
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;">, </font></font
          ><code class="doc-token">'capacitor'</code
          ><font style="vertical-align: inherit;"
            ><font style="vertical-align: inherit;">또는</font></font
          ><code class="doc-token">undefined</code></em
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"> )</font></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.electron</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Electron 내에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.desktop</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 데스크톱 브라우저에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.bex</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 브라우저 확장에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.android</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >앱이 Android 기기에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.blackberry</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >앱이 Blackberry 기기에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.cros</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >Chrome OS 운영체제가 설치된 기기에서 앱이 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.ios</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >앱이 iOS 기기에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.ipad</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >앱이 iPad에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.iphone</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >해당 앱이 iPhone에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.ipod</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >앱이 iPod에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.kindle</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >앱이 Kindle 기기에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.linux</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >Linux 운영 체제가 설치된 장치에서 코드가 실행되고 있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.mac</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >MacOS 운영 체제가 설치된 장치에서 코드가 실행되고 있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.win</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >Windows 운영 체제가 설치된 장치에서 코드가 실행되고 있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.winphone</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Windows Phone 장치에서 실행되고 있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.playbook</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Blackberry Playbook 기기에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.silk</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Kindle Silk 브라우저를 실행하고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.chrome</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Google Chrome 브라우저 내에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.opera</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Opera 브라우저 내에서 실행되고 있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.safari</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >Apple Safari 브라우저 내에서 코드가 실행되고 있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.edge</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 Microsoft Edge 브라우저 내에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.is.ie</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >Microsoft Internet Explorer 브라우저 내에서 코드가 실행되고
            있습니까?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.has.touch</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >코드가 터치 가능 화면에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code class="doc-token">Platform.within.iframe</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">Boolean</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >앱이 IFRAME 내에서 실행되고 있나요?</font
          ></font
        >
      </td>
    </tr>
  </tbody>
</table>
