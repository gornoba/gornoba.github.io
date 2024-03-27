# Markdown 내에서 Vue 사용하기

VitePress에서는 각 마크다운 파일이 HTML로 컴파일된 후 Vue 단일 파일 컴포넌트(SFC)로 처리됩니다. 이는 마크다운 내에서 모든 Vue 기능을 사용할 수 있음을 의미하며, 동적 템플릿, Vue 컴포넌트 사용, `<script>` 태그를 추가하여 페이지 내에서 임의의 Vue 컴포넌트 로직을 사용할 수 있습니다.

Vue의 컴파일러를 이용하여 마크다운 콘텐츠의 순수 정적 파트를 자동으로 감지하고 최적화합니다. 정적 콘텐츠는 단일 플레이스홀더 노드로 최적화되며, 초기 방문의 페이지 JavaScript 페이로드에서 제거됩니다. 클라이언트 측 하이드레이션 동안에도 건너뜁니다. 즉, 주어진 페이지에서 동적인 부분에 대해서만 비용을 지불합니다.

## SSR 호환성

모든 Vue 사용은 SSR 호환성이 있어야 합니다. 자세한 내용과 일반적인 해결책은 SSR 호환성 문서를 참조하세요. [link](https://vitepress.dev/guide/ssr-compat)

## 템플릿

### 보간법 (Interpolation)

마크다운 파일은 먼저 HTML로 컴파일된 다음 Vite 프로세스 파이프라인에 Vue 컴포넌트로 전달됩니다. 이는 텍스트에서 Vue 스타일의 보간법을 사용할 수 있음을 의미합니다.

```markdown
{{ 1 + 1 }}
```

### 지시문 (Directives)

지시문도 작동합니다 (디자인에 의해, 마크다운에서도 원시 HTML이 유효함을 참고하세요):

```html
<span v-for="i in 3">{{ i }}</span>
```

### `<script>`와 `<style>`

마크다운 파일의 루트 레벨 `<script>` 및 `<style>` 태그는 Vue SFC에서와 같이 작동합니다, `<script setup>`, `<style module>` 등을 포함합니다. 여기서 주요 차이점은 모든 다른 루트 레벨 콘텐츠가 마크다운임이며, `<template>` 태그가 없다는 것입니다. 모든 태그는 프론트매터 이후에 배치되어야 합니다.

마크다운에서 `<style scoped>`를 사용하는 것을 피해야 합니다. `<style scoped>`를 사용하면 현재 페이지의 모든 요소에 특별한 속성을 추가해야 하며, 이는 페이지 크기를 상당히 증가시킵니다. 페이지에서 로컬 스코핑 스타일이 필요한 경우 `<style module>`을 사용하는 것이 좋습니다.

VitePress의 런타임 API에도 접근할 수 있습니다. 예를 들어, 현재 페이지의 메타데이터에 접근하기 위한 `useData` 헬퍼가 있습니다:

```html
<script setup>
  import { useData } from "vitepress";
  const { page } = useData();
</script>
<pre>{{ page }}</pre>
```

## 컴포넌트 사용

Markdown 파일에서 Vue 컴포넌트를 직접 가져와 사용할 수 있습니다.

## 마크다운에서 컴포넌트 가져오기 (Importing in Markdown)

특정 페이지에서만 몇 개의 컴포넌트가 사용될 경우, 해당 페이지에서 명시적으로 컴포넌트를 가져와 사용하는 것이 좋습니다. 이렇게 하면 해당 컴포넌트들이 적절히 코드 분할되어 관련 페이지가 표시될 때만 로드됩니다.

```markdown
<script setup>
import CustomComponent from '../components/CustomComponent.vue'
</script>

# 문서

이 문서에서는 .md 파일에서 사용자 정의 컴포넌트를 사용하는 방법을 보여줍니다.

<CustomComponent />
```

## 컴포넌트를 전역으로 등록하기 (Registering Components Globally)

대부분의 페이지에서 사용될 컴포넌트가 있는 경우, Vue 앱 인스턴스를 커스터마이징하여 전역으로 등록할 수 있습니다. 이 방법은 [기본 테마 확장](#) 섹션에서 예시를 찾아볼 수 있습니다.

**중요**: 사용자 정의 컴포넌트의 이름은 하이픈을 포함하거나 파스칼 케이스를 사용해야 합니다. 그렇지 않으면 인라인 요소로 취급되어 `<p>` 태그 안에 래핑되며, `<p>` 태그는 내부에 블록 요소를 포함할 수 없어 하이드레이션 불일치가 발생할 수 있습니다.

## 헤더에서 컴포넌트 사용하기 (Using Components In Headers)

헤더에서 Vue 컴포넌트를 사용할 수 있지만, 다음 두 가지 문법 사이의 차이에 주의하세요

| Markdown          | Output HTML                               | Parsed Header |
| :---------------- | ----------------------------------------- | ------------: |
| # text \<Tag/>    | `<h1>text <Tag/></h1>`                    |        `text` |
| # text \`\<Tag/>` | `<h1>text <code>&lt;Tag/&gt;</code></h1>` | `text <Tag/>` |

`<code>`로 감싼 HTML은 그대로 표시되며, 감싸지 않은 HTML만 Vue에 의해 처리됩니다.

## Vue 보간법 탈출하기 (Escaping)

Vue 보간법(`{{ }}`)을 탈출하려면, `<span>` 또는 기타 요소를 사용하고 `v-pre` 지시문을 추가합니다.

```markdown
이것은 <span v-pre>{{ 그대로 표시됩니다 }}</span>
```

또는, `v-pre` 커스텀 컨테이너를 사용하여 전체 문단을 탈출할 수 있습니다:

```markdown
::: v-pre
{{ 이것도 그대로 표시됩니다 }}
:::
```

## 코드 블록에서 Vue 스타일 보간 활성화하기 (Unescape in Code Blocks)

기본적으로 모든 펜스 코드 블록은 `v-pre`로 자동 감싸져 있어 내부에서 Vue 문법이 처리되지 않습니다. 펜스 내에서 Vue 스타일 보간을 활성화하려면, 언어에 `-vue` 접미사를 추가하세요 (예: `js-vue`):

````markdown
```js-vue
안녕하세요 {{ 1 + 1 }}
```
````

이 방법을 사용하면 일부 토큰이 구문 강조에서 제대로 처리되지 않을 수 있습니다. 그러나 동적 데이터를 코드 예시 내에서 시연하고 싶을 때 유용할 수 있습니다.

## CSS 전처리기 사용하기 (Using CSS Pre-processors)

VitePress는 `.scss`, `.sass`, `.less`, `.styl`, `.stylus` 파일에 대한 내장 지원을 제공합니다. 해당 전처리기 자체는 설치해야 하지만, Vite 특정 플러그인을 설치할 필요는 없습니다.

```bash
# .scss 및 .sass에 대해
npm install -D sass

# .less에 대해
npm install -D less

# .styl 및 .stylus에 대해
npm install -D stylus
```

그런 다음 마크다운과 테마 컴포넌트에서 다음과 같이 사용할 수 있습니다:

```vue
<style lang="scss">
.title {
  font-size: 20px;
}
</style>
```

## Teleports 사용하기

VitePress는 현재 `body`로만 teleport를 지원하는 SSG를 가지고 있습니다. 다른 타겟에 대해서는, 내장된 `<ClientOnly>` 컴포넌트 안에 래핑하거나 `postRender` 훅을 통해 최종 페이지 HTML의 올바른 위치에 teleport 마크업을 주입할 수 있습니다.

<button class="modal-button" @click="showModal = true">모달 보기</button>

<Teleport to="body">
  <Transition name="modal">
    <div v-show="showModal" class="modal-mask">
      <div class="modal-container">
        <p>모달 생성!</p>
        <div class="model-footer">
          <button class="modal-button" @click="showModal = false">
            Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</Teleport>

<script setup>
import { ref } from 'vue'
const showModal = ref(false)
console.log(showModal)
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vp-c-bg);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.model-footer {
  margin-top: 8px;
  text-align: right;
}

.modal-button {
  padding: 4px 8px;
  border-radius: 4px;
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.modal-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>

::: details

```vue
<script setup lang="ts">
import { ref } from "vue";
const showModal = ref(false);
</script>

<template>
  <button class="modal-button" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <Transition name="modal">
      <div v-show="showModal" class="modal-mask">
        <div class="modal-container">
          <p>Hello from the modal!</p>
          <div class="model-footer">
            <button class="modal-button" @click="showModal = false">
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vp-c-bg);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.model-footer {
  margin-top: 8px;
  text-align: right;
}

.modal-button {
  padding: 4px 8px;
  border-radius: 4px;
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.modal-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
```

:::

```vue
<template>
  <button @click="showModal = true">모달 보기</button>

  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <!-- 모달 컨텐츠 -->
      <button @click="showModal = false">닫기</button>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
const showModal = ref(false);
</script>

<style>
.modal {
  /* 모달 스타일 */
}
</style>
```

모달 예제는 사용자에게 모달을 보여주고 닫는 기본적인 방법을 제공합니다. `<Teleport>`는 모달과 같은 오버레이 컨텐츠를 `body` 태그로 이동시키는 데 유용하게 사용할 수 있습니다.

`<ClientOnly>`를 사용하여 클라이언트 사이드에서만 렌더링되어야 하는 컴포넌트를 래핑할 수 있습니다. 이는 서버 사이드 렌더링 중에는 포함되지 않고, 클라이언트에서만 활성화되기를 원하는 기능에 적합합니다.

VitePress는 마크다운에서 Vue 기능을 풍부하게 사용할 수 있게 하여, 동적인 웹 문서를 생성할 때 더 큰 유연성과 표현력을 제공합니다. Vue 컴포넌트를 마크다운에 직접 포함시키거나, Vue 인스턴스의 데이터와 메소드를 사용하여 인터랙티브한 문서를 만들 수 있습니다.
