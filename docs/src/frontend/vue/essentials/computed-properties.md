# Computed Properties

반응형 데이터를 포함하는 복잡한 논리의 경우, 계산된 속성을 사용하는 것이 좋습니다.

```vue
<script setup>
import { reactive, computed } from "vue";

const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
});

// 계산된 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? "Yes" : "No";
});
</script>

<template>
  <p>책을 가지고 있다:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

## caching

계산된 속성은 의존된 반응형을 기반으로 캐시되어 의존된 반응형 중 일부가 변경되었을 때 다시 실행 됩니다.

```typescript
const now = computed(() => Date.now());
```

Date.now() 자체는 반응형이 아니지만 위와 같이 computed로 감싸주면 리렌더링 할때마다 항상 새로운 값을 리턴 합니다.

## 수정 가능한 computed

computed는 기본적으로 getter 전용이나 아래와 같이 사용이 가능할 수도 있습니다.

```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // 참고: 분해 할당 문법을 사용함.
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});
</script>
```

## 주의

- getter 안에서는 다른 상태를 변형시키거나, 비동기 요청을 하거나, DOM을 변경하는 행위는 하면 안됩니다.
- compute의 값을 임의로 변경하면 안됩니다.
