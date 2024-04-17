# Composables

Vue 앱의 컨텍스트에서 컴포저블은 Vue 컴포지션 API를 활용하여 상태 저장 로직를 캡슐화하고 재사용하는 함수입니다.

## 예제

```js
// mouse.js
import { ref, onMounted, onUnmounted } from "vue";

// 관례상, 컴포저블 함수 이름은 "use"로 시작합니다.
export function useMouse() {
  // 컴포저블로 캡슐화된 내부에서 관리되는 상태
  const x = ref(0);
  const y = ref(0);

  // 컴포저블은 시간이 지남에 따라 관리되는 상태를 업데이트할 수 있습니다.
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // 컴포저블은 또한 이것을 사용하는 컴포넌트의 생명주기에 연결되어
  // 사이드 이펙트를 설정 및 해제할 수 있습니다.
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // 관리 상태를 반환 값으로 노출
  return { x, y };
}
```

```vue-html
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>마우스 위치: {{ x }}, {{ y }}</template>
```

## 비동기 예제

```js
// fetch.js
import { ref } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
```

```vue-html
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

### 반응형으로 변경

```js
import { ref, watchEffect, toValue } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    // reset state before fetching..
    data.value = null;
    error.value = null;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error };
}
```

toValue는 ref, getter를 정규화하는데 사용됩니다.
