# List Rendering

## v-for

```html
<div v-for="(item, index) in items" :key="item.id">
  <!-- 내용 -->
</div>

<template v-for="(todo, index) in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>

<span v-for="n in 10">{{ n }}</span>

<li v-for="(value, key, index) in myObject" :key="index">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

v-if가 v-for 보다 우선순위가 높음으로 동시에 쓰는 것을 권장하지 않습니다.
하지만 아래와 같은 방식으로 쓸 수 있습니다.

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">{{ todo.name }}</li>
</template>
```

## 배열감지

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()
  해당 메소드를 감지하여 반응형 업데이트 합니다.

## 배열교채

filter(), concat(), slice()는 원본 배열을 수정하지 않고 항상 새 배열을 반환함으로 for문의 경우 이전 배열을 새 배열로 교체해야 합니다.

```typescript
items.value = items.value.filter((item) => item.message.match(/Foo/));
```

## 필터링/정렬 결과 표시

### computed를 이용하여 배열을 반환

```vue
<script setup>
const numbers = ref([1, 2, 3, 4, 5]);

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0);
});
</script>
<template>
  <li v-for="n in evenNumbers">{{ n }}</li>
</template>
```

### 중첩된 v-for문의 경우

```vue
<script setup>
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
]);

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0);
}
</script>
<template>
  <ul v-for="numbers in sets">
    <li v-for="n in even(numbers)">{{ n }}</li>
  </ul>
</template>
```

:::warning
reverse()와 sort()의 경우 원본 배열을 수정함으로 computed를 이용할 때는 원본배열을 복사해서 return 해야 합니다.<br/>
`return [...numbers].reverse()`
:::
