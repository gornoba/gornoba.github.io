# Fallthrough Attributes in Vue.js

Vue 컴포넌트에서는 명시적으로 선언되지 않은 속성이나 이벤트 리스너를 "fallthrough attributes"로 처리합니다. 이러한 속성들은 컴포넌트의 루트 요소에 자동으로 추가됩니다.

## 속성 상속

Fallthrough 속성은 컴포넌트로 전달되지만, 컴포넌트의 props나 emits에 명시적으로 선언되지 않은 속성 또는 이벤트 리스너입니다. 일반적으로 `class`, `style`, `id` 속성이 이에 해당합니다.

### 기본 동작

컴포넌트가 단일 루트 요소를 렌더링하는 경우, fallthrough 속성은 자동으로 루트 요소의 속성으로 추가됩니다.

```template
<!-- <MyButton> 컴포넌트의 템플릿 -->
<button>click me</button>

<!-- 부모에서 사용하는 경우 -->
<MyButton class="large" />
```

결과적으로 렌더링된 DOM은 다음과 같습니다:

```html
<button class="large">click me</button>
```

여기서 `<MyButton>`은 `class`를 수용할 prop으로 선언하지 않았기 때문에, `class`는 fallthrough 속성으로 처리되어 자동적으로 루트 요소에 추가됩니다.

### `class`와 `style`의 병합

자식 컴포넌트의 루트 요소가 이미 `class`나 `style` 속성을 가지고 있는 경우, 부모로부터 상속받은 값과 병합됩니다.

```template
<!-- <MyButton>의 변경된 템플릿 -->
<button class="btn">click me</button>

<!-- 최종 렌더링된 DOM -->
<button class="btn large">click me</button>
```

## v-on 이벤트 리스너 상속

v-on 이벤트 리스너도 동일한 규칙을 따릅니다:

```template
<MyButton @click="onClick" />
```

클릭 리스너는 `<MyButton>`의 루트 요소인 기본 `<button>` 요소에 추가됩니다. 버튼이 클릭되면, 부모 컴포넌트의 `onClick` 메서드가 트리거됩니다.

## 중첩된 컴포넌트 상속

루트 노드로 다른 컴포넌트를 렌더링하는 경우, 예를 들어 `<MyButton>`이 `<BaseButton>`을 루트로 사용하는 경우:

```template
<!-- <MyButton/>의 템플릿 -->
<BaseButton />
```

`<MyButton>`에 의해 받은 fallthrough 속성은 자동으로 `<BaseButton>`으로 전달됩니다.

## 속성 상속 비활성화

컴포넌트에서 자동 속성 상속을 원하지 않는 경우, 컴포넌트 옵션에서 `inheritAttrs: false`를 설정할 수 있습니다.

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>
```

이 설정은 루트 노드 이외의 다른 요소에 속성을 적용해야 할 때 유용합니다. `inheritAttrs: false` 설정을 사용하면 fallthrough 속성을 수동으로 관리할 수 있습니다.

```template
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

이러한 설정을 통해 루트 요소가 아닌 내부 요소에 fallthrough 속성을 명시적으로 적용할 수 있습니다. 이 방법은 특히 외부 `<div>` 요소를 스타일링 목적으로 사용하고 싶을 때 유용합니다.

## 다중 루트 노드에서의 속성 상속

단일 루트 노드가 있는 컴포넌트와 달리, 다중 루트 노드를 가진 컴포넌트는 자동적으로 속성을 상속받지 않습니다. `$attrs`가 명시적으로 바인딩되지 않으면 런타임 경고가 발생합니다.

```template
<CustomLayout id="custom-layout" @click="changeValue" />
```

예를 들어, `<CustomLayout>`이 다음과 같은 다중 루트 템플릿을 가지고 있다면:

```template
<header>...</header>
<main>...</main>
<footer>...</footer>
```

`$attrs`가 명시적으로 바인딩되지 않으면 경고가 발생합니다. 경고를 방지하기 위해 `$attrs`를 명시적으로 바인딩할 수 있습니다:

```template
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## JavaScript에서 Fallthrough 속성 접근

필요한 경우, `<script setup>`을 사용하여 컴포넌트의 fallthrough 속성에 접근할 수 있습니다:

```vue
<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>
```

`<script setup>`을 사용하지 않는 경우, `setup()` 컨텍스트의 `attrs` 속성을 통해 fallthrough 속성에 접근할 수 있습니다:

```js
export default {
  setup(props, ctx) {
    // fallthrough 속성은 ctx.attrs로 제공됩니다
    console.log(ctx.attrs);
  },
};
```

`attrs` 객체는 최신 fallthrough 속성을 항상 반영하지만, 반응성이 없습니다(성능 이유로). 속성의 변경을 감시하기 위해 watcher를 사용할 수 없습니다. 반응성이 필요한 경우, prop을 사용해야 합니다. 또는 `onUpdated()`를 사용하여 각 업데이트 시 최신 `attrs`를 사용하여 사이드 이펙트를 수행할 수 있습니다.
