# KeepAlive

`<KeepAlive>`는 여러 컴포넌트 간에 동적으로 전환될 때, 컴포넌트 인스턴스를 조건부로 캐시할 수 있는 빌트인 컴포넌트입니다.

## 사용법

```html
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

## 최대 캐시 인스턴스

```html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## hook

```html
<script setup>
  import { onActivated, onDeactivated } from "vue";

  onActivated(() => {
    // 초기 마운트 시 또는
    // 캐시상태에서 다시 삽입될 때마다 호출됨.
  });

  onDeactivated(() => {
    // DOM에서 제거되고 캐시로 전환될 시 또는
    // 마운트 해제될 때마다 호출됨.
  });
</script>
```

- `onActivated`는 마운트 시에도 호출되고 `onDeactivated`는 마운트 해제 시에도 호출됩니다.

- 두 훅 모두 `<KeepAlive>`에 의해 캐시된 루트 컴포넌트뿐만 아니라 캐시된 트리의 자식 컴포넌트에서도 작동합니다.
