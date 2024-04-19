# Transition

## Transition Component

애니메이션은 다음 중 하나의 조건에 충족하면 발생합니다:

- `v-if`를 통한 조건부 렌더링
- `v-show`를 통한 조건부 표시
- 스페셜 엘리먼트 `<component>`를 통해 전환되는 동적 컴포넌트
- key라는 특수한 속성 값 변경

```html
<template>
  <button @click="show = !show">토글</button>
  <Transition>
    <p v-if="show">안녕</p>
  </Transition>
</template>
<style>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
```

:::info
`<Transition>`은 슬롯 컨텐츠로 단일 엘리먼트 또는 컴포넌트만 지원합니다. 컨텐츠가 컴포넌트인 경우, 컴포넌트에는 단일 루트 엘리먼트만 있어야 합니다.
:::

## CSS 기반 트랜지션​

### 트랜지션 클래스

![alt](https://ko.vuejs.org/assets/transition-classes.w6XFrltA.png)

1. `v-enter-from`: 진입 시작 상태. 엘리먼트가 삽입되기 전에 추가되고, 엘리먼트가 삽입되고 1 프레임 후 제거됩니다.
2. `v-enter-active`: 진입 활성 상태. 모든 진입 상태에 적용됩니다. 엘리먼트가 삽입되기 전에 추가되고, 트랜지션/애니메이션이 완료되면 제거됩니다. 이 클래스는 진입 트랜지션에 대한 지속 시간, 딜레이 및 이징(easing) 곡선을 정의하는 데 사용할 수 있습니다.
3. `v-enter-to`: 진입 종료 상태. 엘리먼트가 삽입된 후 1 프레임 후 추가되고(동시에 v-enter-from이 제거됨), 트랜지션/애니메이션이 완료되면 제거됩니다.
4. `v-leave-from`: 진출 시작 상태. 진출 트랜지션이 트리거되면 즉시 추가되고 1 프레임 후 제거됩니다.
5. `v-leave-active`: 진출 활성 상태. 모든 진출 상태에 적용됩니다. 진출 트랜지션이 트리거되면 즉시 추가되고, 트랜지션/애니메이션이 완료되면 제거됩니다. 이 클래스는 진출 트랜지션에 대한 지속 시간, 딜레이 및 이징 곡선을 정의하는 데 사용할 수 있습니다.
6. `v-leave-to`: 진출 종료 상태. 진출 트랜지션이 트리거된 후 1 프레임이 추가되고(동시에 v-leave-from이 제거됨), 트랜지션/애니메이션이 완료되면 제거됩니다.

### 트랜지션 이름 지정하기

```html
<template>
  <Transition name="fade"> ... </Transition>
</template>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
```

### CSS 애니메이션

```html
<template>
  <Transition name="bounce">
    <p v-if="show" style="text-align: center;">
      안녕! 여기에 탄력적인 텍스트가 있어요!
    </p>
  </Transition>
</template>
<style>
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
```

### 커스텀 트랜지션 클래스

[Animate.css](https://animate.style/)

- enter-from-class
- enter-active-class
- enter-to-class
- leave-from-class
- leave-active-class
- leave-to-class

```html
<template>
  <!-- Animate.css가 페이지에 포함되어 있다고 가정합니다. -->
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-if="show">안녕</p>
  </Transition>
</template>
```

### 그외 attr

- `type`: `animation` 또는 `transition` 값을 전달하여 Vue에서 처리할 유형을 명시적으로 선억
- `duration`: 명시적 트랜지션 지속 시간(밀리초 단위)을 지정
- `css`: `false`로 하면 css 트랜지션을 건너뛰도록 할 수 있음
- `apper`: 초기 렌더링에도 트랜지션을 적용
- `mode`: `out-in`, `in-out`으로 진출 애니메이션이 완료된 이후에 엘리먼트가 삽입되게 가능

## hook

```html
<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <!-- ... -->
  </Transition>
</template>
<script setup>
  // 엘리먼트가 DOM에 삽입되기 전에 호출됩니다.
  // 이것을 사용하여 엘리먼트의 "enter-from" 상태를 설정합니다.
  function onBeforeEnter(el) {}

  // 엘리먼트가 삽입되고 1 프레임 후 호출됩니다.
  // 진입 애니메이션을 시작하는 데 사용합니다.
  function onEnter(el, done) {
    // CSS와 함께 사용되는 경우, 선택적으로
    // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
    done();
  }

  // 진입 트랜지션이 완료되면 호출됩니다.
  function onAfterEnter(el) {}

  // 진입 트랜지션 취소가 완료되기 전 호출됩니다.
  function onEnterCancelled(el) {}

  // 진출 훅 전에 호출됩니다.
  // 대부분의 경우 그냥 진출 훅을 사용해야 합니다.
  function onBeforeLeave(el) {}

  // 진출 트랜지션이 시작될 때 호출됩니다.
  // 진출 애니메이션을 시작하는 데 사용합니다.
  function onLeave(el, done) {
    // CSS와 함께 사용되는 경우, 선택적으로
    // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
    done();
  }

  // 진출 트랜지션이 완료되고,
  // 엘리먼트가 DOM에서 제거된 후 호출됩니다.
  function onAfterLeave(el) {}

  // v-show 트랜지션에서만 사용 가능합니다.
  function onLeaveCancelled(el) {}
</script>
```

## 컴포넌트 간 트랜지션

```html
<template>
  <Transition name="fade" mode="out-in">
    <component :is="activeComponent"></component>
  </Transition>
</template>
```

## key 속성을 사용한 트렌지션

```html
<script setup>
  import { ref } from "vue";
  const count = ref(0);

  setInterval(() => count.value++, 1000);
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```
