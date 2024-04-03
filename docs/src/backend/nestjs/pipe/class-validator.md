# Class Validator

## Validation messages

```typescript
import { MinLength, MaxLength } from "class-validator";

export class Post {
  @MinLength(10, {
    message: "Title is too short",
  })
  @MaxLength(50, {
    message: "Title is too long",
  })
  title: string;
}
```

## Validating arrays & set & map

```typescript
import { MinLength, MaxLength } from "class-validator";

export class PostArray {
  @MaxLength(20, {
    each: true,
  })
  tags: string[];
}

export class PostSet {
  @MaxLength(20, {
    each: true,
  })
  tags: Set<string>;
}

export class PostMap {
  @MaxLength(20, {
    each: true,
  })
  tags: Map<string, string>;
}
```

## Validating nested objects

중첩된 객체는 클래스의 인스턴스여야 하며, 그렇지 않으면 @ValidateNested가 어떤 클래스가 유효성 검사 대상인지 알지 못합니다.

```typescript
import { ValidateNested } from "class-validator";

export class Post {
  @ValidateNested()
  user: User;
}
```

## Validating promises

```typescript
import { ValidateNested, ValidatePromise, Min } from "class-validator";

export class Post {
  @Min(0)
  @ValidatePromise()
  userId: Promise<number>;
}

export class Post {
  @ValidateNested()
  @ValidatePromise()
  user: Promise<User>;
}
```

## Conditional validation

조건부 유효성 검사 데코레이터(@ValidateIf)는 제공된 조건 함수가 거짓을 반환할 때 프로퍼티의 유효성 검사기를 무시하는 데 사용할 수 있습니다.

```typescript
import { ValidateIf, IsNotEmpty } from "class-validator";

export class Post {
  otherProperty: string;

  @ValidateIf((o) => o.otherProperty === "value")
  @IsNotEmpty()
  example: string;
}
```

## valdation decorator

| 데코레이터                                                                     | 설명                                                                                                                                                            |
| :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `일반적인 유효성 검사 데코레이터`                                              |                                                                                                                                                                 |
| @IsDefined(value: any)                                                         | 값이 정의되었는지 확인합니다(!== 정의되지 않음, !== null). 이것은 SkipMissingProperties 옵션을 무시하는 유일한 데코레이터입니다.                                |
| @IsOptional()                                                                  | 주어진 값이 비어 있는지(=== null, === 정의되지 않음) 확인하고, 그렇다면 속성의 모든 유효성 검사기를 무시합니다.                                                 |
| @Equals(comparison: any)                                                       | 값이 ("===") 비교와 같은지 확인합니다.                                                                                                                          |
| @NotEquals(comparison: any)                                                    | 값이 같지 않은지 확인합니다("!==") 비교.                                                                                                                        |
| @IsEmpty()                                                                     | 주어진 값이 비어 있는지 확인합니다(=== '', === null, === 정의되지 않음).                                                                                        |
| @IsNotEmpty()                                                                  | 주어진 값이 비어 있지 않은지 확인합니다(!== '', !== null, !== 정의되지 않음).                                                                                   |
| @IsIn(values: any[])                                                           | 값이 허용되는 값의 배열에 있는지 확인합니다.                                                                                                                    |
| @IsNotIn(values: any[])                                                        | 값이 허용되지 않는 값의 배열에 없는지 확인합니다.                                                                                                               |
| `유형 검증 데코레이터`                                                         |                                                                                                                                                                 |
| @IsBoolean()                                                                   | 값이 부울인지 확인합니다.                                                                                                                                       |
| @IsDate()                                                                      | 값이 날짜인지 확인합니다.                                                                                                                                       |
| @IsString()                                                                    | 값이 문자열인지 확인합니다.                                                                                                                                     |
| @IsNumber(options: IsNumberOptions)                                            | 값이 숫자인지 확인합니다.                                                                                                                                       |
| @IsInt()                                                                       | 값이 정수인지 확인합니다.                                                                                                                                       |
| @IsArray()                                                                     | 값이 배열인지 확인합니다.                                                                                                                                       |
| @IsEnum(entity: object)                                                        | 값이 유효한 열거형인지 확인합니다.                                                                                                                              |
| `숫자 검증 데코레이터`                                                         |                                                                                                                                                                 |
| @IsDivisibleBy(num: number)                                                    | 값이 다른 숫자로 나누어지는 숫자인지 확인합니다.                                                                                                                |
| @IsPositive()                                                                  | 값이 0보다 큰 양수인지 확인합니다.                                                                                                                              |
| @IsNegative()                                                                  | 값이 0보다 작은 음수인지 확인합니다.                                                                                                                            |
| @Min(min: number)                                                              | 주어진 숫자가 주어진 숫자보다 크거나 같은지 확인합니다.                                                                                                         |
| @Max(max: number)                                                              | 주어진 숫자가 주어진 숫자보다 작거나 같은지 확인합니다.                                                                                                         |
| `날짜 유효성 검사 데코레이터`                                                  |                                                                                                                                                                 |
| @MinDate(date: Date \| (() => Date))                                           | 값이 지정된 날짜 이후의 날짜인지 확인합니다.                                                                                                                    |
| @MaxDate(date: Date \| (() => Date))                                           | 값이 지정된 날짜 이전의 날짜인지 확인합니다.                                                                                                                    |
| `문자열 유형 유효성 검사 데코레이터`                                           |                                                                                                                                                                 |
| @IsBooleanString()                                                             | 문자열이 부울인지 확인합니다(예: "true", "false" 또는 "1", "0").                                                                                                |
| @IsDateString()                                                                | Alias for @IsISO8601()                                                                                                                                          |
| @IsNumberString(options?: IsNumericOptions)                                    | 문자열이 숫자인지 확인합니다.                                                                                                                                   |
| `문자열 검증 데코레이터`                                                       |                                                                                                                                                                 |
| @Contains(seed: string)                                                        | 문자열에 seed가 포함되어 있는지 확인합니다.                                                                                                                     |
| @NotContains(seed: string)                                                     | 문자열에 seed가 포함되어 있지 않은지 확인합니다.                                                                                                                |
| @IsAlpha()                                                                     | 문자열에 문자(a-zA-Z)만 포함되어 있는지 확인합니다.                                                                                                             |
| @IsAlphanumeric()                                                              | 문자열에 문자와 숫자만 포함되어 있는지 확인합니다.                                                                                                              |
| @IsDecimal(options?: IsDecimalOptions)                                         | 문자열이 유효한 십진수 값인지 확인합니다. 기본 IsDecimalOptions는 force_decimal=False, decimal_digits: '1,',locale: 'en-US'                                     |
| @IsAscii()                                                                     | 문자열에 ASCII 문자만 포함되어 있는지 확인합니다.                                                                                                               |
| @IsBase32()                                                                    | 문자열이 base32로 인코딩되었는지 확인합니다.                                                                                                                    |
| @IsBase58()                                                                    | 문자열이 base58로 인코딩되었는지 확인합니다.                                                                                                                    |
| @IsBase64(options?: IsBase64Options)                                           | 문자열이 base64로 인코딩되었는지 확인합니다.                                                                                                                    |
| @IsIBAN()                                                                      | 문자열이 IBAN(국제 은행 계좌 번호)인지 확인합니다.                                                                                                              |
| @IsBIC()                                                                       | 문자열이 BIC(은행 식별 코드) 또는 SWIFT 코드인지 확인합니다.                                                                                                    |
| @IsByteLength(min: number, max?: number)                                       | 문자열의 길이(바이트)가 범위에 속하는지 확인합니다.                                                                                                             |
| @IsCreditCard()                                                                | 문자열이 신용카드인지 확인합니다.                                                                                                                               |
| @IsCurrency(options?: IsCurrencyOptions)                                       | 문자열이 유효한 통화 금액인지 확인합니다.                                                                                                                       |
| @IsISO4217CurrencyCode()                                                       | 문자열이 ISO 4217 통화 코드인지 확인합니다.                                                                                                                     |
| @IsEthereumAddress()                                                           | 기본 정규식을 사용하여 문자열이 이더리움 주소인지 확인합니다. 주소 체크섬의 유효성을 검사하지 않습니다.                                                         |
| @IsBtcAddress()                                                                | 문자열이 유효한 BTC 주소인지 확인합니다.                                                                                                                        |
| @IsDataURI()                                                                   | 문자열이 데이터 URI 형식인지 확인합니다.                                                                                                                        |
| @IsEmail(options?: IsEmailOptions)                                             | 문자열이 이메일인지 확인합니다.                                                                                                                                 |
| @IsFQDN(options?: IsFQDNOptions)                                               | 문자열이 정규화된 도메인 이름(예: domain.com)인지 확인합니다.                                                                                                   |
| @IsFullWidth()                                                                 | 문자열에 전각문자가 포함되어 있는지 확인합니다.                                                                                                                 |
| @IsHalfWidth()                                                                 | 문자열에 반각문자가 포함되어 있는지 확인합니다.                                                                                                                 |
| @IsVariableWidth()                                                             | 문자열에 전각 문자와 반각 문자가 혼합되어 있는지 확인합니다.                                                                                                    |
| @IsHexColor()                                                                  | 문자열이 16진수 색상인지 확인합니다.                                                                                                                            |
| @IsHSL()                                                                       | 문자열이 CSS 색상 레벨 4 사양을 기반으로 하는 HSL 색상인지 확인합니다 .                                                                                         |
| @IsRgbColor(options?: IsRgbOptions)                                            | 문자열이 rgb 또는 rgba 색상인지 확인합니다.                                                                                                                     |
| @IsIdentityCard(locale?: string)                                               | 문자열이 유효한 신분증 코드인지 확인합니다.                                                                                                                     |
| @IsPassportNumber(countryCode?: string)                                        | 문자열이 특정 국가 코드와 관련된 유효한 여권 번호인지 확인합니다.                                                                                               |
| @IsPostalCode(locale?: string)                                                 | 문자열이 우편번호인지 확인합니다.                                                                                                                               |
| @IsHexadecimal()                                                               | 문자열이 16진수인지 확인합니다.                                                                                                                                 |
| @IsOctal()                                                                     | 문자열이 8진수인지 확인합니다.                                                                                                                                  |
| @IsMACAddress(options?: IsMACAddressOptions)                                   | 문자열이 MAC 주소인지 확인합니다.                                                                                                                               |
| @IsIP(version?: \|"4"\|"6")                                                    | 문자열이 IP(버전 4 또는 6)인지 확인합니다.                                                                                                                      |
| @IsPort()                                                                      | 문자열이 유효한 포트 번호인지 확인합니다.                                                                                                                       |
| @IsISBN(version?: \|"10"\|"13") 문자열이 ISBN(버전 10 또는 13)인지 확인합니다. |
| @IsEAN()                                                                       | 문자열이 EAN(유럽 물품 번호)인지 확인합니다.                                                                                                                    |
| @IsISIN()                                                                      | 문자열이 ISIN(주식/증권 식별자)인지 확인합니다.                                                                                                                 |
| @IsISO8601(options?: IsISO\|8601Options)                                       | 문자열이 유효한 ISO 8601 날짜 형식인지 확인합니다. 유효한 날짜를 추가로 확인하려면 strict = true 옵션을 사용하세요.                                             |
| @IsJSON()                                                                      | 문자열이 유효한 JSON인지 확인합니다.                                                                                                                            |
| @IsJWT()                                                                       | 문자열이 유효한 JWT인지 확인합니다.                                                                                                                             |
| @IsObject()                                                                    | 객체가 유효한 객체인지 확인합니다(null, 함수, 배열은 false를 반환함).                                                                                           |
| @IsNotEmptyObject()                                                            | 객체가 비어 있지 않은지 확인합니다.                                                                                                                             |
| @IsLowercase()                                                                 | 문자열이 소문자인지 확인합니다.                                                                                                                                 |
| @IsLatLong()                                                                   | 문자열이 위도, 경도 형식의 유효한 위도-경도 좌표인지 확인합니다.                                                                                                |
| @IsLatitude()                                                                  | 문자열이나 숫자가 유효한 위도 좌표인지 확인합니다.                                                                                                              |
| @IsLongitude()                                                                 | 문자열이나 숫자가 유효한 경도 좌표인지 확인합니다.                                                                                                              |
| @IsMobilePhone(locale: string)                                                 | 문자열이 휴대폰 번호인지 확인합니다.                                                                                                                            |
| @IsISO31661Alpha2()                                                            | 문자열이 유효한 ISO 3166-1 alpha-2 공식 할당 국가 코드인지 확인합니다.                                                                                          |
| @IsISO31661Alpha3()                                                            | 문자열이 유효한 ISO 3166-1 alpha-3 공식 할당 국가 코드인지 확인합니다.                                                                                          |
| @IsLocale()                                                                    | 문자열이 로케일인지 확인합니다.                                                                                                                                 |
| @IsPhoneNumber(region: string) libphonenumber                                  | -js를 사용하여 문자열이 유효한 전화번호인지 확인합니다.                                                                                                         |
| @IsMongoId()                                                                   | 문자열이 MongoDB ObjectId의 유효한 16진수 인코딩 표현인지 확인합니다.                                                                                           |
| @IsMultibyte()                                                                 | 문자열에 하나 이상의 멀티바이트 문자가 포함되어 있는지 확인합니다.                                                                                              |
| @IsNumberString(options?: IsNumericOptions)                                    | 문자열이 숫자인지 확인합니다.                                                                                                                                   |
| @IsSurrogatePair()                                                             | 문자열에 서로게이트 쌍 문자가 포함되어 있는지 확인합니다.                                                                                                       |
| @IsTaxId()                                                                     | 문자열이 유효한 세금 ID인지 확인합니다. 기본 로케일은 입니다 en-US.                                                                                             |
| @IsUrl(options?: IsURLOptions)                                                 | 문자열이 URL인지 확인합니다.                                                                                                                                    |
| @IsMagnetURI()                                                                 | 문자열이 자석 URI 형식 인지 확인합니다 .                                                                                                                        |
| @IsUUID(version?: UUIDVersion)                                                 | 문자열이 UUID(버전 3, 4, 5 또는 all )인지 확인합니다.                                                                                                           |
| @IsFirebasePushId()                                                            | 문자열이 Firebase 푸시 ID 인지 확인합니다.                                                                                                                      |
| @IsUppercase()                                                                 | 문자열이 대문자인지 확인합니다.                                                                                                                                 |
| @Length(min: number                                                            | , max?: number) 문자열의 길이가 범위에 속하는지 확인합니다.                                                                                                     |
| @MinLength(min: number)                                                        | 문자열의 길이가 주어진 숫자보다 작지 않은지 확인합니다.                                                                                                         |
| @MaxLength(max: number)                                                        | 문자열의 길이가 주어진 숫자보다 크지 않은지 확인합니다.                                                                                                         |
| @Matches(pattern: RegExp\|, modifiers?: string)                                | 문자열이 패턴과 일치하는지 확인합니다. 일치('foo', /foo/i) 또는 일치('foo', 'foo', 'i')입니다.                                                                  |
| @IsMilitaryTime()                                                              | 문자열이 HH:MM 형식의 유효한 군사 시간 표현인지 확인합니다.                                                                                                     |
| @IsTimeZone()                                                                  | 문자열이 유효한 IANA 시간대를 나타내는지 확인합니다.                                                                                                            |
| @IsHash(algorithm: string)                                                     | 문자열이 해시인지 확인합니다. 다음 유형이 지원됩니다 : md4, md5, sha1, sha256, sha384, sha512, ripemd128, ripemd160, tiger128, tiger160, tiger192, crc32.crc32b |
| @IsMimeType()                                                                  | 문자열이 유효한 MIME 유형 형식 과 일치하는지 확인합니다.                                                                                                        |
| @IsSemVer()                                                                    | 문자열이 SemVer(의미적 버전 관리 사양)인지 확인합니다.                                                                                                          |
| @IsISSN(options?: IsISSNOptions)                                               | 문자열이 ISSN인지 확인합니다.                                                                                                                                   |
| @IsISRC()                                                                      | 문자열이 ISRC 인지 확인합니다 .                                                                                                                                 |
| @IsRFC3339()                                                                   | 문자열이 유효한 RFC 3339 날짜인지 확인합니다.                                                                                                                   |
| @IsStrongPassword(options?: IsStrongPasswordOptions)                           | 문자열이 강력한 비밀번호인지 확인합니다.                                                                                                                        |
| `배열 검증 데코레이터`                                                         |                                                                                                                                                                 |
| @ArrayContains(values: any[])                                                  | 배열에 지정된 값 배열의 모든 값이 포함되어 있는지 확인합니다.                                                                                                   |
| @ArrayNotContains(values: any[])                                               | 배열에 지정된 값이 포함되어 있지 않은지 확인합니다.                                                                                                             |
| @ArrayNotEmpty()                                                               | 주어진 배열이 비어 있지 않은지 확인합니다.                                                                                                                      |
| @ArrayMinSize(min: number)                                                     | 배열의 길이가 지정된 숫자보다 크거나 같은지 확인합니다.                                                                                                         |
| @ArrayMaxSize(max: number)                                                     | 배열의 길이가 지정된 숫자보다 작거나 같은지 확인합니다.                                                                                                         |
| @ArrayUnique(identifier?: (o) => any)                                          | 모든 배열의 값이 고유한지 확인합니다. 객체 비교는 참조 기반입니다. 비교에 사용할 반환 값을 선택적 함수로 지정할 수 있습니다.                                    |
| `객체 검증 데코레이터`                                                         |                                                                                                                                                                 |
| @IsInstance(value: any)                                                        | 속성이 전달된 값의 인스턴스인지 확인합니다.                                                                                                                     |
| `기타 데코레이터`                                                              |                                                                                                                                                                 |
| @Allow()                                                                       | 다른 제약 조건이 지정되지 않은 경우 속성이 제거되는 것을 방지합니다.                                                                                            |
