# Vue.js 소개

Vue.js는 웹 인터페이스 개발을 위한 진보적인 JavaScript 프레임워크입니다. Evan You에 의해 만들어져 처음에는 간단한 뷰 레이어만 다루는 라이브러리로 시작했지만, 시간이 지나며 웹 애플리케이션을 구축하기 위한 강력한 도구로 성장했습니다. Vue의 핵심은 반응형 데이터 바인딩과 조합 가능한 컴포넌트 시스템을 제공하는 것입니다. 이를 통해 개발자는 유지보수가 쉽고 읽기 쉬운 코드로 인터랙티브하고 성능이 뛰어난 웹 애플리케이션을 빠르게 개발할 수 있습니다.

## Vue 3

Vue 3는 Vue의 최신 주요 버전으로, 여러 가지 중요한 개선 사항과 새로운 기능을 도입했습니다. 이 버전은 Composition API, 향상된 타입스크립트 지원, 프레임워크 자체의 성능 개선 등을 포함하고 있습니다. Composition API는 특히 주목할 만한데, 이는 컴포넌트의 로직을 더 유연하게 재사용하고 조직할 수 있게 해주어 대규모 애플리케이션의 복잡성을 관리하는 데 큰 도움을 줍니다.

## Script Setup

Vue 3에서 도입된 `script setup`은 Composition API를 사용할 때의 코드를 더 간결하고 선언적으로 만들어주는 문법적 설탕(syntactic sugar)입니다. 이는 컴포넌트의 `<script>` 태그 내에서 사용되며, 개발자가 더 적은 코드로 더 많은 작업을 할 수 있게 해줍니다. `script setup`을 사용하면 변수와 함수를 자동으로 템플릿에 노출시킬 수 있어, 별도의 `return` 문이 필요 없게 됩니다. 이는 코드의 양을 줄이고, 가독성을 높이며, 개발 생산성을 향상시키는 데 기여합니다.

```html
<script setup>
  import { ref, onMounted } from "vue";

  const count = ref(0);

  function increment() {
    count.value++;
  }

  onMounted(() => {
    console.log("Component is mounted!");
  });
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

위 예제에서 볼 수 있듯이, script setup은 Vue 컴포넌트 내에서 사용되는 Composition API의 기능들을 더욱 간편하게 사용할 수 있게 해줍니다. 이를 통해 개발자는 애플리케이션의 상태 관리, 생명주기 훅(lifecycle hooks), 그리고 다른 Composition API 기능들을 보다 쉽게 활용할 수 있습니다.<br/>

Vue 3와 script setup은 Vue를 사용하는 개발자들에게 더 나은 개발 경험과 함께, 더 크고 복잡한 애플리케이션을 효율적으로 구축할 수 있는 방법을 제공합니다.
