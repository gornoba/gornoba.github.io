# Pipe

[NestJs Pipe](https://docs.nestjs.com/pipes)

## pipe의 사용목적

- lifecycle에서 controller 직전인 5번쨰에 사용되게 됩니다.
- pipe의 사용목적은 2가지 입니다.
  1. [validation](https://docs.nestjs.com/techniques/validation)
  2. [transform](https://docs.nestjs.com/techniques/serialization#exclude-properties)

## pipe의 사용

공식홈페이지에는 여러 사용방법이 나와 있는데 그 중에 dto와 데코레이터와 바인딩되는 방법을 사용할 예정입니다.<br/>
대부분은 dto를 이용하게 되는데 class-validator와 class-transform를 이용하게 됩니다.<br/>
NestJs에서 제공하는 ValidationPipe를 main.ts에 global로 설정하면 준비는 끝납니다.

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/77913eaf0a2f639effc9ab326b91f948e5d5a558)

1. 설치

```sh
npm i --save class-validator class-transformer
```

2. main.ts

```typescript
nestLib() {
  this.server.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 요청 데이터를 해당 타입으로 변환
      skipNullProperties: false, // null 값을 건너뛰지 않음
      skipMissingProperties: false, // 누락된 속성을 건너뛰지 않음
      skipUndefinedProperties: false, // 정의되지 않은 속성을 건너뛰지 않음
      forbidUnknownValues: false, // 알 수 없는 속성이 있는 경우 예외 발생
      whitelist: false, // 허용되지 않은 속성이 있는 경우 제거
      forbidNonWhitelisted: false, // 허용되지 않은 속성이 있는 경우 예외 발생
    }),
  );
}

async bootstrap() {
  this.policy();
  this.session();
  this.nestLib();
  await this.server.listen(this.port);
  this.url = await this.server.getUrl();
}
```

여러 옵션이 있지만 일단 주된 옵션을 기재해 놓았습니다.<br/>
원한다면 좀 더 상세히 설정이 가능합니다.

3. cats.dto.ts

```typescript
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  breed: string;
}

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  breed: string;
}
```

class validator는 여러가지 type의 validation을 지원합니다.<br/>
IsOptional은 만약 해당 key값이 있으면 validation을 하겠다는 것입니다.<br/>
이외에도 validationIf로 조건을 걸거나 nested로 array이나 object 안의 deep한 곳까지 validation이 가능합니다.

4. cats.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { CreateCatDto, UpdateCatDto } from "./dto/cats.dto";

@Controller("cats")
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return `This action adds a new cat ${createCatDto.name}`;
  }

  @Get()
  findAll() {
    return `This action returns all cats`;
  }

  @Get(":id")
  findOne(@Param("id", new ParseIntPipe()) id: number) {
    return `This action returns a cat ${id}`;
  }

  @Put(":id")
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateCatDto: UpdateCatDto
  ) {
    return `This action updates a cat ${id}`;
  }

  @Delete(":id")
  remove(@Param("id", new ParseIntPipe()) id: number) {
    return `This action removes a cat ${id}`;
  }
}
```

여기서는 param이 id 1개 임으로 간단하게 ParseIntPipe로 validation과 transform을 했지만<br/>
param의 객체가 커진다면 dto로 만들어 사용하는 것도 좋습니다.

5.  실행

postman 혹은 vscode의 thunder client를 이용하거나 cli에서 curl 명령어로<br/>
`http://localhost:3000/api/cats/1` 이렇게 get 요청을 보내면 <br/>
This action returns a cat 1 이렇게 return 됩니다.<br/><br/>
만약 `http://localhost:3000/api/cats/abc` 이렇게 보낸다면 아래와 같이 return 됩니다.<br/>

```json
{
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request",
  "statusCode": 400
}
```

Post로도 보내 봅시다. 아래와 같이 `http://localhost:3000/api/cats` 여기로 post 요청을 보내면..

```json
{
  "name": "시비시바",
  "age": 4,
  "breed": "다 잘먹어요"
}

return value: This action adds a new cat 시비시바
```

만약 breed를 뺴고 보내봅시다. 그럼 아래와 같이 return 됩니다.

```json
{
  "message": ["breed must be a string", "breed should not be empty"],
  "error": "Bad Request",
  "statusCode": 400
}
```
