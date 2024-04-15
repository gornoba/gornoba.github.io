# Vue.js에서 컴포넌트 기초

Vue.js에서 컴포넌트는 사용자 인터페이스를 독립적이고 재사용 가능한 부분으로 분리할 수 있게 해줍니다. 이는 애플리케이션을 중첩된 컴포넌트 트리로 구성하는 것과 유사합니다.

## 컴포넌트 정의하기

### 싱글 파일 컴포넌트 (SFC)

빌드 과정을 사용할 때, 각 Vue 컴포넌트는 일반적으로 `.vue` 확장자를 가진 별도의 파일로 정의됩니다. 이러한 파일은 싱글 파일 컴포넌트(SFC)로 알려져 있습니다.

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

### 일반 자바스크립트 객체로 컴포넌트 정의

빌드 단계 없이 Vue 컴포넌트를 정의할 때는 Vue의 특정 옵션이 포함된 일반 자바스크립트 객체를 사용할 수 있습니다.

```js
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    return { count };
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`,
};
```

## 컴포넌트 사용하기

자식 컴포넌트를 사용하려면, 부모 컴포넌트에서 해당 컴포넌트를 불러와야 합니다. 예를 들어 `ButtonCounter.vue` 파일 안에 카운터 컴포넌트를 배치했다면, 파일의 기본 내보내기로 노출됩니다.

```vue
<script setup>
import ButtonCounter from "./ButtonCounter.vue";
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

`<script setup>`을 사용하면, 가져온 컴포넌트는 템플릿에서 자동으로 사용 가능합니다.

### 전역 및 지역 컴포넌트 등록

컴포넌트를 전역적으로 등록하면 애플리케이션의 모든 컴포넌트에서 해당 컴포넌트를 가져오지 않고 사용할 수 있습니다. 전역 등록과 지역 등록의 장단점은 컴포넌트 등록 섹션에서 자세히 논의됩니다.

## Props 전달하기

블로그를 만든다고 가정할 때, 각 블로그 포스트를 나타내는 컴포넌트가 필요할 것입니다. 모든 블로그 포스트가 동일한 시각적 레이아웃을 공유하지만, 각기 다른 내용을 보여줘야 합니다. 이럴 때 props가 사용됩니다.

```html
<!-- BlogPost.vue -->
<script setup>
  defineProps(["title"]);
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

## 이벤트 수신하기

`<BlogPost>` 컴포넌트 개발 중 일부 기능은 부모에게 정보를 전달해야 할 수 있습니다. 예를 들어, 예를 들어 블로그 게시글의 텍스트 크기를 늘리는 접근성 기능을 추가할 수 있습니다.

### 이벤트 수신과 커스텀 이벤트 발송하기

부모 컴포넌트에서는 이러한 기능을 지원하기 위해 `postFontSize` ref를 추가할 수 있습니다.

```js
const postFontSize = ref(1);
```

이 postFontSize는 모든 블로그 게시글의 글꼴 크기를 제어하는 데 사용됩니다.

```html
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost v-for="post in posts" :key="post.id" :title="post.title" />
</div>
```

이제 `<BlogPost>` 컴포넌트의 템플릿에 버튼을 추가합시다.

```html
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

버튼 클릭 시 부모에게 텍스트 확대를 요청하는 이벤트를 발송합니다. 부모 컴포넌트는 @enlarge-text를 사용하여 이 이벤트를 수신하고 반응합니다.

```html
<BlogPost ... @enlarge-text="postFontSize += 0.1" />
```

defineEmits 매크로를 사용하여 발생될 이벤트를 선언할 수 있습니다:

```html
<!-- BlogPost.vue -->
<script setup>
  defineProps(["title"]);
  defineEmits(["enlarge-text"]);
</script>
```

이것은 컴포넌트가 발생시킬 모든 이벤트를 문서화하고 선택적으로 검증합니다. 또한, Vue는 자식 컴포넌트의 루트 요소에 네이티브 리스너로 암묵적으로 적용되는 것을 방지합니다.

## 슬롯을 사용한 콘텐츠 분배

컴포넌트에 콘텐츠를 전달하는 것은 HTML 요소와 유사합니다. 예를 들어, 다음과 같은 방법으로 컴포넌트에 콘텐츠를 전달할 수 있습니다:

```html
<AlertBox> Something bad happened. </AlertBox>
```

이는 다음과 같이 렌더링 될 수 있습니다:

```html
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>
```

## 동적 컴포넌트

동적으로 컴포넌트를 전환하는 것은 탭 인터페이스와 같은 상황에서 유용합니다. 이는 Vue의 `<component>` 요소와 is 특성을 사용하여 구현할 수 있습니다:

```html
<!-- 현재 탭이 변경될 때 컴포넌트가 변경됩니다 -->
<component :is="tabs[currentTab]"></component>
```

is로 전달된 값은 등록된 컴포넌트의 이름 문자열이거나 실제로 가져온 컴포넌트 객체일 수 있습니다.

## DOM 템플릿 파싱 주의사항

DOM에서 직접 Vue 템플릿을 작성하는 경우, 브라우저의 네이티브 HTML 파싱 동작으로 인해 몇 가지 주의사항이 발생합니다. 이러한 제한은 DOM에서 직접 템플릿을 작성할 때만 적용됩니다.<br/>
HTML 태그와 속성 이름은 대소문자를 구분하지 않음로, 돔에서 직접 작성하는 템플릿은 대소문자 구분 없이 파스칼케이스나 카멜케이스 이름을 모두 케밥케이스(하이픈으로 구분된 소문자)로 변환해 사용해야 합니다:

```js
// JavaScript에서 카멜케이스
const BlogPost = {
  props: ["postTitle"],
  emits: ["updatePost"],
  template: `
    <h3>{{ postTitle }}</h3>
  `,
};
```

```html
<!-- HTML에서 케밥케이스 -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

## 자체 닫는 태그 사용

이전 코드 샘플에서 컴포넌트에 자체 닫는 태그를 사용했습니다:

```html
<MyComponent />
```

Vue의 템플릿 파서는 /를 태그의 종료로 인식하므로, 모든 타입의 태그에 대해 이를 적용합니다. 그러나 DOM 템플릿에서는 명시적인 닫는 태그를 항상 포함해야 합니다:

```html
<my-component></my-component>
```

이는 HTML 사양에서 일부 특정 요소(예: `<input>`, `<img>`)만 닫는 태그 없이 사용할 수 있도록 허용하기 때문입니다. 그 외의 모든 요소는 닫는 태그를 생략하면 HTML 파서가 오프닝 태그를 종료하지 않은 것으로 간주합니다.

## 요소 배치 제한

일부 HTML 요소(예: `<ul>`, `<ol>`, `<table>`, `<select>`)는 특정 요소만 자식으로 포함할 수 있으며, `<li>`, `<tr>`, `<option>`과 같은 요소는 특정 부모 요소 내에서만 사용될 수 있습니다. 이로 인해 컴포넌트를 사용할 때 문제가 발생할 수 있습니다:

```html
<table>
  <blog-post-row></blog-post-row>
  <!-- 이 컴포넌트는 유효하지 않은 콘텐츠로 인식되어 제거될 수 있습니다 -->
</table>
```

이 문제를 해결하기 위해 is 속성을 사용할 수 있습니다:

```html
<table>
  <tr is="vue:blog-post-row"></tr>
  <!-- `vue:` 접두사를 사용하여 Vue 컴포넌트로 해석하게 합니다 -->
</table>
```

## 동적 컴포넌트와 `<KeepAlive>`

여러 컴포넌트 간에 동적으로 전환할 때` <component :is="...">`를 사용하면, 비활성 컴포넌트는 언마운트됩니다. `<KeepAlive>` 컴포넌트를 사용하여 비활성 컴포넌트를 "살아있게" 유지할 수 있습니다.

```html
<KeepAlive>
  <component :is="currentComponent"></component>
</KeepAlive>
```
