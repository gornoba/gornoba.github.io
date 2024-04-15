# Vue.js에서 폼 입력 바인딩 다루기

프런트엔드에서 폼을 다룰 때, JavaScript 상태와 폼 입력 요소의 상태를 동기화할 필요가 종종 있습니다. 수동으로 값 바인딩과 변경 이벤트 리스너를 설정하는 것은 번거로울 수 있습니다.

## 기본 폼 입력 바인딩

### 텍스트 입력

Vue에서는 `v-model` 지시자를 사용하여 입력과 모델 데이터를 쉽게 양방향 바인딩할 수 있습니다.

```html
<!-- 기본적인 텍스트 입력 바인딩 -->
<input v-model="text" placeholder="edit me" />
<p>Message is: {{ message }}</p>
```

`v-model`은 `<input>`, `<textarea>`, `<select>` 요소에 사용될 수 있으며, 사용하는 DOM 요소에 따라 적절한 속성과 이벤트를 자동으로 적용합니다.

- `<input>`과 `<textarea>`는 `value` 속성과 `input` 이벤트를 사용합니다.
- `<input type="checkbox">`와 `<input type="radio">`는 `checked` 속성과 `change` 이벤트를 사용합니다.
- `<select>`는 `value` 속성과 `change` 이벤트를 사용합니다.

### 체크박스

단일 체크박스는 boolean 값을 사용하여 바인딩할 수 있습니다.

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

여러 체크박스를 동일한 배열에 바인딩할 수도 있습니다.

```html
<div>Checked names: {{ checkedNames }}</div>
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

### 라디오 버튼

```html
<div>Picked: {{ picked }}</div>
<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>
<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

### 선택 입력 (Select)

단일 선택과 다중 선택이 가능합니다.

```html
<!-- 단일 선택 -->
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<!-- 다중 선택 -->
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

## 값 바인딩의 고급 사용

`v-model`은 정적 문자열이나 boolean 값 외에도 동적 속성을 바인딩하는 데 사용할 수 있습니다.

```html
<!-- 라디오 버튼의 동적 값 바인딩 -->
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

### 값 바인딩 수정자

- `.lazy`: 변경 이벤트 후에 동기화
- `.number`: 입력을 숫자로 자동 변환
- `.trim`: 입력에서 공백 자동 제거

```html
<input v-model.lazy="msg" />
<input v-model.number="age" />
<input v-model.trim="msg" />
```

## 컴포넌트와 v-model

HTML의 기본 입력 타입이 항상 여러분의 요구를 충족시키지 못할 때가 있습니다. 다행히 Vue 컴포넌트를 사용하면 완전히 맞춤화된 동작을 가진 재사용 가능한 입력 요소를 만들 수 있으며, 이러한 입력 요소는 `v-model`과 함께 작동합니다.

### v-model과 컴포넌트 사용

컴포넌트에서 `v-model`을 사용하려면, `value` prop과 `input` 이벤트를 컴포넌트 내에서 명시적으로 다루어야 합니다.

```vue
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>
```

위 코드는 Vue 컴포넌트에서 `v-model`을 구현하는 기본 패턴입니다. 사용자가 입력을 변경할 때, 입력 요소는 `input` 이벤트를 발생시키고, 이는 `update:modelValue` 이벤트를 발생시켜 부모 컴포넌트의 상태를 업데이트합니다.

### v-model 변형 사용하기

`.lazy`, `.number`, `.trim`과 같은 v-model 변형은 컴포넌트에서도 사용할 수 있습니다. 이를 위해서는 컴포넌트가 이 변형을 수용할 수 있도록 내부 로직을 조정해야 합니다.

예를 들어, `.number` 변형을 사용하면, 컴포넌트는 입력 값을 숫자로 변환해야 합니다.

```vue
<template></template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', Number($event.target.value))"
  />
</template>
```

이러한 방법으로, 컴포넌트는 Vue의 기본 입력 타입을 넘어서서 더욱 다양하고 풍부한 사용자 인터랙션을 제공할 수 있습니다.

## 결론

`v-model`은 Vue.js에서 데이터의 양방향 바인딩을 단순화하고 강력하게 만드는 중요한 도구입니다. 폼 입력에서 컴포넌트까지, `v-model`은 개발자가 효과적으로 사용자 입력과 상태를 연결하도록 돕습니다. 초보자는 이러한 패턴을 이해하고 활용함으로써 더욱 동적이고 반응적인 웹 애플리케이션을 구축할 수 있습니다.
