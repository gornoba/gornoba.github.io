# 쿠버네티스의 서비스 계정

쿠버네티스는 사용자 계정과 서비스 계정 두 종류의 계정을 지원합니다. 사용자 계정은 사람들이 사용하며, 서비스 계정은 애플리케이션이나 자동화 도구가 쿠버네티스 클러스터와 상호작용할 때 사용됩니다.

## 서비스 계정 생성

서비스 계정을 생성하는 기본 명령어는 다음과 같습니다:

```bash
kubectl create serviceaccount <service-account-name>
```

예를 들어, 'dashboard-sa'라는 이름의 서비스 계정을 생성하려면 다음과 같이 입력합니다:

```bash
kubectl create serviceaccount dashboard-sa
```

## 서비스 계정 조회

생성된 서비스 계정을 조회하려면 다음 명령어를 사용합니다:

```bash
kubectl get serviceaccounts
```

또는 단축형으로:

```bash
kubectl get sa
```

## 토큰과 시크릿 관리

서비스 계정이 생성될 때, Kubernetes는 자동으로 관련 시크릿을 생성하고 이를 통해 토큰을 관리합니다. 이 토큰은 서비스 계정이 쿠버네티스 API에 인증할 때 사용됩니다.

1. **서비스 계정의 시크릿 조회**

   ```bash
   kubectl get secrets
   ```

2. **시크릿의 상세 정보 조회**
   ```bash
   kubectl describe secret <secret-name>
   ```
   이 명령은 시크릿에 저장된 토큰을 포함한 상세 정보를 보여줍니다.

## 서비스 계정을 사용하는 파드

서비스 계정을 파드에 할당하려면 파드 정의 파일에 `serviceAccountName` 필드를 포함시킵니다:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: my-container
      image: my-image
  serviceAccountName: dashboard-sa
```

이 설정을 통해 'dashboard-sa' 서비스 계정을 사용하는 파드를 생성할 수 있습니다.
