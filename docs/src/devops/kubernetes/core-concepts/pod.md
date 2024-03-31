# Kubernetes Pods

## 사전 설정 가정

- 애플리케이션이 이미 개발되어 Docker 이미지로 빌드되었으며, Docker Hub와 같은 Docker 저장소에 있어 Kubernetes가 이미지를 가져올 수 있음
- Kubernetes 클러스터가 이미 설정되어 있고 작동 중임 (단일 노드 설정 또는 다중 노드 설정 모두 가능)

## Kubernetes와 Pods

- Kubernetes는 컨테이너를 직접 워커 노드에 배포하지 않음
- 컨테이너는 Pods라고 하는 Kubernetes 객체로 캡슐화됨
- Pod는 애플리케이션의 단일 인스턴스이며, Kubernetes에서 생성할 수 있는 가장 작은 객체임
- 사용자 수 증가에 따라 애플리케이션을 확장하려면 추가 인스턴스를 포함하는 새로운 Pod를 생성함

## Pod와 컨테이너의 관계

- 일반적으로 Pod는 애플리케이션을 실행하는 컨테이너와 일대일 관계를 가짐
- 단일 Pod 내에 여러 컨테이너를 가질 수 있지만, 이는 일반적으로 같은 종류의 여러 컨테이너가 아니라 보조 작업을 수행하는 헬퍼 컨테이너의 경우임

## Kubernetes의 Pods와 Docker 컨테이너

- Docker에서는 애플리케이션의 로드가 증가함에 따라 `Docker run` 명령을 여러 번 실행하여 인스턴스를 추가로 배포함
  ![alt text](/pod1.png)

- Kubernetes의 Pods는 네트워크 연결, 볼륨 공유, 컨테이너 상태 모니터링 등을 자동으로 관리함
  ![alt text](/pod2.png)

## Pods 배포

- `kubectl run` 명령은 Pod를 생성하고 Docker 컨테이너 인스턴스를 배포함
- `kubectl get pods` 명령을 사용하여 클러스터 내의 Pod 목록을 확인할 수 있음

## K8s Reference Docs:

- https://kubernetes.io/docs/concepts/workloads/pods/pod/
- https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/
- https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-intro/
