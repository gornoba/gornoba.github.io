# Vue.js에서 컴포넌트 등록하기

Vue에서 컴포넌트를 등록하는 것은 Vue가 템플릿에서 컴포넌트를 사용할 때 해당 구현을 찾을 수 있도록 합니다. 컴포넌트를 등록하는 두 가지 방법이 있습니다: 전역 등록과 지역 등록.

## 전역 등록

전역 등록을 사용하면, Vue 애플리케이션 전체에서 컴포넌트를 사용할 수 있습니다.

```js
import { createApp } from "vue";
import MyComponent from "./MyComponent.vue";

const app = createApp({});
app.component("MyComponent", MyComponent);
```

```template
<!-- 앱 내의 모든 컴포넌트에서 이 컴포넌트를 사용할 수 있습니다 -->
<MyComponent />
```

전역 등록된 컴포넌트는 앱 내의 모든 컴포넌트 템플릿에서 사용할 수 있습니다. 이는 모든 하위 컴포넌트에서도 해당 컴포넌트를 사용할 수 있다는 것을 의미합니다.

## 지역 등록

전역 등록은 편리하지만, 몇 가지 단점이 있습니다:

- 전역 등록은 빌드 시스템이 사용하지 않는 컴포넌트를 제거하는 것을 방해합니다 ("트리 쉐이킹").
- 대규모 애플리케이션에서 의존성 관계를 덜 명확하게 만들어 유지보수에 어려움을 줄 수 있습니다.

지역 등록은 컴포넌트를 현재 컴포넌트에만 사용할 수 있도록 제한합니다.

```vue
<script setup>
import ComponentA from "./ComponentA.vue";
</script>

<template>
  <ComponentA />
</template>
```

`<script setup>` 사용 시에는 components 옵션을 사용해야 합니다:

```js
import ComponentA from "./ComponentA.vue";

export default {
  components: {
    ComponentA,
  },
};
```

지역 등록된 컴포넌트는 해당 컴포넌트에서만 사용 가능하며, 하위 컴포넌트에서는 사용할 수 없습니다.

## 컴포넌트 이름 규칙

가이드 전반에 걸쳐 컴포넌트를 등록할 때 PascalCase 이름을 사용합니다. 이는 다음과 같은 이유 때문입니다:

- PascalCase 이름은 유효한 JavaScript 식별자입니다.
- `<PascalCase />`는 이것이 Vue 컴포넌트임을 명확히 하며, 기본 HTML 요소와 구분됩니다.

SFC나 문자열 템플릿에서 권장되는 스타일입니다. 그러나 DOM 내 템플릿 파싱 주의사항에서 논의된 바와 같이, PascalCase 태그는 DOM 템플릿에서 사용할 수 없습니다.

Vue는 PascalCase로 등록된 컴포넌트를 kebab-case 태그로 참조할 수 있도록 지원합니다. 따라서 컴포넌트를 `<MyComponent>` 또는 `<my-component>` 형식으로 템플릿에서 사용할 수 있습니다.
