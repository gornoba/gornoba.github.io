# Dark Mode

## 기능

1. 페이지의 기본 어두운 배경을 설정합니다(CSS를 통해 쉽게 재정의할 수 있음)
2. 속성이 있는 모든 Quasar 구성 요소 dark는 자동으로 true로 설정됩니다.

## 사용방법

[Dark Plugin](/frontend/quasar/plugin/dark)

## 스타일

```css
.body--light {
  /* ... */
}

.body--dark {
  /* ... */
}
```

기본 dark mode 페이지 배경색을 재정의하려는 경우:

```css
body.body--dark {
  background: #000;
}
```
