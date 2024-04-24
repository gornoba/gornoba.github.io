# Pinia

https://pinia.vuejs.kr/<br/>
vue를 처음 사용했을 때 상태관리 라이브러리로 vuex는 정말 hell이었습니다.  
하지만 pinia는 너무나 간단하고 사용하기도 쉽습니다.

## Store

저와 같이 `<script setup>`을 사용하신다면 pinia도 그와 유사한 setup store를 이용하시는 것을 추천합니다. 사실 vue3의 문법과 아주 똑같습니다.

```typescript
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0); // state
  const name = ref("Eduardo"); // state
  const doubleCount = computed(() => count.value * 2); // getter
  function increment() {
    count.value++;
  } // action

  return { count, name, doubleCount, increment };
});
```

## Plugins

setup은 options와 달리 `$reset` 기능이 없어서 plugin에 추가해주면 됩니다.

### $reset

```typescript
pinia.use(({ store }) => {
  const originalReset = store.$reset;

  store.$reset = () => {
    originalReset.call(store);
  };

  return store;
});
```

### debounce

이건 유용해보여서 추가해봤습니다.

```typescript
// type추가
import "pinia";

declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>;
  }
}
```

```typescript
// debounce추가
pinia.use(({ options, store }) => {
if (options.debounce) {
  return Object.keys(options.debounce).reduce(
    (
      debouncedActions: Record<
        string,
        DebouncedFunc<(...args: any[]) => any>
      >,
      action: string,
    ) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce ? options.debounce[action] : 500,
      );
      return debouncedActions;
    },
    {},
  );
}
```

```typescript
// 사용
defineStore(
  "search",
  () => {
    // ...
  },
  {
    debounce: {
      searchContacts: 300,
    },
  }
);
```
