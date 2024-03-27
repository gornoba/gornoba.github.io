# Swagger의 사용

## DTO

[Github Link](https://github.com/gornoba/nestjs-describe/tree/12b74a37e27fb49bb2cecf0a30041208d41873ef)

```typescript
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
```

이전에 만들어 놓았던 dto에서 swagger를 사용해보도록 하겠습니다.

```typescript
export class CreateCatDto {
  @ApiProperty({
    description: "The name of a cat",
    example: "Kitty",
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "The age of a cat",
    example: 3,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    description: "The breed of a cat",
    example: "Scottish Fold",
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  breed: string;
}
```

이렇게 만들어놓으면 아래와 같이문서가 바뀌었을 겁니다.
![alt](/swgger-user-1.png)

create를 만들었으니 update도 똑같이 하면 되겠죠?<br/>
그런데 코드가 중복되는 것을 볼 수 있습니다.<br/>
코드의 중복을 줄이기 위해 코드를 좀 변경해보도록 하겠습니다.

```typescript
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCatDto {
  @ApiProperty({
    description: "The name of a cat",
    example: "Kitty",
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The age of a cat",
    example: 3,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: "The breed of a cat",
    example: "Scottish Fold",
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  breed: string;
}

export class UpdateCatDto extends PartialType(CreateCatDto) {}
```

[NestJs OpenApi Mapped Types](https://docs.nestjs.com/openapi/mapped-types)<br/>
parialtype은 validate를 모두 optional로 변경해 줍니다.
이외에도 골라쓰는 PickType, 원하는건 뺴는 OmiType, 두개를 합치는 IntersectionType 있습니다.
