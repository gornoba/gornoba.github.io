# 반응형 기초

## ref

ref의 값을 변경하면 자동으로 감지하고 DOM을 업데이트 합니다. 렌더링 과정에서 모든 ref를 **추적**하며 재랜더링을 **트리거** 합니다.  
script에서는 `.value`를 쓰지만 template에서는 변수 그대로를 씁니다.

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

## DOM 업데이트 타이밍

DOM은 자동으로 업데이트 되지만 동기적으로 적용되지 않아 `nextTick()`을 사용할 필요가 있습니다.

```typescript
import { nextTick } from "vue";

async function increment() {
  count.value++;
  await nextTick();
  // 이제 DOM이 업데이트되었습니다.
}
```

## reactive

객체 자체를 반응형으로 만듭니다.

### 제한사항

- 객체, 배열등과 같은 collection 유형에만 작동
- 다른 값으로 대체하면 반응성 연결이 끊어짐
- 분해 할당되면 반응성 연결이 끊어짐
