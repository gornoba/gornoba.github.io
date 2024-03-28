# Kubernetes Deployment 소개

Deployment는 애플리케이션을 프로덕션 환경에 배포하는 데 필요한 다양한 기능을 제공합니다.

## Deployment의 주요 기능

- **다중 인스턴스 실행**: 애플리케이션의 여러 인스턴스를 동시에 실행하여 고가용성을 보장합니다.
- **롤링 업데이트**: 새로운 버전의 애플리케이션을 순차적으로 업데이트하여 사용자 접근에 미치는 영향을 최소화합니다.
- **롤백**: 최근에 수행된 변경 사항을 취소할 수 있는 기능을 제공합니다.
- **변경 일시 정지 및 재개**: 환경에 여러 변경 사항을 적용할 때 변경 사항을 일시적으로 정지했다가 모든 변경이 완료된 후에 재개할 수 있습니다.

## Deployment 생성 방법

Deployment 정의 파일을 만든 후 `kubectl create` 명령어를 사용하여 Deployment를 생성합니다. 정의 파일의 주요 구성 요소는 다음과 같습니다:

- **API 버전**: `apps/v1`
- **종류(Kind)**: `Deployment`
- **메타데이터(Metadata)**: Deployment의 이름 및 레이블 포함
- **사양(Spec)**: 템플릿, 복제본(replicas) 수, 셀렉터(selector) 포함

### 정의 파일 예시

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-container
          image: my-image
```

## 주요 명령어

| <center>명령어</center>         | <center>설명</center>                    |
| :------------------------------ | :--------------------------------------- |
| kubectl create -f [파일명] 정의 | 파일을 사용해 Deployment 생성            |
| kubectl get deployment          | 생성된 Deployment 목록 보기              |
| kubectl get rs                  | Deployment에 의해 생성된 ReplicaSet 보기 |
| kubectl get pods                | Deployment와 연관된 Pod 보기             |
| kubectl get all                 | 모든 Kubernetes 객체 보기                |

Deployment는 배포 과정을 관리하고, 롤링 업데이트, 롤백, 그리고 변경 사항의 일시 정지 및 재개와 같은 고급 기능을 통해 애플리케이션의 운영을 용이하게 합니다. 이러한 기능은 프로덕션 환경에서 애플리케이션을 안정적으로 운영하는 데 필수적입니다.

## Deployment 활용

Deployment는 Kubernetes에서 복잡한 배포 및 운영 과제를 간소화합니다. 다음은 Deployment를 효과적으로 활용하는 몇 가지 시나리오입니다:

### 롤링 업데이트

Deployment를 사용하면 애플리케이션의 새 버전을 점진적으로 배포할 수 있습니다. 이는 서비스 중단 없이 애플리케이션을 업데이트할 수 있게 해주며, 새 버전의 문제가 발생할 경우 쉽게 이전 버전으로 롤백할 수 있습니다.

### 롤백

Deployment는 이전 배포 상태로 쉽게 되돌릴 수 있는 롤백 기능을 제공합니다. 이는 실패한 업데이트나 잘못된 변경 사항을 신속하게 복구하는 데 유용합니다.

### 변경 일시 정지 및 재개

Deployment를 사용하여 배포 프로세스를 일시 정지하고, 여러 변경 사항을 적용한 후 재개할 수 있습니다. 이를 통해 모든 변경 사항이 함께 적용되도록 할 수 있으며, 이는 복잡한 업데이트를 관리하는 데 도움이 됩니다.

### 확장성 및 관리 용이성

Deployment는 애플리케이션의 인스턴스 수를 쉽게 조절할 수 있게 해주며, 선언적 업데이트를 통해 애플리케이션의 상태를 원하는 구성으로 유지합니다. 이는 애플리케이션을 효율적으로 관리하고 확장하는 데 필수적입니다.

## 결론

Kubernetes의 Deployment는 복잡한 애플리케이션 배포 요구사항을 충족시키기 위한 강력한 도구입니다. 롤링 업데이트, 롤백, 변경 관리 기능을 통해 개발자와 운영팀은 애플리케이션의 릴리스 및 운영을 보다 안정적이고 효율적으로 수행할 수 있습니다.
