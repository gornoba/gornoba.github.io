# Custom Directives

## Directive Hook

```js
const myDirective = {
  // 바인딩된 엘리먼트의 속성 또는
  // 이벤트 리스너가 적용되기 전에 호출됩니다.
  created(el, binding, vnode, prevVnode) {
    // 인자에 대한 자세한 내용은 아래를 참고.
  },
  // 엘리먼트가 DOM에 삽입되기 직전에 호출됩니다.
  beforeMount(el, binding, vnode, prevVnode) {},
  // 바인딩된 엘리먼트의 부모 컴포넌트 및
  // 모든 자식 컴포넌트의 mounted 이후에 호출됩니다.
  mounted(el, binding, vnode, prevVnode) {},
  // 부모 컴포넌트의 updated 전에 호출됩니다.
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 바인딩된 엘리먼트의 부모 컴포넌트 및
  // 모든 자식 컴포넌트의 updated 이후에 호출됩니다.
  updated(el, binding, vnode, prevVnode) {},
  // 부모 컴포넌트의 beforeUnmount 이후에 호출됩니다.
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 부모 컴포넌트의 unmounted 전에 호출됩니다.
  unmounted(el, binding, vnode, prevVnode) {},
};
```

- `el`: 디렉티브가 바인딩된 엘리먼트입니다. DOM을 직접 조작하는 데 사용할 수 있습니다.
- `binding`: 다음 속성을 포함하는 객체입니다.
  - `value`: 디렉티브에 전달된 값입니다. 예를 들어 v-my-directive="1 + 1"에서 value는 2입니다.
  - `oldValue`: 이것은 beforeUpdate 및 updated에서만 사용할 수 있습니다. 값이 변경되었는지 여부에 관계없이 사용 가능합니다.
  - `arg`: 디렉티브에 전달된 인자(있는 경우). 예를 들어 v-my-directive:foo에서 인자는 "foo"입니다.
  - `modifiers`: 수식어가 있는 경우 수식어를 포함하는 객체입니다. 예를 들어 v-my-directive.foo.bar에서 수식어 객체는 { foo: true, bar: true }입니다.
  - `instance`: 디렉티브가 사용되는 컴포넌트의 인스턴스입니다.
  - `dir`: 디렉티브를 정의하는 객체
- `vnode`: 바인딩된 엘리먼트를 나타내는 기본 VNode.
- `prevVnode`: 이전 렌더링에서 바인딩된 엘리먼트를 나타내는 VNode입니다. beforeUpdate 및 updated 훅에서만 사용할 수 있습니다.

### 예제

```
<div v-example:foo.bar="baz">

{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz`의 값 */,
  oldValue: /* 업데이트 전 `baz`의 값 */
}

<div v-example:[arg]="value"></div> # 동적 directive
```

## 간단한 함수로 사용하기

커스텀 디렉티브가 `mounted` 및 `updated`에 대해 동일한 동작을 갖는 것이 일반적이며, 다른 훅은 필요하지 않습니다.

```js
<div v-color="color"></div>;
app.directive("color", (el, binding) => {
  // 이 함수가 호출되는 시점은 `mounted`와 `updated`입니다.
  el.style.color = binding.value;
});

<div v-demo="{ color: 'white', text: '안녕!' }"></div>;
app.directive("demo", (el, binding) => {
  console.log(binding.value.color); // => "white"
  console.log(binding.value.text); // => "안녕!"
});
```
