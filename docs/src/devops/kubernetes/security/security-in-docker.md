# Docker와 Kubernetes의 보안 컨텍스트

## Docker 보안의 기본

Docker는 컨테이너를 호스트와 격리하여 실행합니다. 컨테이너는 Linux 네임스페이스를 사용하여 호스트로부터 분리되며, 이는 프로세스, 네트워킹, 사용자 등을 격리하는 데 사용됩니다.

### 프로세스 격리

- **네임스페이스**: 컨테이너는 자체 네임스페이스에서 실행되어 호스트의 다른 프로세스와 격리됩니다. 예를 들어, 컨테이너 내에서 실행되는 프로세스는 PID 1을 시작으로 하지만 호스트에서는 다른 PID를 가집니다.

### 사용자 격리

- **루트 사용자와의 차이**: 컨테이너 내에서 루트 사용자는 호스트의 루트 사용자와 동일한 권한을 가지지 않습니다. Docker는 Linux Capabilities를 사용하여 컨테이너 내의 루트 사용자의 권한을 제한합니다.

## Docker 보안 명령어

컨테이너를 실행할 때 보안 설정을 조정할 수 있는 Docker 명령어 옵션들:

```bash
docker run --user 1000 ubuntu sleep 3600  # 사용자 ID를 1000으로 설정하여 컨테이너 실행
docker run --cap-add=NET_ADMIN ubuntu    # NET_ADMIN 권한을 추가하여 컨테이너 실행
docker run --cap-drop=KILL ubuntu    # KILL 권한을 삭제하여 컨테이너 실행
docker run --privileged ubuntu           # 모든 Linux Capabilities를 가진 상태로 컨테이너 실행
```

## Kubernetes의 보안 컨텍스트

Kubernetes에서도 Docker와 유사하게 컨테이너의 보안을 강화할 수 있습니다. Kubernetes의 보안 컨텍스트 설정을 통해, 파드 또는 컨테이너 수준에서 보안 관련 설정을 할 수 있습니다.

### 보안 컨텍스트 예시

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsUser: 1000
  containers:
    - name: nginx
      image: nginx
      securityContext:
        privileged: false
```

이 예시에서는 파드 수준에서 `runAsUser`를 1000으로 설정하여 모든 컨테이너가 사용자 ID 1000으로 실행되도록 합니다. 또한, 특정 컨테이너에 대해 `privileged` 모드를 비활성화하여 보안을 강화했습니다.
