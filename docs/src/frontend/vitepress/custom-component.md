# Custom Component

## 필요성

글을 작성하다 보면 vitepress내의 링크를 새창을 띄우고 싶어졌습니다.  
a 태그를 만들어 넣으면 되는데 매번 하기가 번거로워서 재활용이 가능한 컴포넌트를 만들어 보기로 했습니다.

## 폴더구조

```
project/
├── docs/
│ ├── .vitepress/
│ │ ├── components/
│ │ │ └─ LinkToTab.vue
│ │ │
│ │ ├── theme/
│ │ │ └─ index.ts
```

## 컴포넌트 만들기

```vue
<script setup lang="ts">
defineProps({
  href: String,
  text: String,
});
</script>

<template>
  <p style="margin: -16px 0 !important;">
    <slot name="header"></slot>
    <a :href="href" target="_blank">{{ text }}</a>
    <slot></slot>
  </p>
</template>
```

props로 링크와 text를 전달해준다.

## theme 등록

```typescript
import DefaultTheme from "vitepress/theme";
import LinkToTab from "../components/LinkToTab.vue";

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component("LinkNewTab", LinkToTab);
  },
};
```

위와 같이 컴포넌트를 등록해준다.

## 사용

```md
<LinkToTab href="link주소" text="a태그 안에 들어갈 말">
  <template #header>
    a테그 이전에 들어갈 문구
  </template>
  <template #default>
    a태그 이후에 들어갈 문구
  </template>
</LinkToTab>
```

위와 같이 사용하면 되는데 default tmplate는 생략하고 문구만 사용해도 된다.
