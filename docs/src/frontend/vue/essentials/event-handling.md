# Vue.js 이벤트 핸들링 이해하기

이 문서에서는 Vue.js에서 DOM 이벤트를 듣고 반응하는 방법을 소개합니다. 이벤트를 감지하고 처리하는 기본적인 방법부터 고급 기술까지 다룹니다.

## 기본 이벤트 핸들링

Vue에서 이벤트를 감지하기 위해 사용하는 `v-on` 지시자는 일반적으로 `@` 기호로 축약하여 사용됩니다. 예를 들어, 클릭 이벤트를 감지하려면 다음과 같이 작성할 수 있습니다:

```html
<button @click="handler">Click me</button>
```

### 이벤트 핸들러 유형

1. **인라인 핸들러 (Inline handlers)**:

   - 이벤트가 발생할 때 직접적으로 실행되는 간단한 자바스크립트 코드입니다. 예:
     ```html
     <button @click="count++">Add 1</button>
     ```

2. **메소드 핸들러 (Method handlers)**:

   - 보다 복잡한 로직을 컴포넌트의 메소드를 통해 처리합니다. 예:

     ```javascript
     const name = ref("Vue.js");

     function greet(event) {
       alert(`Hello ${name.value}!`);
       if (event) {
         alert(event.target.tagName);
       }
     }
     ```

     ```html
     <button @click="greet">Greet</button>
     ```

### 메소드와 인라인 핸들러의 차이

- **메소드 핸들러**는 주로 복잡한 이벤트 로직을 관리하는 데 사용됩니다. 템플릿 컴파일러는 메소드 핸들러를 JavaScript 식별자 또는 속성 접근 경로로 인식합니다.
- **인라인 핸들러**는 간단한 연산이나 메소드 호출에 적합합니다. 직접적인 동작을 실행할 때 유용합니다.

## 이벤트 수정자 (Event Modifiers)

Vue는 이벤트 핸들링을 간소화하기 위한 여러 수정자를 제공합니다. 수정자는 `v-on` 지시자에 점으로 연결된 접미사입니다.

- `.stop`: 이벤트 전파를 중지합니다.
- `.prevent`: 이벤트의 기본 행동을 방지합니다.
- `.capture`: 캡처 모드에서 이벤트 리스너를 추가합니다.
- `.self`: 이벤트가 해당 요소에서 발생했을 때만 핸들러를 실행합니다.
- `.once`: 이벤트를 한 번만 처리합니다.
- `.passive`: 리스너를 등록할 때 `{ passive: true }`를 사용합니다.

```html
<!-- 클릭 이벤트의 전파를 중지하고, 기본 동작도 방지합니다. -->
<a @click.stop.prevent="doThat"></a>
```

## 키 수정자 (Key Modifiers)

특정 키 이벤트에만 반응하도록 할 때 사용합니다. 예를 들어, Enter 키를 눌렀을 때만 함수를 호출하려면 다음과 같이 작성합니다:

```html
<input @keyup.enter="submit" />
```

## 시스템 수정자 키

Ctrl, Alt, Shift, Meta와 같은 시스템 수정자 키 (System Modifier Keys)는 특정 시스템 키가 눌려있을 때만 이벤트 리스너가 반응하도록 설정합니다. 예를 들어:

```html
<!-- Ctrl 키와 함께 클릭할 경우에만 작동 -->
<div @click.ctrl="doSomething">Do something</div>
```

## 마우스 버튼 수정자 (Mouse Button Modifiers)

마우스 버튼 수정자를 사용하면 특정 마우스 버튼에 의해 트리거된 이벤트에만 핸들러가 반응하도록 설정할 수 있습니다.

- `.left`: 왼쪽 버튼
- `.right`: 오른쪽 버튼
- `.middle`: 휠 버튼

예시:

```html
<!-- 오른쪽 마우스 버튼 클릭 시 작동 -->
<button @click.right="onRightClick">Right Click</button>
```

## 정확한 수정자 (The .exact Modifier)

`.exact` 수정자는 이벤트를 발생시키는 데 정확한 조합의 시스템 수정자가 필요할 때 사용됩니다.

```html
<!-- Ctrl 키가 눌린 상태에서 정확하게 해당 버튼 클릭 시만 작동 -->
<button @click.ctrl.exact="onCtrlClick">Ctrl + Click</button>
```

## 주요 키 별칭 (Key Aliases)

Vue는 가장 자주 사용되는 몇몇 키에 대한 별칭을 제공합니다:

- `.enter`
- `.tab`
- `.delete` (Delete 및 Backspace 키 모두 캡처)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

이러한 별칭을 사용하여 입력, 버튼 등의 요소에서 특정 키 이벤트를 쉽게 핸들링할 수 있습니다.

```html
<!-- Enter 키를 누를 때 submit 함수 호출 -->
<input @keyup.enter="submit" />
```

## 결론

Vue.js의 `v-on` 지시자와 다양한 이벤트 및 키 수정자를 사용하여, 웹 애플리케이션의 사용자 인터랙션을 효과적으로 관리할 수 있습니다. 초보자는 이 기본적인 예제들을 통해 Vue.js에서의 이벤트 핸들링 방법을 쉽게 익힐 수 있습니다. 이벤트 처리 로직을 컴포넌트의 메소드로 분리하고, 수정자를 사용하여 코드를 간결하고 명확하게 유지하는 것이 좋습니다.
