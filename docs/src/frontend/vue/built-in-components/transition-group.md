# Transition Group

`<TransitionGroup>`은 목록에서 렌더링되는 엘리먼트 또는 컴포넌트의 삽입, 제거 및 순서 변경을 애니메이션으로 만들기 위해 설계된 빌트인 컴포넌트입니다.

## `<Transition>`과의 차이점

- 기본적으로 래퍼 엘리먼트를 렌더링하지 않습니다. 그러나 tag prop으로 렌더링할 엘리먼트를 지정할 수 있습니다.
- 트랜지션 모드는 더 이상 상호 배타적인 엘리먼트를 사용하지 않기 때문에 사용할 수 없습니다.
- 내부 엘리먼트는 고유한 key 속성을 필수로 가져야 합니다.
- CSS 트랜지션 클래스는 그룹/컨테이너 자체가 아닌 목록의 개별 엘리먼트에 적용됩니다.

## 예시

```html
<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </TransitionGroup>
</template>
<style>
  .list-move, /* 움직이는 엘리먼트에 트랜지션 적용 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* 이동 애니메이션을 올바르게 계산할 수 있도록
   레이아웃 흐름에서 나머지 항목을 꺼내기. */
  .list-leave-active {
    position: absolute;
  }
</style>
```

```html
<template>
  <TransitionGroup
    tag="ul"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li
      v-for="(item, index) in computedList"
      :key="item.msg"
      :data-index="index"
    >
      {{ item.msg }}
    </li>
  </TransitionGroup>
</template>

<script>
  function onEnter(el, done) {
    gsap.to(el, {
      opacity: 1,
      height: "1.6em",
      delay: el.dataset.index * 0.15,
      onComplete: done,
    });
  }
</script>
```
