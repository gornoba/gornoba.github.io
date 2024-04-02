# Jest의 `expect` 함수

`expect` 함수는 값을 테스트하고 싶을 때마다 사용됩니다. 대부분의 경우, `expect`는 단독으로 호출되지 않으며, 대신 "`matcher`(matcher)" 함수와 함께 사용하여 값에 대해 어떤 것을 주장(assert)합니다.

## 기본 사용 예

예를 들어, `bestLaCroixFlavor()` 메서드가 'grapefruit' 문자열을 반환해야 한다고 가정해 보겠습니다. 다음과 같이 테스트할 수 있습니다:

```javascript
test("최고의 맛은 grapefruit이다", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});
```

이 경우, `toBe`는 `matcher` 함수입니다. 다양한 `matcher` 함수들이 있어 다양한 것들을 테스트할 수 있도록 도와줍니다.

`expect`의 인자는 코드가 생성한 값을, `matcher`의 인자는 올바른 값을 가져야 합니다. 이를 혼동하면 테스트는 여전히 작동하지만, 실패한 테스트의 에러 메시지가 이상하게 보일 수 있습니다.

## Modifiers

### `.not`

어떤 것을 테스트하는 방법을 알고 있다면, `.not`을 사용하면 그 반대를 테스트할 수 있습니다. 예를 들어, 다음 코드는 최고의 La Croix 맛이 coconut이 아님을 테스트합니다:

```javascript
test("최고의 맛은 coconut이 아니다", () => {
  expect(bestLaCroixFlavor()).not.toBe("coconut");
});
```

### `.resolves`와 `.rejects`

`.resolves`는 이행된 `Promise`의 값을 풀어서 다른 `matcher`를 연쇄적으로 사용할 수 있게 해줍니다. `Promise`가 거부되면 테스트는 실패합니다.

예를 들어, 다음 코드는 `Promise`가 이행되고 그 결과 값이 'lemon'이 되는 것을 테스트합니다:

```javascript
test("lemon으로 이행된다", async () => {
  await expect(Promise.resolve("lemon")).resolves.toBe("lemon");
  await expect(Promise.resolve("lemon")).resolves.not.toBe("octopus");
});
```

`.rejects`는 거부된 `Promise`의 풀어서 다른 `matcher`를 연쇄적으로 사용할 수 있게 해줍니다. `Promise`가 이행되면 테스트는 실패합니다.

예를 들어, 다음 코드는 `Promise`가 'octopus'라는 이유로 거부되는 것을 테스트합니다:

```javascript
test("octopus로 거부된다", async () => {
  await expect(Promise.reject(new Error("octopus"))).rejects.toThrow("octopus");
});
```

## Matchers

Jest에서 `Matchers`는 테스트할 값에 대해 다양한 주장(assertions)을 할 수 있게 해주는 함수들입니다. 여기서는 주요 `Matchers`와 그 사용법을 살펴보겠습니다.

### 값 비교하기

#### `.toBe(value)` \*\*\*

- 원시 값이나 객체 인스턴스의 참조 동일성을 비교할 때 사용합니다.
- `Object.is`를 사용해 값 비교를 수행하기 때문에, `===`보다 테스트에 적합합니다.

```javascript
test("has 12 ounces", () => {
  expect(can.ounces).toBe(12);
});
```

#### 주의: 부동 소수점 수 비교

- `.toBe`는 부동 소수점 수에 대해서는 사용하지 않는 것이 좋습니다. 대신, `.toBeCloseTo`를 사용하세요.

### Mock 함수 호출 검사

#### `.toHaveBeenCalled()` \*\*\*

- Mock 함수가 최소 한 번 이상 호출되었는지 검사합니다.

```javascript
test("drinks something lemon-flavoured", () => {
  const drink = jest.fn();
  drinkAll(drink, "lemon");
  expect(drink).toHaveBeenCalled();
});
```

#### `.toHaveBeenCalledTimes(number)` \*\*\*

- Mock 함수가 정확히 지정된 횟수만큼 호출되었는지 검사합니다.

```javascript
test("drinkEach drinks each drink", () => {
  const drink = jest.fn();
  drinkEach(drink, ["lemon", "octopus"]);
  expect(drink).toHaveBeenCalledTimes(2);
});
```

#### `.toHaveBeenCalledWith(arg1, arg2, ...)` \*\*\*

- Mock 함수가 특정 인자로 호출되었는지 검사합니다.

```javascript
test("registration applies correctly to orange La Croix", () => {
  const beverage = new LaCroix("orange");
  register(beverage);
  const f = jest.fn();
  applyToAll(f);
  expect(f).toHaveBeenCalledWith(beverage);
});
```

#### `.toHaveBeenLastCalledWith(arg1, arg2, ...)`

- Mock 함수가 마지막으로 호출될 때 특정 인자로 호출되었는지 검사합니다.

```javascript
test("applying to all flavors does mango last", () => {
  const drink = jest.fn();
  applyToAllFlavors(drink);
  expect(drink).toHaveBeenLastCalledWith("mango");
});
```

#### `.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ...)`

- Mock 함수가 n번째로 호출될 때 특정 인자로 호출되었는지 검사합니다.

```javascript
test("drinkEach drinks each drink", () => {
  const drink = jest.fn();
  drinkEach(drink, ["lemon", "octopus"]);
  expect(drink).toHaveBeenNthCalledWith(1, "lemon");
  expect(drink).toHaveBeenNthCalledWith(2, "octopus");
});
```

### 반환 값 검사

#### `.toHaveReturned()`

- Mock 함수가 성공적으로 반환되었는지(즉, 에러를 던지지 않고) 최소 한 번 검사합니다.

```javascript
test("drinks returns", () => {
  const drink = jest.fn(() => true);
  drink();
  expect(drink).toHaveReturned();
});
```

#### `.toHaveReturnedTimes(number)`

- Mock 함수가 지정된 횟수만큼 성공적으로 반환되었는지 검사합니다.

```javascript
test("drink returns twice", () => {
  const drink = jest.fn(() => true);
  drink();
  drink();
  expect(drink).toHaveReturnedTimes(2);
});
```

#### `.toHaveReturnedWith(value)`

- Mock 함수가 특정 값을 반환했는지 검사합니다.

```javascript
test("drink returns La Croix", () => {
  const beverage = { name: "La Croix" };
  const drink = jest.fn((beverage) => beverage.name);
  drink(beverage);
  expect(drink).toHaveReturnedWith("La Croix");
});
```

### 반환 값 검사

#### `.toHaveLastReturnedWith(value)`

- Mock 함수의 마지막 호출이 특정 값을 반환했는지 테스트합니다.
- 마지막 호출이 에러를 발생시킨 경우, 어떤 반환 값이 제공되더라도 테스트는 실패합니다.

```javascript
test("drink returns La Croix (Orange) last", () => {
  const beverage1 = { name: "La Croix (Lemon)" };
  const beverage2 = { name: "La Croix (Orange)" };
  const drink = jest.fn((beverage) => beverage.name);

  drink(beverage1);
  drink(beverage2);

  expect(drink).toHaveLastReturnedWith("La Croix (Orange)");
});
```

#### `.toHaveNthReturnedWith(nthCall, value)`

- Mock 함수가 n번째 호출에서 특정 값을 반환했는지 테스트합니다.
- n번째 호출이 에러를 발생시킨 경우, 제공된 반환 값에 상관없이 테스트는 실패합니다.

```javascript
test("drink returns expected nth calls", () => {
  const beverage1 = { name: "La Croix (Lemon)" };
  const beverage2 = { name: "La Croix (Orange)" };
  const drink = jest.fn((beverage) => beverage.name);

  drink(beverage1);
  drink(beverage2);

  expect(drink).toHaveNthReturnedWith(1, "La Croix (Lemon)");
  expect(drink).toHaveNthReturnedWith(2, "La Croix (Orange)");
});
```

### 객체와 배열 검사

#### `.toHaveLength(number)`

- 객체가 `.length` 속성을 가지며, 이가 특정 수치 값과 동일한지 검사합니다.
- 배열이나 문자열의 길이를 검사하는데 유용합니다.

```javascript
expect([1, 2, 3]).toHaveLength(3);
expect("abc").toHaveLength(3);
expect("").not.toHaveLength(5);
```

#### `.toHaveProperty(keyPath, value?)`

- 객체가 제공된 참조 `keyPath`에 해당하는 속성을 가지고 있는지, 선택적으로 해당 속성의 값이 기대하는 값과 동일한지 검사합니다.
- 객체 내부의 깊숙히 중첩된 속성을 검사할 때 dot 표기법 또는 배열을 사용할 수 있습니다.

```javascript
test("this house has my desired features", () => {
  // 단순 참조
  expect(houseForSale).toHaveProperty("bath");
  expect(houseForSale).toHaveProperty("bedrooms", 4);

  // 깊은 참조
  expect(houseForSale).toHaveProperty("kitchen.area", 20);
  expect(houseForSale).toHaveProperty(["kitchen", "nice.oven"]);
});
```

### 부동 소수점 수 검사

#### `.toBeCloseTo(number, numDigits?)`

- 부동 소수점 수의 근사 값을 검사할 때 사용합니다.
- 선택적인 `numDigits` 인자로 소수점 이하 몇 번째 자리까지 비교할지 정할 수 있습니다.

```javascript
test("adding works sanely with decimals", () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5); // 성공
});
```

### 정의 및 불리언 값 검사

#### `.toBeDefined()`

- 변수가 `undefined`가 아닌 값을 가지고 있는지 검사합니다.

```javascript
test("there is a new flavor idea", () => {
  expect(fetchNewFlavorIdea()).toBeDefined();
});
```

#### `.toBeFalsy()` \*\*\*

- 값이 불리언 컨텍스트에서 `false`로 평가되는지 검사합니다.

```javascript
test("drinking La Croix does not lead to errors", () => {
  drinkSomeLaCroix();
  expect(getErrors()).toBeFalsy();
});
```

### 숫자 비교 Matchers

#### `.toBeGreaterThan(number | bigint)`

- 받은 값이 기대하는 값보다 큰지 비교합니다.

```javascript
test("ounces per can is more than 10", () => {
  expect(ouncesPerCan()).toBeGreaterThan(10);
});
```

#### `.toBeGreaterThanOrEqual(number | bigint)`

- 받은 값이 기대하는 값보다 크거나 같은지 비교합니다.

```javascript
test("ounces per can is at least 12", () => {
  expect(ouncesPerCan()).toBeGreaterThanOrEqual(12);
});
```

#### `.toBeLessThan(number | bigint)`

- 받은 값이 기대하는 값보다 작은지 비교합니다.

```javascript
test("ounces per can is less than 20", () => {
  expect(ouncesPerCan()).toBeLessThan(20);
});
```

#### `.toBeLessThanOrEqual(number | bigint)`

- 받은 값이 기대하는 값보다 작거나 같은지 비교합니다.

```javascript
test("ounces per can is at most 12", () => {
  expect(ouncesPerCan()).toBeLessThanOrEqual(12);
});
```

### 타입 및 상태 검사 Matchers

#### `.toBeInstanceOf(Class)`

- 객체가 특정 클래스의 인스턴스인지 확인합니다.

```javascript
class A {}
expect(new A()).toBeInstanceOf(A);
```

#### `.toBeNull()` \*\*\*

- 값이 `null`인지 확인합니다.

```javascript
function bloop() {
  return null;
}
test("bloop returns null", () => {
  expect(bloop()).toBeNull();
});
```

#### `.toBeTruthy()` \*\*\*

- 값이 boolean 컨텍스트에서 `true`로 평가되는지 확인합니다.

```javascript
test("drinking La Croix leads to having thirst info", () => {
  drinkSomeLaCroix();
  expect(thirstInfo()).toBeTruthy();
});
```

#### `.toBeUndefined()` \*\*\*

- 값이 `undefined`인지 확인합니다.

```javascript
test("the best drink for octopus flavor is undefined", () => {
  expect(bestDrinkForFlavor("octopus")).toBeUndefined();
});
```

#### `.toBeNaN()`

- 값이 `NaN`인지 확인합니다.

```javascript
test("passes when value is NaN", () => {
  expect(NaN).toBeNaN();
});
```

### 배열 및 객체 내 포함 여부 검사 Matchers

#### `.toContain(item)` \*\*\*

- 배열이나 문자열이 특정 항목을 포함하고 있는지 확인합니다.

```javascript
test("the flavor list contains lime", () => {
  expect(getAllFlavors()).toContain("lime");
});
```

#### `.toContainEqual(item)`

- 배열이 주어진 객체와 동일한 구조와 값을 가진 항목을 포함하고 있는지 확인합니다.

```javascript
describe("my beverage", () => {
  test("is delicious and not sour", () => {
    const myBeverage = { delicious: true, sour: false };
    expect(myBeverages()).toContainEqual(myBeverage);
  });
});
```

#### `.toEqual(value)` \*\*\*

- 객체 또는 배열이 주어진 객체 또는 배열과 깊은 비교(deep equality)를 통해 동등한지 확인합니다.

```javascript
describe("the La Croix cans on my desk", () => {
  const can1 = { flavor: "grapefruit", ounces: 12 };
  const can2 = { flavor: "grapefruit", ounces: 12 };

  test("have all the same properties", () => {
    expect(can1).toEqual(can2);
  });
});
```

### 문자열 매칭 검사

#### `.toMatch(regexp | string)` \*\*\*

- 문자열이 정규 표현식이나 문자열과 일치하는지 확인합니다.

```javascript
describe("an essay on the best flavor", () => {
  test("mentions grapefruit", () => {
    expect(essayOnTheBestFlavor()).toMatch(/grapefruit/);
  });
});

describe("grapefruits are healthy", () => {
  test("grapefruits are a fruit", () => {
    expect("grapefruits").toMatch("fruit");
  });
});
```

### 객체 매칭 검사

#### `.toMatchObject(object)`

- JavaScript 객체가 주어진 객체의 속성과 부분적으로 일치하는지 확인합니다.

```javascript
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ["oven", "stove", "washer"],
    area: 20,
    wallColor: "white",
  },
};

const desiredHouse = {
  bath: true,
  kitchen: {
    amenities: ["oven", "stove", "washer"],
    wallColor: expect.stringMatching(/white|yellow/),
  },
};

test("the house has my desired features", () => {
  expect(houseForSale).toMatchObject(desiredHouse);
});
```

### 스냅샷 매칭 검사

#### `.toMatchSnapshot(propertyMatchers?, hint?)`

- 값이 최신 스냅샷과 일치하는지 확인합니다.

```javascript
// 스냅샷 테스트 예제 코드는 생략되었습니다.
```

#### `.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)`

- 값이 인라인 스냅샷과 일치하는지 확인합니다. 스냅샷은 테스트 파일 내에 직접 포함됩니다.

```javascript
// 인라인 스냅샷 테스트 예제 코드는 생략되었습니다.
```

### 엄격한 객체 비교

#### `.toStrictEqual(value)`

- 객체가 주어진 값과 정확히 같은지 확인합니다. `.toEqual`과는 달리, 더 엄격한 비교를 수행합니다.

```javascript
class LaCroix {
  constructor(flavor) {
    this.flavor = flavor;
  }
}

describe("the La Croix cans on my desk", () => {
  test("are not semantically the same", () => {
    expect(new LaCroix("lemon")).toEqual({ flavor: "lemon" });
    expect(new LaCroix("lemon")).not.toStrictEqual({ flavor: "lemon" });
  });
});
```

### 예외 처리 검사

#### `.toThrow(error?)` \*\*\*

- 함수 호출 시 예외가 발생하는지 확인합니다.

```javascript
test("throws on octopus", () => {
  expect(() => {
    drinkFlavor("octopus");
  }).toThrow();
});
```

#### `.toThrowErrorMatchingSnapshot(hint?)`

- 함수가 호출될 때 발생하는 예외가 최신 스냅샷과 일치하는지 확인합니다.

```javascript
test("throws on octopus", () => {
  function drinkOctopus() {
    drinkFlavor("octopus");
  }

  expect(drinkOctopus).toThrowErrorMatchingSnapshot();
});
```

#### `.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)`

- 함수가 호출될 때 발생하는 예외가 인라인 스냅샷과 일치하는지 확인합니다.

## 비대칭 Matchers

Jest의 비대칭 Matchers를 사용하면 테스트를 더 다양하고 유연하게 작성할 수 있습니다. 이들 Matchers는 특정 값이나 객체의 구조에 국한되지 않고, 더 넓은 범위의 조건을 테스트할 수 있게 해줍니다.

### `expect.anything()`

- `null`이나 `undefined`를 제외한 모든 것과 일치합니다.

```javascript
test("map calls its argument with a non-null argument", () => {
  const mock = jest.fn();
  [1].map((x) => mock(x));
  expect(mock).toHaveBeenCalledWith(expect.anything());
});
```

### `expect.any(constructor)`

- 주어진 생성자로 생성된 모든 인스턴스나, 지정된 타입의 원시 값과 일치합니다.

```javascript
class Cat {}
test("randocall calls its callback with a class instance", () => {
  const mock = jest.fn();
  getCat(mock);
  expect(mock).toHaveBeenCalledWith(expect.any(Cat));
});

test("randocall calls its callback with a number", () => {
  const mock = jest.fn();
  randocall(mock);
  expect(mock).toHaveBeenCalledWith(expect.any(Number));
});
```

### `expect.arrayContaining(array)`

- 받은 배열이 기대하는 배열의 모든 요소를 포함하는지 확인합니다. 즉, 기대하는 배열이 받은 배열의 부분집합인 경우 일치합니다.

```javascript
describe("arrayContaining", () => {
  const expected = ["Alice", "Bob"];
  it("matches even if received contains additional elements", () => {
    expect(["Alice", "Bob", "Eve"]).toEqual(expect.arrayContaining(expected));
  });
});
```

### `expect.not.arrayContaining(array)`

- `expect.arrayContaining`의 반대로, 받은 배열이 기대하는 배열의 모든 요소를 포함하지 않는 경우 일치합니다.

```javascript
describe("not.arrayContaining", () => {
  const expected = ["Samantha"];
  it("matches if the actual array does not contain the expected elements", () => {
    expect(["Alice", "Bob", "Eve"]).toEqual(
      expect.not.arrayContaining(expected)
    );
  });
});
```

### `expect.closeTo(number, numDigits?)`

- 객체의 속성이나 배열 요소로 있는 부동 소수점 수를 비교할 때 유용합니다.

```javascript
test("compare float in object properties", () => {
  expect({ title: "0.1 + 0.2", sum: 0.1 + 0.2 }).toEqual({
    title: "0.1 + 0.2",
    sum: expect.closeTo(0.3, 5),
  });
});
```

### `expect.objectContaining(object)`

- 받은 객체가 기대하는 객체의 속성을 재귀적으로 포함하는지 확인합니다.

```javascript
test("onPress gets called with the right thing", () => {
  const onPress = jest.fn();
  simulatePresses(onPress);
  expect(onPress).toHaveBeenCalledWith(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    })
  );
});
```

### `expect.not.objectContaining(object)`

- 받은 객체가 기대하는 객체의 속성을 재귀적으로 포함하지 않는 경우 일치합니다.

```javascript
describe("not.objectContaining", () => {
  const expected = { foo: "bar" };
  it("matches if the actual object does not contain expected key: value pairs", () => {
    expect({ bar: "baz" }).toEqual(expect.not.objectContaining(expected));
  });
});
```

### `expect.stringContaining(string)` 및 `expect.not.stringContaining(string)`

- 받은 문자열이 기대하는 문자열을 포함하는지 혹은 포함하지 않는지 확인합니다.

```javascript
describe("not.stringContaining", () => {
  const expected = "Hello world!";
  it("matches if the received value does not contain the expected substring", () => {
    expect("How are you?").toEqual(expect.not.stringContaining(expected));
  });
});
```

### `expect.stringMatching(string | regexp)` 및 `expect.not.stringMatching(string | regexp)`

- 받은 문자열이 기대하는 문자열이나 정규 표현식과 일치하는지 혹은 일치하지 않는지 확인합니다.

```javascript
describe("stringMatching in arrayContaining", () => {
  const expected = [
    expect.stringMatching(/^Alic/),
    expect.stringMatching(/^[BR]ob/),
  ];
  it("matches even if received contains additional elements", () => {
    expect(["Alicia", "Roberto", "Evelina"]).toEqual(
      expect.arrayContaining(expected)
    );
  });
});
```
