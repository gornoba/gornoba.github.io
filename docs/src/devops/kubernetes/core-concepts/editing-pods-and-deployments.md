# Pod와 Deployment 수정하기

## Pod 수정하기

실행 중인 Pod의 특정 사양은 수정할 수 없습니다. 수정 가능한 항목은 다음과 같습니다

- `spec.containers[*].image`
- `spec.initContainers[*].image`
- `spec.activeDeadlineSeconds`
- `spec.tolerations`

예를 들어, 환경 변수, 서비스 어카운트, 리소스 제한 등은 실행 중인 Pod에서 수정할 수 없습니다. 필요한 변경 사항이 있다면 다음 두 가지 방법 중 하나를 사용할 수 있습니다:

1. **kubectl edit 명령어 사용**

   ```sh
   kubectl edit pod <pod 이름>
   ```

   이 명령은 편집기에서 Pod 사양을 엽니다. 필요한 속성을 수정한 후 저장을 시도하면, 편집이 허용되지 않는 필드를 변경하려고 하면 저장이 거부됩니다. 변경 사항이 포함된 파일은 임시 위치에 저장됩니다. 기존 Pod를 삭제하고 `kubectl create -f <임시 파일 경로>` 명령으로 새 Pod를 생성합니다.

2. **YAML 파일 추출 및 수정**
   ```sh
   kubectl get pod <pod 이름> -o yaml > my-new-pod.yaml
   ```
   이 명령으로 Pod 정의를 YAML 파일로 추출합니다. 파일을 편집한 후, 기존 Pod를 삭제하고 `kubectl create -f my-new-pod.yaml` 명령으로 수정된 파일로 새 Pod를 생성합니다.

## Deployment 수정하기

Deployment의 경우, POD 템플릿의 어떤 필드나 속성이든 수정할 수 있습니다. 변경 사항이 적용될 때마다 Deployment는 자동으로 새 Pod를 생성합니다.

```sh
kubectl edit deployment <deployment 이름>
```

이 명령은 편집기에서 Deployment 사양을 열어 변경할 수 있게 하며, 저장 후 자동으로 새로운 Pod로의 롤아웃이 시작됩니다.
