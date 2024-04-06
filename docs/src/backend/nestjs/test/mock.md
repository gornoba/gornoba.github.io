# Mock Functions

모의 함수는 출력만 테스트하는 것이 아니라 다른 코드에서 간접적으로 호출되는 함수의 동작을 염탐할 수 있기 때문에 '스파이'라고도 합니다. `jest.fn()`을 사용하여 모의 함수를 만들 수 있습니다. mock이 없는 경우 모의 함수는 호출 시 `undefined`로 반환됩니다.

# reference

Jest에서는 mock 함수를 통해 함수의 호출, 반환 값, 인스턴스 생성 등 다양한 동작을 모니터링하고 제어할 수 있습니다. 여기서는 자주 사용되는 mock 함수 기능들을 상세하게 설명합니다.

### Mock 이름 설정

#### `mockFn.getMockName()`

- mock 함수에 설정된 이름을 반환합니다. `.mockName()`을 통해 설정할 수 있습니다.

### 호출 인자 확인

#### `mockFn.mock.calls`

- 이 mock 함수가 호출된 모든 인자의 배열입니다. 각 호출은 인자들의 배열로 표현됩니다.

```javascript
// mock 함수 f가 'arg1', 'arg2'로 한 번, 'arg3', 'arg4'로 다른 한 번 호출되었을 때
[
  ["arg1", "arg2"],
  ["arg3", "arg4"],
];
```

### 호출 결과 확인

#### `mockFn.mock.results`

- 이 mock 함수의 모든 호출 결과를 포함하는 배열입니다. 각 결과는 `type`과 `value` 속성을 가진 객체입니다.

```javascript
// mock 함수 f가 세 번 호출되어, 첫 번째는 'result1'을 반환, 두 번째는 에러를 발생, 세 번째는 'result2'를 반환했을 때
[
  { type: "return", value: "result1" },
  {
    type: "throw",
    value: {
      /* Error instance */
    },
  },
  { type: "return", value: "result2" },
];
```

### 생성된 인스턴스 확인

#### `mockFn.mock.instances`

- 이 mock 함수로 생성된 모든 인스턴스의 배열입니다.

```javascript
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

// true
mockFn.mock.instances[0] === a;
mockFn.mock.instances[1] === b;
```

### 호출 컨텍스트 확인

#### `mockFn.mock.contexts`

- 모든 호출의 컨텍스트(`this` 값)를 포함하는 배열입니다.
- `Function.prototype.bind`, `Function.prototype.call` 또는 `Function.prototype.apply`와 함꼐 쓸 수 있습니다.

```typescript
const mockFn = jest.fn();

const boundMockFn = mockFn.bind(thisContext0);
boundMockFn("a", "b");
mockFn.call(thisContext1, "a", "b");
mockFn.apply(thisContext2, ["a", "b"]);

mockFn.mock.contexts[0] === thisContext0; // true
mockFn.mock.contexts[1] === thisContext1; // true
mockFn.mock.contexts[2] === thisContext2; // true
```

### 마지막 호출 인자 확인

#### `mockFn.mock.lastCall`

- 마지막으로 이 mock 함수가 호출됐을 때의 인자들을 포함하는 배열입니다.

```javascript
// mock 함수 f가 'arg1', 'arg2'로 한 번, 'arg3', 'arg4'로 다른 한 번 호출되었을 때
["arg3", "arg4"];
```

### Mock 함수 초기화

#### `mockFn.mockClear()`

- `mockFn.mock.calls`, `mockFn.mock.instances`, `mockFn.mock.contexts`, `mockFn.mock.results` 배열을 초기화합니다.

#### `mockFn.mockReset()`

- `mockFn.mockClear()`이 하는 모든 작업을 수행하며, 추가로 mock 구현을 비우고 `undefined`를 반환하도록 설정합니다.

#### `mockFn.mockRestore()`

- `mockFn.mockReset()`이 하는 모든 작업을 수행하며, 또한 원래(모의되지 않은) 구현으로 복원합니다.

### 구현 변경

#### `mockFn.mockImplementation(fn)`

- mock 함수의 구현을 제공된 함수로 설정합니다.

```javascript
const mockFn = jest.fn((scalar) => 42 + scalar);

mockFn(0); // 42
mockFn(1); // 43

mockFn.mockImplementation((scalar) => 36 + scalar);

mockFn(2); // 38
mockFn(3); // 39
```

```typescript
export class SomeClass {
  method(a: string, b: string): void {}
}

// 테스트
jest.mock("./SomeClass");

const mockMethod = jest.fn<(a: string, b: string) => void>();
jest.mocked(SomeClass).mockImplementation(() => {
  return {
    method: mockMethod,
  };
});

const some = new SomeClass();
some.method("a", "b");

console.log("Calls to method:", mockMethod.mock.calls);
```

#### `mockFn.mockImplementationOnce(fn)`

- 한 번의 호출에 대해 mock 함수의 구현을 제공된 함수로 설정합니다. 연속적으로 호출될 때마다 다른 결과를 반환하도록 설정할 수 있습니다.

```typescript
const mockFn = jest
  .fn<(cb: (a: null, b: boolean) => void) => void>()
  .mockImplementationOnce((cb) => cb(null, true))
  .mockImplementationOnce((cb) => cb(null, false));

mockFn((err, val) => console.log(val)); // true
mockFn((err, val) => console.log(val)); // false

const mockFn = jest
  .fn(() => "default")
  .mockImplementationOnce(() => "first call")
  .mockImplementationOnce(() => "second call");

mockFn(); // 'first call'
mockFn(); // 'second call'
mockFn(); // 'default'
mockFn(); // 'default'
```

#### `mockFn.mockName(name)`

- 테스트 결과 출력에서 `jest.fn()` 대신 사용될 mock 함수의 이름을 설정합니다.

```typescript
const mockFn = jest.fn().mockName("mockedFunction");

// mockFn();
expect(mockFn).toHaveBeenCalled();
```

#### `mockFn.mockReturnThis()`

- mock 함수가 `this`를 반환하도록 설정합니다.
  ```typescript
  jest.fn(function () {
    return this;
  });
  ```

#### `mockFn.mockReturnValue(value)`

- mock 함수가 호출될 때마다 특정 값을 반환하도록 설정합니다.

```typescript
jest.fn().mockImplementation(() => value);

const mock = jest.fn<() => number>();

mock.mockReturnValue(42);
mock(); // 42

mock.mockReturnValue(43);
mock(); // 43
```

#### `mockFn.mockReturnValueOnce(value)`

- mock 함수가 한 번 호출될 때 특정 값을 반환하도록 설정합니다. 연속적으로 호출될 때마다 다른 값을 반환하도록 설정할 수 있습니다.

```typescript
import { jest } from "@jest/globals";

const mockFn = jest
  .fn<() => string>()
  .mockReturnValue("default")
  .mockReturnValueOnce("first call")
  .mockReturnValueOnce("second call");

mockFn(); // 'first call'
mockFn(); // 'second call'
mockFn(); // 'default'
mockFn(); // 'default'
```

#### `mockFn.mockResolvedValue(value)`

- mock 함수가 Promise를 반환하고, 이 Promise가 주어진 값을 가지고 성공적으로 resolve되도록 설정합니다.

```typescript
jest.fn().mockImplementation(() => Promise.resolve(value));

test("async test", async () => {
  const asyncMock = jest.fn<() => Promise<number>>().mockResolvedValue(43);

  await asyncMock(); // 43
});
```

#### `mockFn.mockResolvedValueOnce(value)`

- mock 함수가 한 번 호출될 때 Promise를 반환하고, 이 Promise가 주어진 값을 가지고 성공적으로 resolve되도록 설정합니다.

```typescript
jest.fn().mockImplementationOnce(() => Promise.resolve(value));

test("async test", async () => {
  const asyncMock = jest
    .fn<() => Promise<string>>()
    .mockResolvedValue("default")
    .mockResolvedValueOnce("first call")
    .mockResolvedValueOnce("second call");

  await asyncMock(); // 'first call'
  await asyncMock(); // 'second call'
  await asyncMock(); // 'default'
  await asyncMock(); // 'default'
});
```

#### `mockFn.mockRejectedValue(value)`

- mock 함수가 Promise를 반환하고, 이 Promise가 주어진 값을 가지고 reject되도록 설정합니다.

```typescript
jest.fn().mockImplementation(() => Promise.reject(value));

test("async test", async () => {
  const asyncMock = jest
    .fn<() => Promise<never>>()
    .mockRejectedValue(new Error("Async error message"));

  await asyncMock(); // throws 'Async error message'
});
```

#### `mockFn.mockRejectedValueOnce(value)`

- mock 함수가 한 번 호출될 때 Promise를 반환하고, 이 Promise가 주어진 값을 가지고 reject되도록 설정합니다.

```typescript
jest.fn().mockImplementationOnce(() => Promise.reject(value));

test("async test", async () => {
  const asyncMock = jest
    .fn<() => Promise<string>>()
    .mockResolvedValueOnce("first call")
    .mockRejectedValueOnce(new Error("Async error message"));

  await asyncMock(); // 'first call'
  await asyncMock(); // throws 'Async error message'
});
```

## 속성 대체(Replacing Properties)

### `replacedProperty.replaceValue(value)`

- 이미 대체된 속성의 값을 변경합니다. 특정 테스트에서 값 조정이 필요할 때 유용합니다.

### `replacedProperty.restore()`

- 객체의 속성을 원래 값으로 복원합니다. 이 기능은 속성 값이 `jest.replaceProperty()`를 사용하여 대체되었을 때만 작동합니다.

## 타입스크립트(Typescript) 사용

## 모의 함수(`jest.fn`)

### `jest.fn(implementation?)`

- 구현이 제공된 경우, 모의 함수의 타입이 자동으로 추론됩니다. 타입 안전성을 위해 제네릭 타입 인자를 전달할 수도 있습니다.

  ```typescript
  import type add from "./add";
  import calculate from "./calc";

  test("calculate calls add", () => {
    const mockAdd = jest.fn<typeof add>();

    mockAdd.mockImplementation((a, b) => {
      // Yes, this mock is still adding two numbers but imagine this
      // was a complex function we are mocking.
      return a + b;
    });

    calculate(mockAdd, 1, 2);

    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith(1, 2);
  });
  ```

### `jest.Mock<T>`

- 모의 함수의 유형(예: jest.fn()의 반환 유형)을 구성합니다. 재귀적인 모의 함수를 정의해야 할 때 유용할 수 있습니다

```typescript
const sumRecursively: jest.Mock<(value: number) => number> = jest.fn(
  (value) => {
    if (value === 0) {
      return 0;
    } else {
      return value + fn(value - 1);
    }
  }
);
```

### `jest.Mocked<Source>`

- 소스 타입을 Jest 모의 함수 타입 정의로 감싸 반환합니다.

```typescript
import type { fetch } from "node-fetch";

jest.mock("node-fetch");

let mockedFetch: jest.Mocked<typeof fetch>;

afterEach(() => {
  mockedFetch.mockClear();
});

test("makes correct call", () => {
  mockedFetch = getMockedFetch();
  // ...
});

test("returns correct data", () => {
  mockedFetch = getMockedFetch();
  // ...
});
```

### `jest.Replaced<Source>`

- 소스 타입을 Jest 대체 속성 타입 정의로 감싸 반환합니다.

  ```typescript
  let replacedEnv: jest.Replaced<typeof process.env>;
  ```

### `jest.mocked(source, options?)`

- 소스 객체와 그 깊은 중첩 멤버의 타입을 Jest 모의 함수 타입 정의로 감싸 반환합니다.

  ```typescript
  import { song } from "./song";

  jest.mock("./song");
  jest.spyOn(console, "log");

  const mockedSong = jest.mocked(song);

  test("deep method is typed correctly", () => {
    mockedSong.one.more.time.mockReturnValue(12);

    expect(mockedSong.one.more.time(10)).toBe(12);
    expect(mockedSong.one.more.time.mock.calls).toHaveLength(1);
  });

  test("direct usage", () => {
    jest.mocked(console.log).mockImplementation(() => {
      return;
    });

    console.log("one more time");

    expect(jest.mocked(console.log).mock.calls).toHaveLength(1);
  });
  ```

### `jest.Spied<Source>`

- 클래스나 함수의 스파이 타입(즉, `jest.spyOn()`의 반환 타입)을 생성합니다.

  ```typescript
  export function setDateNow(now: number): jest.Spied<typeof Date.now> {
    return jest.spyOn(Date, "now").mockReturnValue(now);
  }
  ```
