# Quasar

## 소개

Quasar Framework은 Vue.js를 기반으로 하는 프론트엔드 개발 프레임워크입니다. 이는 웹사이트, 모바일 애플리케이션, 데스크톱 애플리케이션을 개발하는 데 사용할 수 있으며, 단일 코드베이스에서 다양한 플랫폼을 지원하는 것을 목표로 합니다. Quasar는 높은 수준의 구성 요소와 도구를 제공하여 개발자가 생산성을 높이고, 시간을 절약하며, 유지 보수가 용이한 애플리케이션을 만들 수 있도록 돕습니다.

## 장점

1. **다중 플랫폼 지원**: Quasar는 웹, 모바일 (iOS 및 Android를 위한 Cordova 또는 Capacitor를 사용), 데스크톱 (Electron을 사용) 애플리케이션을 한 번의 개발로 배포할 수 있게 해줍니다. 이는 개발 과정을 간소화하고, 시간 및 비용을 절약할 수 있게 합니다.

2. **Vue.js 기반**: Vue.js의 직관적이고 쉬운 학습 곡선을 그대로 활용할 수 있으며, Vue의 반응형 및 컴포넌트 기반 아키텍처를 통해 효율적인 UI를 구성할 수 있습니다.

3. **많은 내장 컴포넌트**: Quasar는 개발을 가속화하기 위해 많은 수의 준비된 컴포넌트와 유틸리티를 제공합니다. 이는 개발자가 일반적인 UI 요소를 빠르게 구현하고, 일관된 디자인 언어를 유지할 수 있도록 돕습니다.

4. **향상된 개발 경험**: Hot-reloading, Quasar CLI, Vuex 및 Vue Router와 같은 Vue 생태계와의 통합은 개발 과정을 더욱 원활하게 만듭니다.

5. **커뮤니티 및 문서**: Quasar는 활발한 커뮤니티와 잘 구성된 문서를 갖추고 있어 개발자가 시작하기에 좋습니다.

## 단점

1. **학습 곡선**: Vue.js에 익숙하지 않은 개발자에게는 Vue 자체와 Quasar의 추가적인 추상화와 컴포넌트가 처음에는 다소 부담스러울 수 있습니다.

2. **플랫폼 특화 기능 제한**: 모든 플랫폼에 걸쳐 동일한 코드베이스를 사용하다 보니, 각 플랫폼의 고유한 기능이나 최적화를 적용하기 어려울 수 있습니다.

3. **커뮤니티 규모**: Vue.js와 비교하면 Quasar의 커뮤니티는 상대적으로 작을 수 있으며, 특정 문제에 대한 지원이나 리소스를 찾는 데 어려움이 있을 수 있습니다.

4. **과다한 기능성**: Quasar가 제공하는 많은 컴포넌트와 기능은 때로는 "과하게" 느껴질 수 있으며, 모든 프로젝트에 필요하지 않은 기능이 포함되어 있을 수 있습니다.

## Quick Start

```sh
npm i -g @quasar/cli
npm init quasar
```

### Flavour

입맛에 맞게 아래에서 골라 쓰시면 됩니다.<br/>
저는 모바일 어플로 개발해보고 싶어서 quasar cli를 이용해볼 예정입니다.

[Quasar CLI](https://quasar.dev/start/quasar-cli)<br/>
[Quasar UMD - CDN install](https://quasar.dev/start/umd)<br/>
[Vue CLI Quasar Plugin](https://quasar.dev/start/vue-cli-plugin)<br/>
[Vite plugin for Quasar](https://quasar.dev/start/vite-plugin)<br/>

<table class="q-table">
  <thead>
    <tr>
      <th class="text-left">Feature</th>
      <th class="text-left">Quasar UMD</th>
      <th class="text-left">Quasar CLI (with Vite or Webpack)</th>
      <th class="text-left">Quasar Vite Plugin</th>
      <th class="text-left">Vue CLI Plugin</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>기존 프로젝트에 삽입하는 기능</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td><strong>Yes, if it is Vite app</strong></td>
      <td><strong>Yes, if it is Vue CLI app</strong></td>
    </tr>
    <tr>
      <td>퀘이사의 점진적 통합</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>공개 CDN의 Quasar 포함</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>SPA, PWA 구축</td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
    </tr>
    <tr>
      <td>SSR 구축(+ 선택적 PWA 클라이언트 인계)</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>Yes(*)</td>
    </tr>
    <tr>
      <td>Cordova 또는 Capacitor를 통해 모바일 앱 구축</td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
      <td>Yes(*)</td>
      <td>Yes(*)</td>
    </tr>
    <tr>
      <td>HMR로 모바일 앱을 휴대폰에서 직접 개발</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>Yes(*)</td>
      <td>Yes(*)</td>
    </tr>
    <tr>
      <td>Electron을 통해 데스크톱 앱 구축</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>Yes(*)</td>
      <td>Yes(*)</td>
    </tr>
    <tr>
      <td>브라우저 확장 빌드</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>Yes(*)</td>
      <td>Yes(*)</td>
    </tr>
    <tr>
      <td>Quasar <strong>App Extensions</strong></td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        <a href="/icongenie/introduction" class="doc-link">Icon Genie CLI</a> 통해 앱 아이콘 및 스플래시 화면을 쉽게 관리
      </td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Quasar 구성 요소에 대한 동적 RTL 지원</td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td><strong>Yes</strong></td>
    </tr>
    <tr>
      <td>
        Quasar를 통해 자동으로 자체 웹사이트/앱 RTL 상응 CSS 규칙 생성
      </td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td><strong>Yes</strong></td>
    </tr>
    <tr>
      <td>
        Quasar 사양을 사용하여 모든 것이 즉시 사용
      </td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>
      빌드 모드 간의 긴밀한 통합으로 Quasar의 모든 기능을 최대한 활용
      </td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        SPA, PWA, SSR, 모바일 앱, Electron 앱 및 브라우저 확장을 생성하는 하나의 코드베이스	
      </td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Tree Shaking</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
    </tr>
    <tr>
      <td>SFC (Single File Component - for Vue) support</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
    </tr>
    <tr>
      <td>동적 quasar.config 파일을 통한 고급 구성</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>단위 및 엔드투엔드 테스트 지원</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
    </tr>
    <tr>
      <td>TypeScript support</td>
      <td>-</td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
      <td><strong>Yes</strong></td>
    </tr>
    <tr>
      <td></td>
      <td>Quasar UMD</td>
      <td>Quasar CLI (with Vite or Webpack)</td>
      <td>Quasar Vite Plugin</td>
      <td>Vue CLI Plugin</td>
    </tr>
  </tbody>
</table>
