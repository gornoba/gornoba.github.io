# Flex Grid

## Introduction to Flexbox

quasar는 [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)로 UI를 쉽게 만들 수 있는 css class를 제공합니다.

## 부모 요소

### 방향설정

- `row`
- `row inline`
- `column`
- `column inline`
- `row reverse`
- `column reverse`

### Wrap

default는 `wrap` 입니다.
![alt](https://cdn.quasar.dev/img/flexbox-wrap.svg)

- `wrap`
- `no-wrap`
- `reverse-wrap`

### 정렬

![alt](https://cdn.quasar.dev/img/flexbox-main-axis-align---2.svg)
<br/>
![alt](https://cdn.quasar.dev/img/flexbox-cross-axis-align.svg)
<br/>
![alt](https://cdn.quasar.dev/img/flexbox-content-align.svg)

## 자식요소

### size

기본적으로 12 포인트의 시스템을 이용하여 grid를 결정하게 됩니다.

- `col/row`: 가능한 사용가능한 공간을 모두 차지합니다.
- `*-auth`: 필요한 공간만 채웁니다.
- `*-grow`: 필요한 최소한의 공간을 채우도록 하며, 더 많은 공간을 사용할 수 있을 때 셀을 늘릴 수 있습니다.
- `*-shrink`: 필요한 공간까지만 채우고 공간이 충분하지 않으면 축소할 수 있도록 합니다.
- `offset`

### 정렬

![alt](https://cdn.quasar.dev/img/flexbox-self.svg)

- `self-start`
- `self-center`
- `self-baseline`
- `self-end`
- `self-stretch`

### 순서

- `order-first`
- `order-last`
- css: `style="order: 2"`

### link

[Grid Row](https://quasar.dev/layout/grid/row)<br/>
[Grid Column](https://quasar.dev/layout/grid/column)<br/>
[Grid Gutter](https://quasar.dev/layout/grid/gutter)<br/>
[Flexbox Pattern](https://quasar.dev/layout/grid/flexbox-patterns)

## 반응형

- `xs`: 0px
- `sm`: 600px
- `md`: 1024px
- `lg`: 1440px
- `xl`: 1920px

```html
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-4">col</div>
  <div class="col-xs-12 col-sm-6 col-md-4">col</div>
  <div class="col-xs-12 col-sm-6 col-md-4">col</div>
</div>
```
