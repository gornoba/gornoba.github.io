# 멀티 컨테이너 포드(Multi Container Pods)

쿠버네티스에서의 멀티 컨테이너 포드는 서로 긴밀하게 협력해야 하는 서비스들, 예를 들어 웹 서버와 로깅 서비스,를 함께 배치하기 위한 방법입니다. 이러한 접근 방식은 서비스들이 독립적으로 개발 및 배포될 수 있으면서도, 동일한 생명주기, 네트워크 공간, 그리고 스토리지 볼륨을 공유할 수 있게 합니다.

## 핵심 개념

- **독립적인 서비스**: 각 서비스는 독립적으로 개발 및 배포됩니다.
- **생명주기 공유**: 멀티 컨테이너 포드 내의 컨테이너는 함께 생성되고 소멸됩니다.
- **네트워크 공간 공유**: 컨테이너는 `localhost`를 통해 서로를 참조할 수 있습니다.
- **스토리지 볼륨 공유**: 컨테이너는 같은 스토리지 볼륨에 접근할 수 있습니다.

## YAML 파일 예시

멀티 컨테이너 포드를 정의하는 방법은 기존의 포드 정의 파일에 새로운 컨테이너 정보를 추가하는 것입니다. 아래는 웹 서버와 로깅 에이전트가 함께 있는 포드의 예시입니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp
  labesl:
    name: simple-webapp
spec:
  containers:
    - name: simple-webapp
      image: simple-webapp
      port:
        - containerPort: 8080
    - name: log-agent
      image: log-agent
```

이 예시에서, `simple-webapp`와 `log-agent` 두 개의 컨테이너가 같은 포드 내에 정의되어 있으며, 이들은 동일한 생명주기, 네트워크 공간, 그리고 스토리지 볼륨을 공유합니다.

## 정리

멀티 컨테이너 포드는 서로 협력하는 컨테이너들을 함께 배치하여 관리의 효율성을 높이고, 서비스 간 통신을 용이하게 하는 쿠버네티스의 강력한 기능입니다. 이를 통해 서비스의 독립적인 개발과 배포를 지원하면서도, 필요할 때는 서로 긴밀하게 협력할 수 있습니다.

## K8s Reference Docs

https://kubernetes.io/docs/tasks/access-application-cluster/communicate-containers-same-pod-shared-volume/
