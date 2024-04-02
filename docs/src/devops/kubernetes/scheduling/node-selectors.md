# 노드 셀렉터(Node Selectors) 사용하기

노드 셀렉터는 쿠버네티스에서 Pod를 특정 노드에 스케줄링하기 위한 간단하고 쉬운 방법입니다. 노드에 라벨을 지정하고, Pod 정의에서 이 라벨을 사용하여 해당 노드에만 Pod가 스케줄링되도록 합니다.

## 사례

3개의 노드가 있는 클러스터가 있다고 가정해봅시다. 두 개는 하드웨어 리소스가 낮은 작은 노드이고, 나머지 하나는 더 높은 리소스를 가진 큰 노드입니다. 데이터 처리 작업과 같이 더 많은 리소스를 요구하는 워크로드를 큰 노드에 할당하고 싶습니다.

### 노드 라벨링

먼저, 큰 노드에 `size=large` 라벨을 추가해야 합니다.

```sh
kubectl label nodes <node-name> <label-key>=<label-value>
kubectl label nodes node1 size=large
```

### Pod 정의에 노드 셀렉터 추가

Pod가 큰 노드에만 배치되도록 하려면, Pod 정의 파일에 `nodeSelector` 속성을 추가합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: data-processing-pod
spec:
  containers:
    - name: data-processor
      image: data-processor-image
  nodeSelector:
    size: large
```

이 설정으로, `data-processing-pod`는 `size=large` 라벨을 가진 노드에만 스케줄링됩니다.

## 한계

노드 셀렉터는 단순하고 직관적이지만, 복잡한 스케줄링 요구 사항을 충족시키지 못할 수 있습니다. 예를 들어, "큰 또는 중간 크기의 노드에 Pod를 배치하되, 작은 노드는 제외한다"와 같은 조건은 노드 셀렉터만으로는 구현하기 어렵습니다. 이러한 경우, 노드 친화성(Node Affinity) 및 반대 친화성(Anti-Affinity)을 사용할 수 있습니다.

## K8s Reference Docs

https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector
