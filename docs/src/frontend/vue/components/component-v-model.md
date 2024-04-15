# Vue.js에서 컴포넌트에 v-model 사용하기

Vue 3.4부터는 `defineModel()` 매크로를 사용하여 컴포넌트에서 양방향 데이터 바인딩을 구현하는 것이 권장됩니다. 이 방법은 v-model의 기능을 컴포넌트에 적용하는 더 간단한 방법을 제공합니다.

## 기본 사용법

### 자식 컴포넌트 설정

`defineModel()`을 사용하여 모델을 정의하고, 이 모델을 템플릿에서 사용할 수 있습니다.

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel();

function update() {
  model.value++;
}
</script>

<template>
  <div>parent bound v-model is: {{ model }}</div>
</template>
```

### 부모 컴포넌트에서 v-model 바인딩

부모 컴포넌트는 v-model을 사용하여 자식 컴포넌트와 데이터를 양방향으로 바인딩할 수 있습니다.

```template
<!-- Parent.vue -->
<Child v-model="countModel" />
```

`defineModel()`에 의해 반환된 값은 `ref`로, 다른 `ref`처럼 접근하고 수정할 수 있지만, 부모 값과의 양방향 바인딩 역할을 합니다.

- `.value`는 부모에 의해 바인딩된 값과 동기화됩니다.
- 자식에 의해 수정될 때, 부모 바인딩 값도 업데이트됩니다.

이를 통해 `ref`를 네이티브 입력 요소에 v-model로 바인딩하는 것도 간단하게 할 수 있습니다.

```vue
<script setup>
const model = defineModel();
</script>

<template>
  <input v-model="model" />
</template>
```

## v-model 매크로의 작동 원리

`defineModel`은 컴파일러에 의해 다음과 같이 확장됩니다:

- `modelValue`라는 이름의 prop.
- 로컬 ref의 값이 변경될 때 발생하는 `update:modelValue` 이벤트.

Vue 3.4 이전에는 다음과 같이 동일한 기능을 수행하도록 설정해야 했습니다.

```vue
<script setup>
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

이 방식은 더 많은 코드를 요구하지만, 내부에서 무슨 일이 일어나는지 이해하는 데 도움이 됩니다.

## v-model 인수

v-model은 컴포넌트에서도 인수를 받을 수 있습니다:

```template
<MyComponent v-model:title="bookTitle" />
```

자식 컴포넌트에서는 `defineModel()`의 첫 번째 인수로 문자열을 전달하여 해당 인수를 지원할 수 있습니다.

```vue
<!-- MyComponent.vue -->
<script setup>
const title = defineModel("title");
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

모델 이름 후에 prop 옵션도 전달할 수 있습니다:

```js
const title = defineModel("title", { required: true });
```

## v-model의 다중 바인딩

Vue에서는 v-model을 사용하여 하나의 컴포넌트 인스턴스에 여러 개의 v-model 바인딩을 생성할 수 있습니다. 이를 통해 각기 다른 prop에 대한 동기화가 필요 없이 다양한 데이터를 효율적으로 관리할 수 있습니다.

### 예시

```template
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

```vue
<script setup>
const firstName = defineModel("firstName");
const lastName = defineModel("lastName");
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

이 예시에서 `firstName`과 `lastName`는 각각 다른 모델로 정의되어 있으며, 각각의 입력 필드에 바인딩됩니다.

## v-model 수정자 처리

v-model은 `.trim`, `.number`, `.lazy` 같은 내장 수정자를 지원합니다. 커스텀 입력 컴포넌트에서 이러한 수정자를 지원하고 싶을 때, 커스텀 수정자를 생성할 수 있습니다.

### 예시: 대문자 수정자

```template
<MyComponent v-model.capitalize="myText" />
```

컴포넌트에서 v-model 수정자는 `defineModel()` 반환 값에서 구조 분해를 통해 접근할 수 있습니다.

```vue
<script setup>
const [model, modifiers] = defineModel();

console.log(modifiers); // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

값을 읽거나 쓸 때 수정자에 따라 조건부로 조정하려면 `defineModel()`에 `get`과 `set` 옵션을 전달할 수 있습니다. 이 옵션들은 모델 ref의 값을 가져오거나 설정할 때 변환된 값을 반환해야 합니다.

```vue
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  },
});
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

이 구성을 통해 입력 값에 대문자 수정자를 적용할 수 있으며, 입력 필드에 바로 반영됩니다.

## 인수를 사용한 v-model 수정자

다중 v-model 바인딩과 함께 다양한 수정자를 사용하는 또 다른 예제입니다:

```template
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

```vue
<script setup>
const [firstName, firstNameModifiers] = defineModel("firstName");
const [lastName, lastNameModifiers] = defineModel("lastName");

console.log(firstNameModifiers); // { capitalize: true }
console.log(lastNameModifiers); // { uppercase: true }
</script>
```
