# Weave CNI 플러그인을 이용한 쿠버네티스 네트워킹 구성

## Weave CNI 플러그인 소개

Weave는 쿠버네티스 클러스터 내에서 포드 간의 통신을 효율적으로 관리하도록 설계된 네트워킹 솔루션입니다. Weave는 다음과 같은 주요 기능을 제공합니다:

- **자동 IP 할당**: 포드에 자동으로 IP 주소를 할당합니다.
- **네트워크 격리**: 클러스터 내의 각 포드는 독립적인 네트워크 환경에서 실행됩니다.
- **효율적인 데이터 전송**: Weave는 네트워크 트래픽을 최적화하여 데이터 전송 효율을 높입니다.

## Weave CNI 플러그인의 작동 원리

Weave는 각 노드에 에이전트(Weave Peer)를 배포하여 네트워크 트래픽을 관리합니다. 이 에이전트들은 다음과 같이 작동합니다:

- 각 노드의 포드에 대한 네트워크 정보를 수집하고 공유합니다.
- 포드 간의 트래픽을 효과적으로 라우팅하기 위해 내부 네트워크 토폴로지를 유지 관리합니다.
- 필요한 경우 트래픽을 캡슐화하여 다른 노드의 포드로 라우팅합니다.

## Weave CNI 플러그인 설정 방법

Weave CNI 플러그인을 쿠버네티스 클러스터에 설정하는 과정은 다음과 같습니다:

1. **Weave Net 설치**: 쿠버네티스 클러스터에 Weave Net을 설치합니다. 설치는 일반적으로 `kubectl apply` 명령어를 사용하여 YAML 파일을 적용하는 방식으로 이루어집니다.

   ```sh
   kubectl apply -f https://github.com/weaveworks/weave/releases/download/v2.8.1/weave-daemonset-k8s.yaml
   ```

2. **네트워크 구성 확인**: 설치 후 Weave 네트워크의 구성을 확인합니다. 각 노드에 Weave Peer가 성공적으로 배포되었는지 확인할 수 있습니다.

   ```bash
   kubectl get pods -n kube-system
   ```

3. **네트워크 성능 모니터링**: Weave Net은 네트워크 성능 모니터링 도구를 제공하여 클러스터의 네트워크 상태를 실시간으로 확인할 수 있습니다.

## 결론

Weave CNI 플러그인은 쿠버네티스 클러스터에서 강력하고 유연한 네트워킹 솔루션을 제공합니다. 이 강의를 통해 Weave의 주요 기능과 구성 방법을 이해하고, 클러스터의 네트워킹 요구 사항을 효과적으로 관리하는 방법을 배울 수 있습니다.

## References Docs

https://kubernetes.io/docs/concepts/cluster-administration/addons/
https://www.weave.works/docs/net/latest/kubernetes/kube-addon/
