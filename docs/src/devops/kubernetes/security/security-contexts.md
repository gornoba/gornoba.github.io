# 쿠버네티스의 보안 컨텍스트

## 보안 컨텍스트란?

쿠버네티스에서 보안 컨텍스트는 파드 또는 컨테이너 수준에서 실행하는 프로세스의 권한과 능력을 관리하는 데 사용됩니다. 이를 통해 사용자 ID 변경, 리눅스 기능(capabilities) 추가 또는 제거 등의 보안 설정을 정의할 수 있습니다.

### 파드 수준의 보안 컨텍스트 설정

파드 정의 파일에 보안 컨텍스트를 설정하여 모든 컨테이너에 적용할 수 있습니다. 아래 예시는 사용자 ID를 1000으로 설정하는 방법을 보여줍니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  securityContext:
    runAsUser: 1000
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
```

### 컨테이너 수준의 보안 컨텍스트 설정

파드 내 개별 컨테이너에 대한 보안 설정을 지정하려면 컨테이너 스펙 안에 보안 컨텍스트를 설정합니다. 이 설정은 파드 수준의 설정보다 우선합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
      securityContext:
        runAsUser: 1000
```

컨테이너에서 어떤 유저가 command를 실행하는지 알 수 있습니다.

```bash
kubectl exec ubuntu-sleeper -- whoami
```

### 기능(Capabilities) 추가하기

리눅스 기능을 컨테이너에 추가하여 더 많은 시스템 레벨의 작업을 허용할 수 있습니다. 다음 예제는 `NET_ADMIN` 기능을 추가하는 방법을 보여줍니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["sleep", "3600"]
      securityContext:
        capabilities:
          add: ["NET_ADMIN"]
```

## K8s Reference Docs

https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
