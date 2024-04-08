# InitContainers

멀티 컨테이너 포드에서는, 각 컨테이너가 포드(Pod)의 생명주기 동안 계속 실행되는 프로세스를 실행하는 것으로 예상됩니다. 예를 들어, 웹 애플리케이션과 로깅 에이전트가 포함된 멀티 컨테이너 포드에서는 두 컨테이너 모두 항상 실행 상태를 유지해야 합니다. 하지만, 때때로 포드가 처음 생성될 때 단 한 번 실행되고 완료되는 작업을 수행하는 컨테이너가 필요할 수 있습니다. 이런 경우가 바로 `InitContainers`를 사용하는 시점입니다.

## InitContainers의 역할

- **코드 또는 바이너리 가져오기**: 웹 애플리케이션에서 사용할 코드나 바이너리를 리포지토리에서 가져오는 작업 등
- **외부 서비스 또는 데이터베이스 대기**: 실제 애플리케이션이 시작하기 전에 외부 서비스나 데이터베이스가 준비되기를 기다리는 작업

## YAML 파일 예시

InitContainer는 다른 컨테이너와 마찬가지로 포드 안에 구성되지만, `initContainers` 섹션 내부에 지정됩니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
    - name: myapp-container
      image: busybox:1.28
      command: ["sh", "-c", "echo The app is running! && sleep 3600"]
  initContainers:
    - name: init-myservice
      image: busybox
      command:
        [
          "sh",
          "-c",
          "git clone <some-repository-that-will-be-used-by-application>; done;",
        ]
```

포드가 처음 생성될 때, `initContainer`가 실행되며, 이 컨테이너 내의 프로세스가 완료될 때까지 실제 애플리케이션을 호스팅하는 컨테이너는 시작하지 않습니다.

## 다중 InitContainers 구성

여러 `initContainers`를 구성할 수도 있으며, 이 경우 각 init 컨테이너는 순차적으로 실행됩니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
    - name: myapp-container
      image: busybox:1.28
      command: ["sh", "-c", "echo The app is running! && sleep 3600"]
  initContainers:
    - name: init-myservice
      image: busybox:1.28
      command:
        [
          "sh",
          "-c",
          "until nslookup myservice; do echo waiting for myservice; sleep 2; done;",
        ]
    - name: init-mydb
      image: busybox:1.28
      command:
        [
          "sh",
          "-c",
          "until nslookup mydb; do echo waiting for mydb; sleep 2; done;",
        ]
```

Init 컨테이너 중 하나라도 실패하면 쿠버네티스는 Init 컨테이너가 성공할 때까지 포드를 반복해서 재시작합니다.

## K8s Reference Docs

https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
