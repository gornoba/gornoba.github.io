# Vue.js에서 Watchers 사용하기

Vue.js에서는 `watch` 함수를 사용하여 반응적 상태가 변경될 때마다 콜백을 트리거할 수 있습니다. 이는 주로 비동기 작업의 결과에 따라 다른 상태를 변경하거나 DOM을 조작해야 할 때 유용합니다.

## 기본 예제

다음 예제에서는 사용자의 질문에 따라 API로부터 답변을 가져오는 간단한 시나리오를 보여줍니다.

```vue
<script setup>
import { ref, watch } from "vue";

const question = ref("");
const answer = ref("Questions usually contain a question mark. ;-)");
const loading = ref(false);

watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes("?")) {
    loading.value = true;
    answer.value = "Thinking...";
    try {
      const res = await fetch("https://yesno.wtf/api");
      answer.value = (await res.json()).answer;
    } catch (error) {
      answer.value = "Error! Could not reach the API. " + error;
    } finally {
      loading.value = false;
    }
  }
});
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

## Watch 소스 유형

`watch`의 첫 번째 인자는 여러 종류의 반응형 "소스"가 될 수 있습니다:

```js
const x = ref(0);
const y = ref(0);

// 단일 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// 여러 소스 배열
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```

## Deep Watchers

`watch()`를 직접 반응형 객체에 적용하면, 모든 중첩된 변화에 대해 콜백이 트리거됩니다. 반면에, `watch()`를 getter와 함께 사용하면 반환된 객체가 달라졌을 때만 콜백이 실행됩니다.

```js
const obj = reactive({ count: 0 });

// deep 옵션 사용
watch(
  () => obj.count,
  (newValue, oldValue) => {},
  { deep: true }
);
```

## Eager Watchers와 Once Watchers

기본적으로 `watch`는 변경이 감지될 때까지 콜백을 실행하지 않습니다. `immediate: true` 옵션을 사용하면 관찰자를 즉시 실행할 수 있습니다.

```js
watch(source, (newValue, oldValue) => {}, { immediate: true });

// 변경 시 한 번만 실행
watch(source, (newValue, oldValue) => {}, { once: true });
```

## watchEffect 사용하기

`watchEffect`는 `watch`와 유사하지만, 의존성을 자동으로 추적하여 콜백 내에서 액세스된 모든 반응형 속성을 자동으로 감지합니다.

```js
const todoId = ref(1);

watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  data.value = await response.json();
});
```

`watchEffect`는 콜백 실행 중 동기적으로 의존성을 추적합니다. 이는 비동기 콜백을 사용할 때 주의해야할 필요가 있습니다. 비동기 콜백에서 `await` 사용 후에는 새로운 의존성이 추적되지 않습니다.

## watch vs. watchEffect

`watch`와 `watchEffect`는 모두 반응형 상태에 대한 부수 효과를 수행할 수 있게 해주지만, 두 기능의 주요 차이점은 의존성 추적 방식에 있습니다.

- `watch`는 명시적으로 지정된 소스만 추적하며, 콜백 내에서 접근된 속성은 추적하지 않습니다. 또한, 소스가 실제로 변경된 경우에만 콜백이 트리거됩니다.
- `watchEffect`는 콜백의 동기 실행 중 접근된 모든 반응형 속성을 자동으로 추적합니다. 이는 코드를 간결하게 만들지만, 의존성이 덜 명확하게 됩니다.

```js
// watch 사용 예
watch(x, (newX) => {
  console.log(`x is now ${newX}`);
});

// watchEffect 사용 예
watchEffect(() => {
  console.log(`x is now ${x.value}`);
});
```

## 콜백 플러시 타이밍

반응형 상태의 변화가 Vue 컴포넌트 업데이트와 사용자 생성 watcher 콜백을 트리거할 수 있습니다. 컴포넌트 업데이트와 유사하게, 사용자 생성 watcher 콜백은 중복 호출을 피하기 위해 배치 처리됩니다.

```js
// 플러시 옵션을 'post'로 설정하여 Vue 업데이트 후에 콜백 실행
watch(source, callback, {
  flush: "post",
});
```

## 동기 Watchers

동기적으로 트리거되는 watcher도 생성할 수 있습니다. 이는 Vue 관리 업데이트 전에 실행됩니다.

```js
// 동기적으로 실행되는 watcher
watch(source, callback, {
  flush: "sync",
});
```

## Watcher 중지하기

`setup()`이나 `<script setup>` 내에서 동기적으로 선언된 watcher는 소유 컴포넌트 인스턴스에 바인딩되며, 컴포넌트가 마운트 해제될 때 자동으로 중지됩니다. 대부분의 경우, 사용자가 직접 watcher를 중지할 필요는 없습니다.

```js
// watcher 중지 예
const unwatch = watchEffect(() => {});
unwatch(); // 필요할 때 watcher 중지
```

이 문서는 Vue.js에서 `watch`와 `watchEffect`의 사용법을 초보자가 이해하기 쉽도록 설명하고 있습니다. 각 기능의 용도와 차이점을 명확하게 이해할 수 있도록 도와주며, 실제 코드 예제를 통해 개념을 더욱 잘 이해할 수 있도록 구성되어 있습니다.
