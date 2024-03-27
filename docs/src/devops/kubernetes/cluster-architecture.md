# Kubernetes 클러스터 아키텍처 기본 개요

## Kubernetes 클러스터 구조

- Kubernetes 클러스터는 물리적 또는 가상, 온프레미스 또는 클라우드에 상관없이, 컨테이너 형태의 애플리케이션을 호스팅하는 노드의 집합입니다.
- 클러스터는 작업을 수행하는 "화물선(워커 노드)"과 이를 모니터링하고 관리하는 "제어선(마스터 노드)"으로 비유될 수 있습니다.

## Master Node

- Kubernetes 클러스터를 관리하며, 다양한 노드, 컨테이너를 모니터링하고 관리합니다.
- 마스터 노드는 `etcd`, `스케줄러`, `컨트롤러`, `Kube API 서버`와 같은 제어 평면 구성요소로 이루어져 있습니다.

### etcd

- 클러스터에 대한 모든 정보를 key-value 형태로 저장하는 고가용성 데이터베이스입니다.

### Scheduler

- 컨테이너의 리소스 요구사항, 워커 노드의 용량 및 기타 정책이나 제약사항을 기반으로 적절한 노드에 컨테이너를 배치합니다.

### Controller

- 노드 컨트롤러, 복제 컨트롤러 등 다양한 영역을 담당하는 서비스로, 클러스터 내에서 다양한 관리 작업을 수행합니다.

### Kube API 서버

- 클러스터 내 모든 작업을 조율하는 주요 관리 구성요소로, Kubernetes API를 통해 외부 사용자와 클러스터 내 컨트롤러, 워커 노드 간의 통신을 가능하게 합니다.

## Worker Node

- 실제 컨테이너가 배포되는 노드로, `kubelet`과 `Kube Proxy`가 실행됩니다.

### Kubelet

- 각 노드에서 실행되는 에이전트로, Kube API 서버로부터의 지시를 듣고 요구에 따라 노드에서 컨테이너를 배포하거나 파괴합니다.

### Kube Proxy

- 워커 노드 간 통신을 가능하게 하는 구성요소로, 컨테이너 간에 서로 통신할 수 있도록 네트워크 규칙을 관리합니다.

## 요약

- Kubernetes 클러스터는 마스터 노드와 워커 노드로 구성되며, 이 두 유형의 노드는 애플리케이션을 효율적으로 배포하고 관리하기 위해 협력합니다.
- 마스터 노드는 클러스터의 전반적인 관리를 담당하는 반면, 워커 노드는 실제 애플리케이션 컨테이너를 실행합니다.

## k8s reference docs:

- https://kubernetes.io/docs/concepts/architecture/
- https://kubernetes.io/docs/concepts/overview/kubernetes-api/
- https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/
- https://kubernetes.io/docs/concepts/architecture/
- https://kubernetes.io/docs/concepts/overview/components/
- https://kubernetes.io/docs/concepts/services-networking/
