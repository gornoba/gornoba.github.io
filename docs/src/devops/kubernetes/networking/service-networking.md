# 쿠버네티스에서의 서비스 네트워킹

## 서비스 네트워킹 이해

쿠버네티스의 서비스(Service)는 클러스터 내의 포드에 대한 추상적인 액세스 레이어를 제공합니다. 서비스는 클러스터 내의 모든 노드에서 접근 가능하며 특정 포드 그룹을 대표합니다.

### 서비스의 주요 유형

1. **ClusterIP**: 클러스터 내부에서만 접근 가능한 기본 서비스 유형입니다. 클러스터 내의 포드가 서로 통신할 때 사용합니다.
2. **NodePort**: 외부 트래픽을 특정 포트를 통해 서비스로 라우팅하여 클러스터 외부에서 서비스에 접근할 수 있게 해줍니다.
3. **LoadBalancer**: 클라우드 제공자의 로드 밸런서를 사용하여 서비스를 외부에 노출합니다.

## 서비스 IP 할당과 관리

- 서비스 생성 시 쿠버네티스 API 서버에서 자동으로 IP를 할당받습니다.
- 이 IP는 서비스를 생성한 클러스터 전체에서 유니크합니다.

## 서비스 작동 방식

- `kube-proxy`는 각 노드에서 실행되며, 서비스 IP로 들어오는 요청을 적절한 포드로 전달하는 규칙을 관리합니다.
- `kube-proxy`는 iptables, IPVS 등의 방식을 사용하여 트래픽을 관리할 수 있습니다.

### 예시: ClusterIP 서비스 설정

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

이 서비스는 `app=MyApp` 라벨을 가진 포드들에 대한 접근을 관리하며, 클러스터 내부에서만 접근 가능한 IP를 할당받습니다.

### check Cluster IP Range

```sh
ps -aux | grep kube-apiserver
```

### check the rules created by kube-proxy in the iptables

```sh
iptables -L -t nat | grep local-cluster
```

## 서비스와 포드 연결

- 서비스는 라벨 셀렉터를 사용하여 특정 포드를 타겟팅합니다.
- `kube-proxy`는 서비스의 IP 및 포트를 기반으로 트래픽을 해당 포드의 IP와 포트로 전달합니다.

## 실습

- 실습 섹션에서는 클러스터에 서비스를 설정하고, 실제 트래픽이 포드에 어떻게 라우팅되는지 확인합니다.
- `kubectl get services` 명령을 사용하여 클러스터 내의 서비스 리스트를 확인하고, 각 서비스의 설정을 검토합니다.
- node의 ip range는? `kubectl get nodes -o wide` > `ip add`
- pod의 ip range는? `kubectl get all -A` > `kubectl log -n kube-system weave`
- service의 ip range는? `cat /ect/kubernetes/manifests/kube-apiserver` > `--service-cluster-ip-range`
- kube-proxy의 proxy type은? `kubectl logs -n kube-system kube-proxy`

## References Docs

https://kubernetes.io/docs/concepts/services-networking/service/
