# Kubernetes 내의 Pod 정의 파일에서 Commands와 Arguments 이해하기

## 소개

[이전에](/devops/kubernetes/application-lifecycle/commands) 주어진 초(seconds) 수만큼 대기하는 간단한 Docker 이미지, `ubuntu-sleeper`를 만들고 실행했습니다. 이제 이 이미지를 사용하여 Pod를 생성할 것입니다.

## Pod 정의 파일에 커맨드와 아규먼트 지정하기

Pod를 생성할 때, Docker에서와 같이 커맨드 라인 아규먼트를 통해 기본 동작을 오버라이드할 수 있습니다. 예를 들어, 컨테이너가 10초 동안 대기하게 하려면 Pod 정의 파일에 추가적인 아규먼트를 지정해야 합니다.

### 예시: Pod 정의 파일

아래는 `ubuntu-sleeper` 이미지를 사용하여 10초간 대기하는 Pod 정의 파일의 예시입니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper-pod
spec:
  containers:
    - name: ubuntu-sleeper
      image: ubuntu-sleeper
      args: ["10"]
```

### `command`와 `args` 이해하기

- **`args`**는 Docker에서 `CMD` 지시문을 오버라이드합니다. 이는 커맨드 라인에서 직접 전달된 아규먼트에 해당합니다.
- **`command`** 필드는 Docker의 `ENTRYPOINT` 지시문에 해당합니다. Pod 정의 파일에서 `command`를 지정하면, Docker 이미지의 `ENTRYPOINT`를 오버라이드할 수 있습니다.

### `entryPoint`와 `cmd` 오버라이드 예시

만약 `entryPoint`를 새로운 커맨드로 오버라이드하고자 한다면, Pod 정의 파일에서 `command` 필드를 사용합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: custom-entrypoint-pod
spec:
  containers:
    - name: custom-command-container
      image: ubuntu-sleeper
      command: ["sleep2.0"]
      args: ["10"]
```

## 요약 및 실습

쿠버네티스에서 `command`와 `args` 필드는 Docker 이미지의 `ENTRYPOINT`와 `CMD` 지시문을 각각 오버라이드하는 데 사용됩니다. 이를 통해 이미지의 기본 동작을 수정하거나 추가 파라미터를 전달할 수 있습니다.

## K8s Reference Docs

https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/
