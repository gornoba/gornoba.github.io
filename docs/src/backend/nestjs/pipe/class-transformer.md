# Class Transformer in NestJS

[class transformer](https://github.com/typestack/class-transformer?tab=readme-ov-file#deserialize-and-deserializearray)

## Class Transformer란?

NestJS에서 `class-transformer`는 일반 자바스크립트 객체와 클래스 인스턴스 간의 변환을 용이하게 해주는 라이브러리입니다. 특히, DTOs(Data Transfer Objects)와 엔티티 모델 간의 변환에 유용하며, 응답 객체의 직렬화와 역직렬화 과정에서 더 세밀한 제어를 가능하게 합니다.

## NestJS에서의 적용

### DTO 변환

`plainToClass` 메소드를 사용하여 클라이언트로부터 받은 일반 객체를 DTO 클래스 인스턴스로 변환합니다. 이는 데이터 유효성 검사 및 타입 변환 과정에서 유용합니다.

```typescript
import { plainToClass } from "class-transformer";
import { CreateUserDto } from "./dto/create-user.dto";
import { Body, Post, Controller } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Post()
  createUser(@Body() body: any) {
    const createUserDto = plainToClass(CreateUserDto, body);
    // DTO 인스턴스를 사용한 로직 처리
  }
}
```

### 응답 객체 변환

classToPlain 메소드와 @Exclude, @Expose 데코레이터를 활용하여 클라이언트에 보낼 응답 객체의 속성을 제어할 수 있습니다. 비밀번호 같은 민감한 정보를 응답에서 제외하거나, 특정 필드의 이름을 변경할 때 유용합니다.

```typescript
import { classToPlain, Exclude, Expose } from "class-transformer";

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

// 사용 예시
const userDto = new UserResponseDto(user);
return classToPlain(userDto);
```

#### class 전역사용

```typescript
import { Expose, Exclude, Transform } from "class-transformer";

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ value }) => `${value}님`)
  name: string;

  // `password` 필드는 @Exclude 데코레이터로 인해 응답에서 제외됩니다.
  password: string;
}
```

### 중첩된 객체 다루기

@Type 데코레이터를 사용하여 DTO 내의 중첩된 객체를 처리합니다. 복잡한 객체 구조에서 중첩된 클래스 인스턴스의 정확한 변환을 보장합니다.

```typescript
import { Type } from "class-transformer";

export class UserProfileDto {
  id: number;
  username: string;

  @Type(() => AddressDto)
  address: AddressDto;
}

export class AddressDto {
  street: string;
  city: string;
}
```

### @Transform 데코레이터 사용하기

@Transform 데코레이터는 특정 필드의 값을 변환할 때 사용됩니다. 이는 데이터를 API로부터 받아올 때나 API에 데이터를 보낼 때 필요한 맞춤 변환 로직을 정의하는 데 유용합니다. 예를 들어, 날짜 필드를 Date 객체로 변환하거나, 숫자 필드를 특정 형식으로 포맷팅할 수 있습니다.

```typescript
import { Transform } from "class-transformer";

export class UserDto {
  id: number;

  @Transform(({ value }) => value.toUpperCase(), { toClassOnly: true })
  name: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  birthday: Date;
}
```

class-transformer는 NestJS 애플리케이션에서 데이터 처리를 간소화하고, 타입 안정성을 제공하며, 응답 데이터를 세밀하게 제어할 수 있게 해줍니다. 이를 통해 개발자는 데이터 변환 로직을 보다 간결하고 효율적으로 구현할 수 있습니다.
