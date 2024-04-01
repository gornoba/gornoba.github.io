# Taints와 Tolerations

쿠버네티스에서 테인트(Taints)와 톨러레이션(Tolerations)은 특정 노드에 Pod가 스케줄링될 수 있는 조건을 설정하는 데 사용됩니다. 오직 특정 Taints에 대해 허용된(톨러레이션을 가진) Pod만이 그 노드에 스케줄링될 수 있습니다.

## 테인트(Taints)

노드에 Taints를 추가하기 위해 `kubectl taint nodes` 명령어를 사용합니다. Taints는 특정 노드에 Pod가 스케줄링되는 것을 제한하는 역할을 합니다.

### 명령어 구문

```sh
kubectl taint nodes <노드 이름> key=value:taint-effect
```

### 예시

```sh
kubectl taint nodes node1 app=blue:NoSchedule # 생성
kubectl taint nodes node1 app=blue:NoSchedule- # 삭제
```

Taints 효과는 Pod가 해당 Taints를 용인하지 않을 경우 어떤 일이 발생하는지 정의합니다. Taints 효과에는 다음 세 가지가 있습니다:

- **NoSchedule**: Pod는 노드에 스케줄링되지 않습니다.
- **PreferNoSchedule**: 시스템은 Pod를 가능한 해당 노드에 스케줄링하지 않으려 합니다(보장되지 않음).
- **NoExecute**: 새로운 Pod는 노드에 스케줄링되지 않으며, 기존 Pod는 해당 Taints를 용인하지 않는 경우 노드에서 추방됩니다.

## 톨러레이션(Tolerations)

Pod에 Tolerations을 추가하기 위해서는 Pod 정의 파일에 `tolerations` 섹션을 추가합니다. 이는 Pod가 특정 테인트를 용인할 수 있음을 나타냅니다.

### Pod 정의 예시

```yaml
apiVersion: v1
kind: Pod
metadata:
name: myapp-pod
spec:
  containers:
    - name: nginx-container
      image: nginx
  tolerations:
    - key: "app"
      operator: "Equal"
      value: "blue"
      effect: "NoSchedule"
```

## 주의 사항

테인트와 Tolerations은 Pod을 특정 노드로 유도하는 것이 아니라, 단지 특정 Tolerations을 가진 Pod만을 해당 노드가 받아들이도록 합니다. 노드에 설정된 Taints를 보려면 다음 명령어를 실행하세요.

```sh
kubectl describe node <노드 이름> | grep Taint
```

## K8s Reference Docs

https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
