# YAML 정의 파일을 사용한 Pod 생성 데모

## Pod 정의 YAML 파일 생성

1. **파일 생성**: 텍스트 에디터를 사용하여 YAML 파일을 생성합니다. Windows의 경우 Notepad++, Linux의 경우 Vim 등 YAML 언어 지원이 있는 에디터를 사용하는 것이 좋습니다.

2. **YAML 파일 구조**:

   - **apiVersion**: Pod의 경우 `v1`
   - **kind**: `Pod`
   - **metadata**:
     - **name**: Pod의 이름 (`nginx`)
     - **labels**: Pod를 그룹화할 때 도움이 되는 레이블 (`app: nginx`, `tier: frontend`)
   - **spec**:
     - **containers**: 컨테이너 목록
       - **name**: 컨테이너 이름 (`nginx`)
       - **image**: 컨테이너 이미지 (`nginx`)

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx
     labels:
       app: nginx
       tier: frontend
   spec:
     containers:
       - name: nginx
         image: nginx
   ```

3. **YAML 파일 주의 사항**: 올바른 들여쓰기(2개의 공백 권장)와 대소문자 구분이 중요합니다. `metadata`, `spec`, `containers`는 각각 적절한 자식 요소를 가져야 합니다.

## Pod 생성 및 확인

- **생성 명령어**: `kubectl create -f pod.yaml` 또는 `kubectl apply -f pod.yaml`을 실행하여 Pod를 생성합니다.
- **상태 확인**: `kubectl get pods`로 Pod의 상태를 확인할 수 있습니다. 처음에는 `ContainerCreating` 상태이며, 준비가 완료되면 `Running` 상태로 변경됩니다.
- **상세 정보 확인**: `kubectl describe pod nginx`로 Pod에 대한 자세한 정보를 확인할 수 있습니다.

:::tip
YAML 파일을 사용하여 Kubernetes 리소스를 정의하고 관리하는 방법은 Kubernetes 작업에서 중요한 기술입니다. 정확한 구문과 구조를 유지하는 것이 성공적인 리소스 생성의 핵심입니다.
:::

## Kubernetes 작업 요약

이 문서에서는 Kubernetes 시스템에서 다양한 작업을 수행하는 방법에 대해 설명합니다.

### 1. 시스템상의 Pod 수 확인

- `kubectl get pods` 명령어를 사용하여 현재 시스템에 존재하는 Pod의 수를 확인할 수 있습니다.
- Pod의 수를 확인하기 위해 `kubectl get pods --no-headers | wc -l` 명령어를 사용할 수 있습니다.

### 2. 새 Pod 생성

- `kubectl run nginx --image=nginx` 명령어를 사용하여 nginx 이미지를 사용하는 새 Pod를 생성할 수 있습니다.

### 3. 새로 생성된 Pod의 이미지 확인

- `kubectl describe pod [pod 이름] | grep image` 명령어를 사용하여 새로 생성된 Pod에서 사용되는 이미지를 확인할 수 있습니다.

### 4. Pod가 배치된 노드 확인

- `kubectl get pods -o wide` 명령어를 사용하여 Pod가 배치된 노드를 확인할 수 있습니다.

### 5. webapp Pod 내 컨테이너 수 확인

- `kubectl describe pod webapp` 명령어를 사용하여 webapp Pod 내의 컨테이너 수를 확인할 수 있습니다. (nginx, agentx)

### 6. webapp Pod 내 컨테이너 이미지 확인

- `kubectl describe pod webapp` 명령어의 출력을 검토하여 webapp Pod에 사용된 이미지를 확인할 수 있습니다.

### 7. agentx 컨테이너 상태 확인

- `kubectl describe pod webapp` 명령어를 사용하여 agentx 컨테이너의 상태를 확인할 수 있습니다.

### 8. agentx 컨테이너 오류 원인 추측

- agentx 컨테이너가 오류 상태인 이유는 "Events:" 섹션의 "failed to pull and unpack image" 이벤트에서 볼 수 있듯이, 컨테이너 이미지를 가져오고 압축 해제하는 데 실패했기 때문입니다.

### 9. kubectl get pods 명령어의 READY 열 의미

- READY 열은 Pod 내의 컨테이너가 정상적으로 실행되고 있는 수를 나타냅니다.

### 10. webapp Pod 삭제

- `kubectl delete pod webapp` 명령어를 사용하여 webapp Pod를 삭제할 수 있습니다.
- 시험에서 --force를 사용하면 시간을 벌 수 있습니다. 위의 어떤 시험 포드에도 의존하지 않습니다.

### 11. yaml 파일을 이용하여 redis라는 이름과 redis123 이미지를 사용하여 새 파드를 생성

- `kubectl run redis --image=redis123 --dry-run=client -o yaml > redis.yaml` 명령어로 Pod 정의 YAML 파일을 생성하고, 이를 사용하여 redis Pod를 생성합니다.

### 12. 이미지 변경 방법

Pod의 이미지를 `redis`로 변경하여 실행 상태로 만드는 세 가지 방법이 있습니다.

#### 방법 1: 매니페스트 파일 직접 편집

1. `vi redis.yaml`을 사용하여 마지막 질문에서 생성한 매니페스트 파일을 편집합니다.
2. `redis.yaml` 파일 내의 이미지 이름을 `redis`로 수정하고 저장 후 종료합니다.
3. 수정된 yaml을 적용하기 위해 `kubectl apply -f redis.yaml`을 실행합니다.

#### 방법 2: 실행 중인 Pod 직접 편집

1. `kubectl edit pod redis`를 실행하여 실행 중인 Pod를 직접 편집합니다.
2. vi 편집기가 열리며, 방법 1과 같이 이미지 이름을 수정합니다.
3. vi를 종료하면 변경 사항이 즉시 적용됩니다. 오류가 발생하면 vi로 다시 돌아갑니다.

#### 방법 3: 이미지 직접 패치

1. `kubectl set image pod/redis redis=redis`를 실행하여 Pod 내의 컨테이너 이미지를 직접 `redis`로 패치합니다.
2. 이 방법을 사용하기 위해서는 Pod 내의 컨테이너 이름을 알아야 하며, 컨테이너 이름에 새 이미지를 할당합니다.

이미지 변경 후 Pod가 실행 상태로 변해야 합니다. 이러한 방법을 통해 Kubernetes 클러스터에서 Pod의 이미지를 쉽게 변경할 수 있습니다.
