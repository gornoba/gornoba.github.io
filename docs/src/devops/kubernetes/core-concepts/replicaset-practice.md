# Kubernetes에서의 ReplicaSet 관리

[link](https://uklabs.kodekloud.com/topic/practice-test-replicasets-2/)

## Pod 및 ReplicaSet 상태 확인

### 1. 시스템상의 Pod 수 확인

- `kubectl get pods` 명령어를 실행하여 시스템에 존재하는 Pod의 수를 확인합니다.

### 2. 시스템상의 ReplicaSet 수 확인

- `kubectl get replicasets` 명령어를 실행하여 시스템에 존재하는 ReplicaSet의 수를 확인합니다.

### 3. 새 ReplicaSet의 Pod 상태 확인

- `kubectl get rs`를 실행하여 새 ReplicaSet에서 원하는(DESIRED) Pod의 수와 준비(READY)된 Pod의 수를 확인합니다.
- 이미지: `kubectl describe replicaset` 또는 `kubectl get rs -o wide` 명령어를 실행하여 새 ReplicaSet에서 사용된 이미지를 확인합니다.

### 4. Pod 준비 상태와 문제 해결

- Pod가 준비되지 않은 이유: `kubectl describe pods` 명령어를 실행하여 Events 섹션을 검토합니다.

## ReplicaSet 관리 작업

### 5. Pod 삭제 및 ReplicaSet 동작 이해

- `kubectl delete pod [pod 이름]` 명령어를 실행하여 Pod를 삭제합니다. ReplicaSet은 지정된 수의 Pod가 항상 실행되도록 보장합니다.

### 6. ReplicaSet 생성 및 수정

- `kubectl create -f [파일명]` 명령어로 ReplicaSet을 생성합니다. 오류 메시지를 확인하여 문제를 해결합니다.
- apiVersion 오류: `kubectl explain replicaset | grep VERSION`으로 올바른 apiVersion을 확인합니다.
- Selector matchLabels 오류: Selector `matchLabels`가 Pod 레이블과 일치해야 합니다.

### 7. ReplicaSet 삭제

- `kubectl delete replicaset [replicaset 이름]` 명령어를 실행하여 ReplicaSet을 삭제합니다.

### 8. ReplicaSet 이미지 수정 및 Pod 재배포

- `kubectl edit replicaset [replicaset 이름]` 명령어로 이미지를 수정합니다.
- 수정 후, ReplicaSet은 자동으로 Pod를 재배포하지 않습니다. Pod를 수동으로 삭제하거나 ReplicaSet의 크기를 조정하여 새 Pod를 배포해야 합니다.

### 9. ReplicaSet 스케일링

- `kubectl scale rs [replicaset 이름] --replicas=[수]` 명령어를 실행하여 ReplicaSet의 크기를 조정합니다.

이러한 단계를 통해 Kubernetes에서 ReplicaSet과 Pod를 효과적으로 관리하고, 문제가 발생했을 때 적절히 대응할 수 있습니다.
