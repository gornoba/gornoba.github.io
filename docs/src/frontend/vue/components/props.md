# Vue.js에서 Props 사용하기

Vue 컴포넌트는 외부로부터 props를 전달받아 사용할 수 있습니다. 이 페이지에서는 props의 선언 방법과 사용 방법을 자세히 다룹니다.

## Props 선언

Vue에서는 컴포넌트로 전달되는 props를 명시적으로 선언해야 합니다. 이를 통해 Vue는 어떤 속성이 컴포넌트의 props로 처리될지 알 수 있습니다.

### SFC에서의 Props 선언

`<script setup>`을 사용하는 싱글 파일 컴포넌트(SFC)에서는 `defineProps()` 매크로를 사용하여 props를 선언할 수 있습니다.

```vue
<script setup>
const props = defineProps(["foo"]);
console.log(props.foo);
</script>
```

### 일반 컴포넌트에서의 Props 선언

`<script setup>`을 사용하지 않는 경우, `props` 옵션을 통해 props를 선언합니다.

```js
export default {
  props: ["foo"],
  setup(props) {
    console.log(props.foo);
  },
};
```

props는 문자열 배열을 사용하거나, 객체 구문을 사용하여 선언할 수 있습니다.

```js
export default {
  props: {
    title: String,
    likes: Number,
  },
};
```

각 속성은 prop의 이름을 키로, 예상 타입을 값으로 사용합니다.

## Props 전달

### Prop 이름 규칙

CamelCase를 사용하여 props를 선언하며, 이는 JavaScript 식별자로 유효하기 때문입니다. 그러나 HTML에서는 kebab-case를 사용합니다.

```template
<MyComponent greeting-message="Hello World" />
```

### 정적 vs 동적 Props

Props는 정적 값 또는 `v-bind`를 사용한 동적 값으로 전달할 수 있습니다.

```template
<BlogPost title="My journey with Vue" />
<BlogPost :title="post.title" />
```

### 다양한 값 타입 전달

Props로 다양한 타입의 값을 전달할 수 있습니다: 숫자, 불리언, 배열, 객체 등.

```template
<BlogPost :likes="42" />
<BlogPost :is-published="false" />
<BlogPost :comment-ids="[234, 266, 273]" />
```

## 단방향 데이터 흐름

Props는 하향식(부모에서 자식으로) 바인딩을 형성합니다. 이는 자식 컴포넌트에서 부모의 상태를 직접 변경할 수 없도록 하여 애플리케이션의 데이터 흐름을 명확하게 합니다.

## Props 유효성 검증

컴포넌트는 props의 타입, 필수 여부 등을 지정할 수 있습니다. 타입이 맞지 않을 경우 브라우저 콘솔에 경고가 표시됩니다.

```js
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
};
```

Vue는 타입을 기반으로 props를 검증하고, 부적합한 타입이 전달되면 경고를 표시합니다.
