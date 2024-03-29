# 환경변수

## 일반 텍스트 (Plain Text)

이 방식은 가장 단순하며, 환경 변수의 값을 직접 평문으로 입력합니다. 이는 비밀이 아닌 정보나 민감하지 않은 데이터에 적합합니다. 예를 들어, 애플리케이션의 실행 모드(개발 모드, 테스트 모드 등)를 지정하는 환경 변수에 사용할 수 있습니다.

### 주의사항

- 쉘 스크립트: 환경 변수를 쉘 스크립트에서 직접 참조할 때 $환경변수 형식을 사용합니다. 이는 대부분의 Unix/Linux 쉘 및 Windows의 Command Prompt와 PowerShell에서 유효합니다.
- 단일 따옴표와 이중 따옴표: 환경 변수를 문자열 내에서 사용할 때 이중 따옴표("`")를 사용해야 환경 변수가 올바르게 확장됩니다. 단일 따옴표('')를 사용하면, 환경 변수가 리터럴 문자열로 해석되어 변수 값이 아닌 변수 이름이 그대로 출력됩니다.
- 환경 변수의 존재 여부 확인: 스크립트를 작성할 때 특정 환경 변수가 설정되어 있지 않은 경우를 대비하여, 해당 변수가 설정되었는지 먼저 확인하는 로직을 포함하는 것이 좋습니다.

## Amazon EC2 Systems Manager (Parameter Store)

Parameter Store는 서버리스 애플리케이션, 데이터베이스 문자열, 비밀번호, 시스템 설정 등을 안전하게 저장하고 관리할 수 있는 서비스입니다. CodeBuild에서는 Parameter Store에 저장된 값을 환경 변수로 가져올 수 있습니다. 이 값은 빌드 시점에 동적으로 해석되며, 중요한 정보를 안전하게 관리할 수 있습니다. 예를 들어, 데이터베이스 연결 정보나 외부 서비스의 API 키 등을 Parameter Store에 저장하고, 이를 빌드 프로세스에서 사용할 수 있습니다.

### 유형

#### 문자열 (String)

- 사용 예: 단일 구성 값, 텍스트 데이터, 설정 등을 저장합니다.
- 키-값 예: KeyName = "/MyApp/Database/Endpoint", Value = "db.example.com"

#### 문자열 목록 (StringList)

- 사용 예: 여러 개의 텍스트 항목을 하나의 파라미터로 저장할 때 사용합니다. 각 항목은 쉼표로 구분됩니다.
- 키-값 예: KeyName = "/MyApp/Regions", Value = "us-east-1,eu-west-1,ap-northeast-2"

#### 보안 문자열 (SecureString)

- 사용 예: 비밀번호, API 키, 암호화 키 등과 같이 민감한 정보를 암호화하여 저장합니다. AWS KMS(Key Management Service) 키를 사용하여 값이 암호화됩니다.
- 키-값 예: KeyName = "/MyApp/Database/Password", Value = 암호화된 데이터 (사용자가 직접 볼 수 없음)

### codebuild 필요권한

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameters",
        "ssm:GetParameter",
        "ssm:DescribeParameters"
      ],
      "Resource": "*"
    }
  ]
}
```

### 예시

```yaml
version: 0.2

env:
  parameter-store:
    DB_PASSWORD: "/MyApp/DBPassword"
    SECRET_KEY: "/MyApp/SecretKey"

phases:
  build:
    commands:
      - echo "Using DB Password from Parameter Store"
      - echo "DB password is $DB_PASSWORD"
      - echo "Using Secret Key from Parameter Store"
      - echo "Secret key is $SECRET_KEY"
```

## AWS Secrets Manager

Secrets Manager는 민감한 정보를 안전하게 저장하고, 이를 애플리케이션에서 사용할 수 있도록 관리하는 서비스입니다. 이는 Parameter Store와 유사하지만, 비밀 회전, 비밀 관리 생명주기, 비밀에 대한 액세스 관리와 감사 로그 기능 등 추가적인 기능을 제공합니다. CodeBuild에서 Secrets Manager의 비밀을 환경 변수로 사용할 수 있으며, 이를 통해 데이터베이스 비밀번호, 서드파티 API 키, 인증 토큰 등을 안전하게 관리할 수 있습니다.

### 보안 암호 유형

다른유형의보안암호로 생성되어 key, value의 형태로 저장됨.

### codebuild 필요권한

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "secretsmanager:GetSecretValue",
      "Resource": [
        "arn:aws:secretsmanager:region:account-id:secret:MySecretName-*"
      ]
    }
  ]
}
```

### 예시

```yaml
version: 0.2

env:
  secrets-manager:
    MY_API_KEY: MySecretName:apiKey
    MY_OAUTH_TOKEN: MySecretName:oauthToken

phases:
  install:
    commands:
      - echo "Using secrets from Secrets Manager"
  build:
    commands:
      - echo "API Key: $MY_API_KEY"
      - echo "OAuth Token: $MY_OAUTH_TOKEN"
```
