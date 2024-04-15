# Slots in Vue.js

Vue 컴포넌트는 자바스크립트 값과는 달리 템플릿 콘텐츠를 자식 컴포넌트로 전달하고, 그 컴포넌트 내에서 이를 렌더링하게 할 수 있는 기능, 즉 슬롯을 제공합니다.

## 슬롯의 기본 사용

예를 들어, `<FancyButton>` 컴포넌트가 다음과 같이 사용될 수 있습니다:

```template
<FancyButton>
  Click me! <!-- 슬롯 콘텐츠 -->
</FancyButton>
```

`<FancyButton>`의 템플릿은 다음과 같습니다:

```template
<button class="fancy-btn">
  <slot></slot> <!-- 슬롯 아웃렛 -->
</button>
```

렌더링된 최종 DOM은 다음과 같습니다:

```html
<button class="fancy-btn">Click me!</button>
```

이 예에서 `<FancyButton>`은 외부 `<button>`을 렌더링하고 (그리고 그 멋진 스타일링을 제공하면서), 내부 콘텐츠는 부모 컴포넌트에서 제공됩니다.

## 렌더 스코프

슬롯 콘텐츠는 부모 컴포넌트의 데이터 스코프에 접근할 수 있습니다. 예를 들어:

```template
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

여기서 두 `{{ message }}` 인터폴레이션은 같은 내용을 렌더링합니다.

슬롯 콘텐츠는 자식 컴포넌트의 데이터에 접근할 수 없습니다. Vue 템플릿의 표현식은 정의된 스코프에서만 접근할 수 있으며, 이는 자바스크립트의 렉시컬 스코핑과 일관됩니다.

## 폴백 콘텐츠

슬롯에 대해 폴백(기본) 콘텐츠를 지정하는 것이 유용할 때가 있습니다. 예를 들어, `<SubmitButton>` 컴포넌트에서:

```template
<button type="submit">
  <slot></slot>
</button>
```

부모가 슬롯 콘텐츠를 제공하지 않았다면 "Submit" 텍스트를 렌더링하고 싶을 수 있습니다. "Submit"을 폴백 콘텐츠로 만들기 위해 `<slot>` 태그 사이에 배치할 수 있습니다:

```template
<button type="submit">
  <slot>
    Submit <!-- 폴백 콘텐츠 -->
  </slot>
</button>
```

이제 `<SubmitButton`>을 부모 컴포넌트에서 사용하고 슬롯 콘텐츠를 제공하지 않는 경우:

```template
<SubmitButton />
```

폴백 콘텐츠 "Submit"이 렌더링됩니다:

```html
<button type="submit">Submit</button>
```

콘텐츠를 제공하는 경우:

```template
<SubmitButton>Save</SubmitButton>
```

제공된 콘텐츠가 대신 렌더링 됩니다:

```html
<button type="submit">Save</button>
```

## 명명된 슬롯(Named Slots)

단일 컴포넌트에서 여러 슬롯 아웃렛을 가질 필요가 있을 때가 있습니다. 예를 들어, 다음 템플릿을 가진 `<BaseLayout>` 컴포넌트를 고려해 보세요:

```template
<div class="container">
  <header>
    <!-- 헤더 콘텐츠가 필요합니다 -->
  </header>
  <main>
    <!-- 메인 콘텐츠가 필요합니다 -->
  </main>
  <footer>
    <!-- 푸터 콘텐츠가 필요합니다 -->
  </footer>
</div>
```

이 경우, `<slot>` 요소는 고유 ID를 할당하기 위한 `name` 특수 속성을 사용할 수 있습니다:

```template
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

`<slot>` 요소에 이름이 없으면 자동으로 "default" 이름이 됩니다.

`<BaseLayout>`을 사용하는 부모 컴포넌트에서는 다른 슬롯 아웃렛을 대상으로 여러 슬롯 콘텐츠 조각을 전달할 수 있는 방법이 필요합니다. 이것이 명명된 슬롯의 사용처입니다.

명명된 슬롯을 전달하려면, v-slot 디렉티브를 사용하는 `<template>` 요소를 사용해야 하며, v-slot에 슬롯의 이름을 인수로 전달합니다:

```template
<BaseLayout>
  <template v-slot:header>
    <!-- 헤더 슬롯 콘텐츠 -->
  </template>
</BaseLayout>
```

v-slot은 #로 축약될 수 있으므로, `<template v-slot:header>`는 `<template #header>`로 간단히 줄일 수 있습니다. 이는 "자식 컴포넌트의 'header' 슬롯에서 이 템플릿 조각을 렌더링하라"라고 생각할 수 있습니다.

모든 세 슬롯을 위해 콘텐츠를 전달하는 코드는 축약 구문을 사용하여 다음과 같이 됩니다:

```template
<BaseLayout>
  <template #header>
    <h1>여기에 페이지 타이틀이 있을 수 있습니다</h1>
  </template>

  <template #default>
    <p>메인 콘텐츠를 위한 단락입니다.</p>
    <p>그리고 또 하나입니다.</p>
  </template>

  <template #footer>
    <p>여기에 연락처 정보가 있습니다</p>
  </template>
</BaseLayout>
```

이제 `<template>` 요소 내의 모든 것은 해당 슬롯에 전달됩니다. 최종 렌더링된 HTML은 다음과 같을 것입니다:

```html
<div class="container">
  <header>
    <h1>여기에 페이지 타이틀이 있을 수 있습니다</h1>
  </header>
  <main>
    <p>메인 콘텐츠를 위한 단락입니다.</p>
    <p>그리고 또 하나입니다.</p>
  </main>
  <footer>
    <p>여기에 연락처 정보가 있습니다</p>
  </footer>
</div>
```

자바스크립트 함수로 비유하면, 여러 슬롯 프래그먼트를 다른 장소에서 렌더링할 수 있도록 패스하는 것을 다루고 있습니다:

```js
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`,
});

// <BaseLayout>는 서로 다른 장소에서 이들을 렌더링합니다
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`;
}
```

## 조건부 슬롯

슬롯이 존재하는지 여부에 따라 무언가를 렌더링하고 싶을 때가 있습니다.

$slots 속성과 v-if를 조합하여 이를 실현할 수 있습니다.

아래 예시에서는 헤더/푸터가 존재할 때 추가 스타일링을 제공하고자 할 때 래핑하는 Card 컴포넌트를 정의합니다:

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

## 동적 슬롯 이름

v-slot에도 동적 지시문 인수가 작동하여 동적 슬롯 이름을 정의할 수 있습니다:

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- shorthand -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

동적 지시문 인수의 표현식은 동적 지시문 인수의 구문 제약을 따릅니다.

## 범위가 지정된 슬롯(Scoped Slots)

슬롯 콘텐츠는 부모 스코프의 데이터에 접근할 수 있지만, 슬롯의 콘텐츠가 자식 컴포넌트의 데이터를 사용할 수 있게 하려면 자식이 렌더링할 때 데이터를 슬롯에 전달하는 방법이 필요합니다.

실제로 자식 컴포넌트는 슬롯에 속성을 전달할 수 있습니다:

```vue
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

단일 기본 슬롯과 명명된 슬롯을 사용할 때 슬롯 속성을 받는 방법을 보여줍니다. 먼저 단일 기본 슬롯을 사용할 때 v-slot을 직접 자식 컴포넌트 태그에 사용하여 슬롯 속성을 받습니다:

```vue
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

슬롯 속성은 자식이 슬롯을 렌더링할 때 전달한 속성이며, 슬롯 내의 표현식에서 접근할 수 있습니다.

명명된 슬롯을 사용할 경우, 슬롯 속성은 v-slot 디렉티브의 값으로 접근 가능하며, 이는 v-slot:name="slotProps"와 같은 형식으로 사용됩니다. 축약 형식을 사용하면 다음과 같이 됩니다:

```vue
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

슬롯을 통해 전달된 속성에 대한 자세한 설명은 슬롯의 용도와 기능성을 확장하여 범위가 지정된 슬롯의 사용 예를 포함하여 설명합니다.

## 명명된 범위가 지정된 슬롯(Named Scoped Slots)

명명된 범위가 지정된 슬롯은 기본적으로 같은 방식으로 작동합니다. 예를 들어, 다음과 같이 `v-slot` 디렉티브에 슬롯의 이름과 `slotProps`를 전달할 수 있습니다:

```template
<MyComponent>
  <template #header="headerProps">
    <h1>{{ headerProps.title }}</h1>
  </template>

  <template #default="defaultProps">
    <div>{{ defaultProps.description }}</div>
  </template>

  <template #footer="footerProps">
    <footer>{{ footerProps.copyright }}</footer>
  </template>
</MyComponent>
```

슬롯을 통해 전달되는 속성은 자식 컴포넌트에서 슬롯 아웃렛에 지정된 속성을 통해 제공됩니다. 이는 함수를 통해 슬롯 내용을 조정하는 방식과 유사합니다.

## 동적 슬롯

동적 슬롯 이름을 사용하는 예시는 다음과 같습니다. 이는 템플릿 내에서 계산된 속성 이름이나 변수를 기반으로 슬롯 이름을 동적으로 결정할 때 유용합니다:

```vue
<DynamicComponent>
  <template v-slot:[dynamicName]>
    <p>This is a dynamic slot content.</p>
  </template>
</DynamicComponent>
```

여기서 dynamicName은 컴포넌트 내에서 계산되거나 props를 통해 전달된 값일 수 있습니다.

## 슬롯과 컴포넌트의 상호작용

Vue.js에서 슬롯을 사용하면 자식 컴포넌트의 내부 템플릿에 부모 컴포넌트에서 전달된 콘텐츠를 주입할 수 있습니다. 이는 코드의 재사용성과 유지보수성을 향상시키는데 도움을 줍니다. 슬롯은 Vue 컴포넌트 디자인의 핵심 부분이며, 효과적인 아키텍처 설계에 기여합니다.
