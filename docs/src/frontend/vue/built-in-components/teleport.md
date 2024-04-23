# Teleport

`<Teleport>`는 컴포넌트 템플릿의 일부를 해당 컴포넌트의 DOM 계층 외부의 DOM 노드로 "이동"할 수 있게 해주는 빌트인 컴포넌트입니다.

## 사용법

```html
<script setup>
  import { ref } from "vue";

  const open = ref(false);
</script>

<template>
  <button @click="open = true">모달 열기</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>짜자잔~ 모달입니다!</p>
      <button @click="open = false">닫기</button>
    </div>
  </Teleport>
</template>

<style scoped>
  .modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
  }
</style>
```

- Props 및 Emit 사용 가능
- `:disabled`를 사용하여 비활성화 가능
- 동일한 대상에 여러개가 사용되면 사용한 순서대로 위치됨
