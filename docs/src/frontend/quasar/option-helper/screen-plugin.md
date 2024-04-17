# Screen Plugin

Quasar Screen 플러그인을 사용하면 Javascript 코드를 처리할 때 동적이고 반응성이 뛰어난 UI를 가질 수 있습니다. 가능하다면 성능상의 이유로 [반응형 CSS 클래스](/frontend/quasar/style-identity/css-visibility#window)를 대신 사용하는 것이 좋습니다 .

## API

https://quasar.dev/options/screen-plugin#screen-api

## 활성화

```json
framework: {
  config: {
    screen: {
      bodyClasses: true // <<< add this
    }
  }
}
```

## 사용법

```vue-html
<script>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    const buttonColor = computed(() => {
      return $q.screen.lt.md
        ? 'primary'
        : 'secondary'
    })

    return { buttonColor }
  }
}
</script>
<html>
  <q-list :dense="$q.screen.lt.md">
    <q-item>
      <q-item-section>John Doe</q-item-section>
    </q-item>

    <q-item>
      <q-item-section>Jane Doe</q-item-section>
    </q-item>
  </q-list>
</html>
```

스크린의 $q.screen.size에 설정되어 있는 md(1024px ~ 1439.99px)의 최저 보다 낮아지면 색상을 변경합니다.

## css body class

`screen--[]`로 설정할 수 있음

```css
.my-div
  body.screen--xs &
    color: #000
  body.screen--sm &
    color: #fff
```

## Configuration

| Method              | 설명                                                       |
| :------------------ | :--------------------------------------------------------- |
| setSizes(Object)    | window breakpoints를 변경. css breakpoits는 변하지 않는다. |
| setDebounce(Number) | default가 100ms로 설정되어 있는데 이것을 바꾼다.           |

```vue-html
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 })
}
```
