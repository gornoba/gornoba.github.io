# Conditional Rendering

## v-if

```typescript
<h1 v-if="awesome">Vue는 정말 멋지죠!</h1>
```

`asesome`이 truthy 값일 경우에만 렌더링

## v-else

```typescript
<button @click="awesome = !awesome">전환</button>

<h1 v-if="awesome">Vue는 정말 멋지죠!</h1>
<h1 v-else>아닌가요? 😢</h1>
```

v-if가 false면 v-else를 렌더링

## v-else-if

```typescript
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  A/B/C 아님
</div>
```

## template에서 v-if

둘 이상의 엘리먼트를 조건부 렌더링 하려면 이 경우 보이지 않는 래퍼 역할을 하는 `template> 엘리먼트에 v-if를 사용할 수 있습니다.

```typescript
<template v-if="ok">
  <h1>제목</h1>
  <p>단락 1</p>
  <p>단락 2</p>
</template>
```

## v-show

v-show는 css 속성 disploy를 변경하는 것입니다.

```typescript
<h1 v-show="ok">안녕!</h1>
```
