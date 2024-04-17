# Provide / Inject

![](https://vuejs.org/assets/provide-inject.C0gAIfVn.png)

그림에서 보는 것과 같이 드릴 뚫고 들어가는 것 처럼 주입하고 싶은 아래 자식컴포넌트에게 주입하는 것을 의미합니다.

## Provide

```vue-html
<script setup>
import { provide } from 'vue'

provide(/* 키 */ 'message', /* 값 */ '안녕!')
provide(/* 키 */ 'message', /* 값 */ readonly('안녕!'))
</script>
```

키는 `Symbol`이 될 수 있고 값의 경우 ref와 같은 반응형이 될 수 있습니다.

### 앱 수준의 provide

```vue-html
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 키 */ 'message', /* 값 */ '안녕!')
```

이렇게 하면 모든 컴포넌트에서 사용할 수 있습니다.

## Inject

```vue-html
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

만약 주입된 값이 ref라면 이 래핑은 그대로 유지됩니다.
