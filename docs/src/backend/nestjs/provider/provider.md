# NestJS의 Providers

## 기본 개념

- **Provider**는 다양한 기본 Nest 클래스(서비스, 레포지토리, 팩토리, 헬퍼 등)가 될 수 있습니다.
- Provider는 객체들이 서로 다양한 관계를 맺을 수 있게 하며, Nest 런타임 시스템에 의해 대부분의 "연결 작업"이 처리됩니다.

## 서비스 생성

이제 서비스를 만드니 컨트롤러도 정리해봅시다.
github에 가보시면 정리되어 있는 controller를 볼 수 있습니다.

```typescript
import { Injectable } from "@nestjs/common";
import { CatsDto, CreateCatDto, UpdateCatDto } from "./dto/cats.dto";

@Injectable()
export class CatsService {
  private readonly cats: CatsDto[] = [];

  create(cat: CreateCatDto): CatsDto {
    const total = this.cats.length;

    const cats = new CatsDto({ id: total + 1, ...cat });
    this.cats.push(cats);

    return cats;
  }

  createMany(cats: CreateCatDto[]): CatsDto[] {
    const returnCats: CatsDto[] = [];

    for (const cat of cats) {
      const total = this.cats.length;

      const newCat = new CatsDto({ id: total + 1, ...cat });
      returnCats.push(newCat);
    }
    this.cats.push(...returnCats);

    return returnCats;
  }

  findAll(): CatsDto[] {
    return this.cats;
  }

  findOne(id: number): CatsDto {
    return this.cats.find((cat) => cat.id === id);
  }

  update(id: number, cat: UpdateCatDto): CatsDto {
    const index = this.cats.findIndex((cat) => cat.id === id);
    this.cats[index] = new CatsDto(Object.assign(this.cats[index], cat));

    return this.cats[index];
  }

  remove(id: number): CatsDto {
    const index = this.cats.findIndex((cat) => cat.id === id);
    const cat = this.cats[index];
    this.cats.splice(index, 1);

    return cat;
  }
}
```

- 위의 예시는 `CatsService`를 나타냅니다. 이는 데이터 저장 및 검색을 담당하는 간단한 클래스입니다.
- `@Injectable()` 데코레이터는 Nest의 IoC(제어의 역전) 컨테이너가 이 클래스를 관리할 수 있음을 선언합니다.

## Dependency injection

- Nest는 의존성 주입 패턴을 기반으로 구축되었습니다.
- TypeScript를 사용함으로써, 의존성은 타입에 의해 자동으로 해결됩니다.

```typescript
constructor(private readonly catsService: CatsService) {}
```

## Scopes

- 공급자는 일반적으로 애플리케이션 생명주기와 동기화된 수명("scope")을 가집니다.
- 애플리케이션이 시작될 때 모든 의존성이 해결되어야 하며, 따라서 모든 공급자가 인스턴스화되어야 합니다.
- [NestJs Scopes](/backend/nestjs/fundamentals/injection-scope)

## Custom Providers

- Nest는 공급자 간의 관계를 해결하는 내장 IoC 컨테이너를 가지고 있습니다.
- 공급자를 정의하는 몇 가지 방법이 있으며, 평범한 값, 클래스 및 비동기 또는 동기 팩토리를 사용할 수 있습니다.
- [NestJs Custom Provider](/backend/nestjs/fundamentals/custom-providers)

## Optional Providers

- 데코레이터는 의존성 주입 시 해당 서비스가 반드시 필요하지 않은 경우에 사용됩니다. 이는 모듈에서 해당 서비스를 제공하지 않고, 해당 서비스를 주입할 수 없는 상황에서 사용될 수 있습니다.
- `@Optional()` 데코레이터를 사용해 의존성이 선택적임을 나타냅니다.

```typescript
import { Injectable, Optional, Inject } from "@nestjs/common";

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject("HTTP_OPTIONS") private httpClient: T) {}
}
```

## Property-based Injection

- 생성자를 통해 주입되는 것을 생성자 기반 주입이라고 합니다. 특정 상황에서는 속성 기반 주입이 유용할 수 있습니다.
- 속성에 `@Inject()` 데코레이터를 사용하여 의존성을 주입할 수 있습니다.

```typescript
import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class HttpService<T> {
  @Inject("HTTP_OPTIONS")
  private readonly httpClient: T;
}
```

## provider Registration

- 공급자(CatsService)와 해당 서비스의 소비자(CatsController)를 정의한 후, Nest가 주입을 수행할 수 있도록 모듈 파일에 서비스를 등록해야 합니다.

```typescript
import { Module } from "@nestjs/common";
import { CatsController } from "./cats/cats.controller";
import { CatsService } from "./cats/cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```
