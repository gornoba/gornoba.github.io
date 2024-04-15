# Vue.js에서 컴포넌트 이벤트 다루기

Vue 컴포넌트는 다양한 이벤트를 발생시키고, 이를 수신하여 상호작용을 관리할 수 있습니다. 이 문서에서는 컴포넌트 이벤트의 기본적인 사용법을 설명합니다.

## 이벤트 발생과 수신

컴포넌트는 `$emit` 메소드를 사용하여 직접 템플릿 표현식 내에서 사용자 정의 이벤트를 발생시킬 수 있습니다.

```template
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

부모 컴포넌트는 `v-on`을 사용하여 이벤트를 수신할 수 있습니다.

```template
<MyComponent @some-event="callback" />
```

`.once` 수정자는 컴포넌트 이벤트 리스너에서도 지원됩니다.

```template
<MyComponent @some-event.once="callback" />
```

이벤트 이름은 camelCase로 발생시키고 kebab-case로 수신하는 것이 관례입니다.

## 이벤트 인수

특정 값을 이벤트와 함께 전달해야 할 때가 있습니다. 예를 들어, `<BlogPost>` 컴포넌트가 텍스트를 얼마나 확대할지를 결정할 수 있습니다. 이 경우 `$emit`에 추가 인수를 전달하여 값을 제공할 수 있습니다.

```template
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

부모에서 이벤트를 수신할 때는 인라인 화살표 함수를 사용하여 이벤트 인수에 접근할 수 있습니다.

```template
<MyButton @increase-by="(n) => count += n" />
```

또는 이벤트 핸들러가 메소드인 경우:

```template
<MyButton @increase-by="increaseCount" />
```

이 값은 해당 메소드의 첫 번째 매개변수로 전달됩니다.

```js
function increaseCount(n) {
  count.value += n;
}
```

`$emit()`에 이벤트 이름 이후로 전달된 모든 추가 인수는 리스너로 전달됩니다.

## 이벤트 선언

컴포넌트는 `defineEmits()` 매크로를 사용하여 발생시킬 이벤트를 명시적으로 선언할 수 있습니다.

```vue
<script setup>
defineEmits(["inFocus", "submit"]);
</script>
```

`<script setup>` 섹션에서 `$emit` 메소드를 직접 사용할 수는 없지만, `defineEmits()`는 동등한 기능을 제공하는 함수를 반환합니다.

```vue
<script setup>
const emit = defineEmits(["inFocus", "submit"]);

function buttonClick() {
  emit("submit");
}
</script>
```

명시적 `setup` 함수를 사용하는 경우 `emits` 옵션을 사용하고, `setup()` 컨텍스트에서 `emit` 함수를 사용합니다.

```js
export default {
  emits: ["inFocus", "submit"],
  setup(props, { emit }) {
    emit("submit");
  },
};
```

## 이벤트 유효성 검증

Vue 컴포넌트는 발생시킬 이벤트에 대해 유효성 검사를 추가하여 이벤트가 올바르게 발생하는지 확인할 수 있습니다. 이벤트 유효성 검증은 이벤트가 선언된 객체 구문을 사용하여 구현됩니다.

```vue
<script setup>
const emit = defineEmits({
  // 검증이 없는 클릭 이벤트
  click: null,

  // 제출 이벤트에 대한 검증
  submit: ({ email, password }) => {
    if (email && password) {
      return true;
    } else {
      console.warn("Invalid submit event payload!");
      return false;
    }
  },
});

function submitForm(email, password) {
  emit("submit", { email, password });
}
</script>
```

이 예시에서는 `submit` 이벤트가 유효한 `email`과 `password`를 받는지 확인합니다. 유효하지 않을 경우 콘솔에 경고 메시지를 출력하고 `false`를 반환하여 이벤트의 유효성을 검사합니다.

## 이벤트 타입 지정 및 자세한 검증

TypeScript를 사용하는 경우, `<script setup lang="ts">`를 통해 타입 지정된 이벤트를 선언할 수 있습니다.

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();
</script>
```

이 방법은 이벤트와 관련된 인수의 타입을 명확히 지정하여, 런타임 시 발생할 수 있는 타입 오류를 미연에 방지할 수 있습니다.

## 이벤트 발생 및 리스너 지정의 주요 팁

1. 컴포넌트에서 발생한 이벤트는 DOM 이벤트와 달리 버블링되지 않습니다. 직접적인 자식 컴포넌트에서만 이벤트를 수신할 수 있습니다.
2. 필요에 따라 전역 이벤트 버스나 상태 관리 솔루션을 사용하여 복잡한 컴포넌트 간 통신을 관리할 수 있습니다.
3. 이벤트를 명시적으로 선언하면 컴포넌트의 사용 방법을 더욱 명확하게 문서화할 수 있으며, Vue가 알려진 리스너를 속성에서 제외하여 DOM 이벤트와의 충돌 가능성을 줄일 수 있습니다.
