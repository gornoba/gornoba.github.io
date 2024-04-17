# Animations

css전환은 vue의 [transition](https://vuejs.org/guide/built-ins/transition.html#transition-modes)으로 처리 할 수 있습니다.  
그러나 quasar는 바로 사용할 수 있는 [Animate.css](https://animate.style/)를 이용할 수 있습니다.

## quasar.config

```js
// embedding all animations
animations: "all";

// or embedding only specific animations
animations: ["bounceInLeft", "bounceOutRight"];
```

## 사용

```html
<transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <!-- Wrapping only one DOM element, defined by QBtn -->
  <q-btn color="secondary" icon="mail" label="Email" />
</transition>
```

### 여러 요소에 같은 에니메이션 사용

```html
<transition-group
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <!-- We wrap a "p" tag and a QBtn -->
  <p key="text">Lorem Ipsum</p>
  <q-btn key="email-button" color="secondary" icon="mail" label="Email" />
</transition-group>
```

## 용도에 따른 사용

:::details General
bounce<br/>
flash<br/>
flip<br/>
headShake<br/>
heartBeat
hinge<br/>
jello<br/>
pulse<br/>
rubberBand
shake<br/>
shakeX<br/>
shakeY<br/>
swing<br/>
tada<br/>
wobble
::::
:::details In
backInDown<br/>
backInLeft<br/>
backInRight<br/>
backInUp<br/>
bounceIn<br/>
bounceInDown<br/>
bounceInLeft<br/>
bounceInRight<br/>
bounceInUp<br/>
fadeIn<br/>
fadeInBottomLeft<br/>
fadeInBottomRight<br/>
fadeInDown<br/>
fadeInDownBig<br/>
fadeInLeft<br/>
fadeInLeftBig<br/>
fadeInRight<br/>
fadeInRightBig<br/>
fadeInTopLeft<br/>
fadeInTopRight<br/>
fadeInUp<br/>
fadeInUpBig<br/>
flipInX<br/>
flipInY<br/>
jackInTheBox<br/>
lightSpeedInLeft<br/>
lightSpeedInRight<br/>
rollIn<br/>
rotateIn<br/>
rotateInDownLeft<br/>
rotateInDownRight<br/>
rotateInUpLeft<br/>
rotateInUpRight<br/>
slideInDown<br/>
slideInLeft<br/>
slideInRight<br/>
slideInUp<br/>
zoomIn<br/>
zoomInDown<br/>
zoomInLeft<br/>
zoomInRight<br/>
zoomInUp
::::
:::details Out
backOutDown<br/>
backOutLeft<br/>
backOutRight<br/>
backOutUp<br/>
bounceOut<br/>
bounceOutDown<br/>
bounceOutLeft<br/>
bounceOutRight<br/>
bounceOutUp<br/>
fadeOut<br/>
fadeOutBottomLeft<br/>
fadeOutBottomRight<br/>
fadeOutDown<br/>
fadeOutDownBig<br/>
fadeOutLeft<br/>
fadeOutLeftBig<br/>
fadeOutRight<br/>
fadeOutRightBig<br/>
fadeOutTopLeft<br/>
fadeOutTopRight<br/>
fadeOutUp<br/>
fadeOutUpBig<br/>
flipOutX<br/>
flipOutY<br/>
lightSpeedOutLeft<br/>
lightSpeedOutRight<br/>
rollOut<br/>
rotateOut<br/>
rotateOutDownLeft<br/>
rotateOutDownRight<br/>
rotateOutUpLeft<br/>
rotateOutUpRight<br/>
slideOutDown<br/>
slideOutLeft<br/>
slideOutRight<br/>
slideOutUp<br/>
zoomOut<br/>
zoomOutDown<br/>
zoomOutLeft<br/>
zoomOutRight<br/>
zoomOutUp
:::
:::details modifier
repeat<br/>
repeat-1<br/>
repeat-2<br/>
delay-1s<br/>
delay-5s<br/>
slower<br/>
slow<br/>
fast<br/>
faster
:::
