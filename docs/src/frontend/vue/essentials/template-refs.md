# Vue.js에서 템플릿 Refs 사용하기

Vue의 선언적 렌더링 모델은 대부분의 직접적인 DOM 조작을 추상화하지만, 때때로 DOM 요소에 직접 접근할 필요가 있을 수 있습니다. 이를 위해 `ref` 특수 속성을 사용할 수 있습니다.

## 템플릿 Refs의 기본 사용법

`ref` 속성을 사용하면 컴포넌트가 마운트된 후 특정 DOM 요소나 자식 컴포넌트 인스턴스에 대한 직접적인 참조를 얻을 수 있습니다. 이는 컴포넌트 마운트 시 프로그래매틱으로 입력에 포커스를 맞추거나 요소에 제3자 라이브러리를 초기화할 때 유용합니다.

```vue
<script setup>
import { ref, onMounted } from "vue";

const input = ref(null);

onMounted(() => {
  input.value.focus();
});
</script>

<template>
  <input ref="input" />
</template>
```

`<script setup>`을 사용하지 않는 경우, setup()에서 ref를 반환해야 합니다.

```js
export default {
  setup() {
    const input = ref(null);
    return {
      input,
    };
  },
};
```

## v-for 내의 Refs

Vue 3.2.25 이상에서 `v-for` 내부에서 `ref`를 사용하면 해당 ref는 마운트 후 요소의 배열로 채워집니다.

```vue
<script setup>
import { ref, onMounted } from "vue";

const list = ref([
  /* ... */
]);
const itemRefs = ref([]);

onMounted(() => {
  console.log(itemRefs.value);
});
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

## 함수 Refs

`ref` 속성은 문자열 키 대신 함수로도 바인딩될 수 있으며, 컴포넌트 업데이트마다 호출되어 요소 참조를 저장하는 데 사용됩니다.

```template
<input :ref="(el) => { /* 여기에 el을 속성이나 ref로 할당 */ }">
```

## 컴포넌트에 대한 Ref

`ref`는 자식 컴포넌트에도 사용될 수 있습니다. 이 경우 참조는 컴포넌트 인스턴스가 됩니다.

```vue
<script setup>
import { ref, onMounted } from "vue";
import Child from "./Child.vue";

const child = ref(null);

onMounted(() => {
  // child.value는 <Child /> 인스턴스를 가집니다.
});
</script>

<template>
  <Child ref="child" />
</template>
```

자식 컴포넌트가 `<script setup>`을 사용하는 경우, 부모 컴포넌트가 자식의 내부에 접근하기 위해서는 자식 컴포넌트가 공개 인터페이스를 `defineExpose`를 사용하여 노출해야 합니다.

```vue
<script setup>
import { ref, defineExpose } from "vue";

const a = 1;
const b = ref(2);

defineExpose({
  a,
  b,
});
</script>
```
