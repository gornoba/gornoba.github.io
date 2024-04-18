# Testing

## Test-Driven Development (TDD)

Test-Driven Development (TDD)는 소프트웨어 개발 프로세스의 일종으로, 개발자가 실제 코드를 작성하기 전에 특정 기능을 검증하는 자동화된 테스트 케이스를 먼저 작성하는 방식입니다. TDD의 기본 순서는 "Red-Green-Refactor"로 알려져 있습니다.

### 기본순서

Red (빨간색 단계): 개발자는 새로운 기능에 대한 테스트 케이스를 작성합니다. 이 단계에서 테스트는 실패합니다(빨간색) 왜냐하면 해당 기능을 구현하는 코드가 아직 작성되지 않았기 때문입니다.
Green (녹색 단계): 테스트를 통과할 수 있을 만큼 최소한의 코드만 작성합니다. 이 단계의 목표는 테스트를 빠르게 통과하는 것이며, 코드의 품질이나 구조는 중요하지 않습니다.
Refactor (리팩토링 단계): 코드가 테스트를 통과한 후, 개발자는 코드의 품질을 개선하고 중복을 제거하며, 읽기 쉽고 유지 관리하기 쉬운 코드로 만들기 위해 리팩토링을 진행합니다. 리팩토링은 기존의 테스트 케이스를 통과해야 합니다.

### TDD의 주요 장점

개발 초기에 버그 발견: 테스트를 먼저 작성함으로써 초기 단계에서 문제를 발견하고 수정할 수 있습니다.
설계 개선: 테스트를 먼저 작성하면 좀 더 명확하고 관리하기 쉬운 코드를 설계하는 데 도움이 됩니다.
리팩토링의 안전성: 이미 테스트 케이스가 작성되어 있기 때문에 코드를 리팩토링할 때 안전하게 변경할 수 있습니다.
문서화의 역할: 테스트 케이스 자체가 코드의 사용 방법을 문서화하는 역할을 하며, 어떤 기능이 구현되었는지 명확하게 할 수 있습니다.

## NestJs에서의 테스트

[Github Link](https://github.com/gornoba/nestjs-describe/tree/ecdec22e2f7d5796934d72783c1954ee821ce9ea)  
NestJs는 유닛테스트와 e2e 테스트를 모두 지원합니다.  
개인적으로는 e2e의 경우는 포스트맨, swagger와 같은 좋은 툴이 많아서 그것을 사용하고 있습니다.  
여기서는 유닛테스트를 해보도록 하겠습니다.

### NestJs Testing 경로문제

https://velog.io/@yullivan/NestJS-Testing-%EA%B2%BD%EB%A1%9C-%EB%AC%B8%EC%A0%9C

### cats.service.spec.ts

cats.service를 테스트 해보도록 하겠습니다.  
cats service는 cats repository를 주입받았습니다.  
유닛테스트는 독립적으로 실행되야함으로 mock을 만듭니다.<br/><br/>
제가 생각하는 순서는 이렇습니다.

1. 의존성을 파악하과 관련된 mock을 생성합니다.
2. moduleRef를 만들고 테스트이외의 의존성은 mock과 연결합니다.
3. method 별로 describe로 구분합니다.
4. method를 실행하고 하위로 method 안에서 실행들을 테스트합니다.

#### `__mocks__`

해당 repository는 자주 사용될 수 있으니 `__mocks__` 폴더를 만들어 cat.repository와 같은 이름으로 파일을 만듭니다.

```typescript
import { catsStub, createCatStub } from "src/cats/dto/cats.dto";

export const CatsRepository = {
  find: jest.fn().mockResolvedValue([catsStub()]),
  upsert: jest.fn().mockReturnValue([catsStub()]),
  delete: jest.fn().mockReturnValue(catsStub()),
  createQueryBuilder: jest.fn(),
};
```

데이터는 일관적이기 위해서 dto 안에 stub으로 몇개 만들어 두었습니다.

```typescript
export const createCatStub = (): CreateCatDto => ({
  name: "Whiskers",
  age: 5,
  breed: "Siames",
});

export const updateCatStub = (): UpdateCatDto => ({
  breed: "foo",
});

export const catsStub = (): CatsDto => ({
  id: 1,
  name: "Whiskers",
  age: 5,
  breed: "Siames",
});
```

### 코드작성

```typescript
import { CatsRepository } from "src/db/repositories/cat.repository";
import { CatsService } from "../cats.service";
import { Test } from "@nestjs/testing";
import { CatsEntity } from "src/db/entities/cat.entity";
import { catsStub, createCatStub } from "../dto/cats.dto";

// mock import
jest.mock("src/db/repositories/cat.repository");

describe("CatsService", () => {
  let catsService: CatsService;
  let catsRepository: CatsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CatsService,
        // 의존성 있는 것을 mock을 연결
        {
          provide: CatsRepository,
          useValue: CatsRepository,
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsRepository = moduleRef.get<CatsRepository>(CatsRepository);
    jest.clearAllMocks();
  });

  describe("create", () => {
    // method 별로 구분하여 실행
    describe("when create is called", () => {
      let cat: CatsEntity[] | CatsEntity;

      beforeEach(async () => {
        cat = await catsService.create(createCatStub());
      });

      test("catsRepository.upsert 호출여부 확인", () => {
        expect(catsRepository.upsert).toHaveBeenCalled();
      });

      test("catsRepository.upsert 호출시 CatsEntity, [cat] 전달 확인", () => {
        expect(catsRepository.upsert).toHaveBeenCalledWith(CatsEntity, [
          createCatStub(),
        ]);
      });

      test("cat 반환값 확인", () => {
        expect(cat).toEqual([{ id: expect.any(Number), ...createCatStub() }]);
      });
    });
  });

  describe("findOne", () => {
    describe("when findOne is called", () => {
      let cat: CatsEntity;

      beforeEach(async () => {
        cat = await catsService.findOne(1);
      });

      test("catsRepository.find 호출여부 확인", () => {
        expect(catsRepository.find).toHaveBeenCalled();
      });

      test("catsRepository.find 호출시 CatsEntity, { where: { id } } 전달 확인", () => {
        expect(catsRepository.find).toHaveBeenCalledWith(CatsEntity, {
          where: { id: 1 },
        });
      });

      test("cat 반환값 확인", () => {
        expect(cat).toContainEqual(catsStub());
      });
    });
  });

  describe("findAll", () => {
    describe("when findAll is called", () => {
      let cats: CatsEntity[];

      beforeEach(async () => {
        cats = await catsService.findAll();
      });

      test("catsRepository.find 호출여부 확인", () => {
        expect(catsRepository.find).toHaveBeenCalled();
      });

      test("catsRepository.find 호출시 CatsEntity 전달 확인", () => {
        expect(catsRepository.find).toHaveBeenCalledWith(CatsEntity);
      });

      test("cats 반환값 확인", () => {
        expect(cats).toEqual([catsStub()]);
      });
    });
  });
});
```

## auto mock

https://velog.io/@tstunas3/Nestjs-%EC%9C%A0%EB%8B%9B-%ED%85%8C%EC%8A%A4%ED%8A%B8-AutoMocking
