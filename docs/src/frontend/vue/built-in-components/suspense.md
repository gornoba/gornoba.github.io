# Suspense

## Suspense가 기다리는 두가지 유형의 비동기 의존성

1. `<script setup>`의 경우 최상위에 `await` 표현식이 있으면 자동으로 비동기 의존성 가짐

   ```html
   <script setup>
     const res = await fetch(...)
     const posts = await res.json()
   </script>

   <template> {{ posts }} </template>
   ```

2. 비동기 컴포넌트

## 사용

```html
<Suspense>
  <!-- 컴포넌트와 중첩된 비동기 의존성 -->
  <Dashboard />

  <!-- #fallback 슬롯을 통한 로딩 상태 -->
  <template #fallback> 로딩중... </template>
</Suspense>
```

```html
<Suspense>
  <component :is="DynamicAsyncOuter">
    <Suspense suspensible>
      <component :is="DynamicAsyncInner" />
    </Suspense>
  </component>
</Suspense>
```

`suspensible`가 true면 부모를 따라가고 false면 자체적으로 움직입니다.
