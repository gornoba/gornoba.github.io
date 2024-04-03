# Controllers

[NestJs Controller](https://docs.nestjs.com/controllers)<br/>
컨트롤러는 requset(요청)를 처리하고 response(응답) 합니다.
자주 사용하는 것을 위주로 설명하겠습니다. 추가적인 내용이 필요하다면 공식 홈페이지를 살펴보세요.

![alt](https://docs.nestjs.com/assets/Controllers_1.png)

## 컨트롤러의 목적

- 특정 애플리케이션 요청을 받는 것입니다.
- 라우팅 메커니즘이 어떤 컨트롤러가 어떤 요청을 받을지 제어합니다.
- 각 컨트롤러는 여러 라우트를 가질 수 있으며, 서로 다른 라우트는 서로 다른 작업을 수행할 수 있습니다.

## 컨트롤러 생성

- 클래스와 데코레이터를 사용하여 기본 컨트롤러를 생성합니다.
- 데코레이터는 클래스에 필요한 메타데이터를 연결하고, Nest가 요청을 해당 컨트롤러에 연결하는 라우팅 맵을 생성할 수 있게 합니다.

### CLI 사용

- CRUD 컨트롤러를 빠르게 생성하기 위해 CLI의 CRUD 생성기를 사용할 수 있습니다: `nest g resource [name]`.

## Routing

- `@Controller()` 데코레이터를 사용하여 기본 컨트롤러를 정의합니다. 선택적으로 라우트 경로 접두사를 지정할 수 있습니다.
- 예를 들어, `/cats` 경로 하에 관련 라우트 집합을 그룹화할 수 있습니다.

## 응답하기

- Nest standard response를 사용할 경우는 그냥 `return`하면 됩니다.
- 만약 Nest standard response를 일부 유지하면서 express의 특정 기능을 이용해야 할 경우 response에 passthrough를 true로 설정
  1. 응답에 특정 헤더나 쿠키를 설정해야 하고, 이를 위해 라이브러리(예: Express)의 특정 메소드를 사용하고 싶을 때
  2. 응답을 조건부로 다르게 처리해야 하는 상황에서, 특정 조건에 따라 직접 응답을 조작하고자 할 때
  3. 큰 파일을 전송하거나, 데이터 스트리밍이 필요할 때
  4. 응답의 바디나 상태 코드뿐만 아니라, 응답의 스트림을 직접 조작하거나, 다양한 조건에 따라 동적으로 응답 형식을 변경해야 할 때

## CRUD 구현

### module과 controller 생성

```sh
nest g mo cats --no-spec
nest g co cats --no-spec
```

### CRUD 생성

```typescript
import { Controller, Get, Post, Put, Delete } from "@nestjs/common";

@Controller("cats")
export class CatsController {
  @Post()
  create() {
    return "This action adds a new cat";
  }

  @Get()
  findAll() {
    return `This action returns all cats`;
  }

  @Get(":id")
  findOne() {
    return `This action returns a cat`;
  }

  @Put(":id")
  update() {
    return `This action updates a cat`;
  }

  @Delete(":id")
  remove() {
    return `This action removes a cat`;
  }
}
```

이렇게 간단하게 CRUD를 구현한 Controller가 완성되었습니다.
