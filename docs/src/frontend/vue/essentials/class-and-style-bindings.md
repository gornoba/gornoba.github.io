# Class and Style Bindings

## HTML Class binding

### 객체로 바인딩

```vue
<script setup>
const isActive = ref(true);
const hasError = ref(false);
const error = ref(null);

const classObject = reactive({
  active: true,
  "text-danger": false,
});

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  "text-danger": error.value && error.value.type === "fatal",
}));
</script>
<template>
  <div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>
  <!-- <div class="static active"></div> -->

  <div :class="classObject"></div>
  <!-- <div class="active"></div> -->

  <div :class="classObject"></div>
</template>
```

### 배열로 바인딩

```vue
<script setup>
const activeClass = ref("active");
const errorClass = ref("text-danger");
</script>
<template>
  <div :class="[activeClass, errorClass]"></div>
  <!-- <div class="active text-danger"></div> -->

  <div :class="[isActive ? activeClass : '', errorClass]"></div>
  <div :class="[{ activeClass: isActive }, errorClass]"></div>
</template>
```

### 컴포넌트에서 사용하기

MyCompnent = `<p class="foo bar">안녕!</p>`

```vue
<script setup></script>
<template>
  <MyComponent class="baz boo" />
  <!-- <p class="foo bar baz boo">안녕!</p> -->

  <MyComponent :class="{ active: isActive }" />
  <!-- <p class="foo bar active">안녕!</p> -->
</template>
```

- 형제 엘리먼트가 있는 최상위 컴포넌트의 경우
  MyComponent = `<p :class="$attrs.class">안녕!</p>`

```vue
<script setup></script>
<template>
  <MyComponent class="baz" />
  <!-- <p class="baz">Hi!</p> -->
</template>
```

## 인라인 스타일 바인딩

### 객체로 바인딩

```vue
<script setup>
const activeColor = ref("red");
const fontSize = ref(30);

const styleObject = reactive({
  color: "red",
  fontSize: "13px",
});
</script>
<template>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

  <div :style="styleObject"></div>
</template>
```

### 배열로 바인딩

```typescript
<div :style="[baseStyles, overridingStyles]"></div>
```

### 다중값

```typescript
<div :style="{ display: ['flex', '-webkit-box', '-ms-flexbox'] }"></div>
```
