# AWS EKS 클러스터 이해하기

AWS EKS 클러스터의 작동 방식, 핵심 객체, 그리고 그 객체들이 할 수 있는 일에 대해 알아보겠습니다.

## EKS 클러스터의 네 가지 핵심 개념

EKS 클러스터는 주로 네 가지 핵심 개념으로 구성됩니다:

1. EKS Control Plane
2. Worker Nodes와 Node Groups
3. Fargate Profiles
4. VPC

각 항목을 간략하게 살펴본 후, 차례로 자세히 알아보겠습니다.

### EKS Control Plane

- **설명**: 일반적인 Kubernetes 아키텍처의 마스터 노드 역할을 합니다.
  - `kube-api-server`, `kube-controller` 등 모든 것이 이 Control Plane에 포함됩니다.
  - 일반 Kubernetes에서는 마스터 노드를 직접 관리해야 하지만, 클라우드에서는 AWS가 전체 Control Plane을 관리합니다.
  - 고가용성, API 서버, 컨트롤러 등 모든 것이 AWS EKS Control Plane에서 관리되므로 걱정할 필요가 없습니다.

### Worker Nodes와 Node Groups

- **설명**: Worker Nodes는 애플리케이션 워크로드를 실행하는 EC2 인스턴스 그룹입니다.
  - EC2 인스턴스를 프로비저닝하여 Kubernetes 애플리케이션을 배포합니다.

### Fargate Profiles

- **설명**: EC2 인스턴스를 프로비저닝하지 않고 Kubernetes 애플리케이션을 배포할 수 있습니다.
  - 필요한 만큼만 리소스를 할당하여 서버리스 환경에서 실행됩니다.
  - Fargate Profiles를 사용하면 리소스 낭비가 없습니다.

### VPC

- **설명**: EKS 클러스터의 핵심 객체로, 애플리케이션 워크로드를 퍼블릭 서브넷이나 프라이빗 서브넷에 배포할 수 있습니다.
  - VPC는 보안 설계의 중요한 부분입니다.
  - Fargate Profiles는 최소한 하나의 프라이빗 서브넷을 가진 VPC에서만 생성할 수 있습니다.
  - 프라이빗 서브넷에서 클러스터와 애플리케이션 워크로드가 EKS Control Plane과 통신하려면 VPC NAT 게이트웨이가 필요합니다.

## EKS 클러스터 작동 방식

- **EKS 클러스터 프로비저닝**: Control Plane을 프로비저닝하고, Node Groups를 생성하여 Worker Nodes를 배포합니다.
- **애플리케이션 배포**: `kubectl` CLI를 사용하여 클러스터에 연결하고 Kubernetes 애플리케이션을 배포합니다.

## 각 구성 요소의 세부 사항

### EKS Control Plane

- **설명**: 각 클러스터에 대해 단일 테넌트 Kubernetes Control Plane 제공.
  - 최소 두 개의 API 서버와 세 개의 etcd 노드가 세 개의 가용 영역에 걸쳐 실행됩니다.
  - AWS는 Control Plane 인스턴스를 자동으로 감지하고 교체하여 고가용성을 유지합니다.

### Worker Nodes와 Node Groups

- **설명**: Kubernetes에서 Worker Nodes는 노드라고 하며, 이는 AWS에서 Kubernetes용으로 특별히 설계된 AMI를 사용하는 EC2 인스턴스입니다.
  - Node Group은 하나 이상의 EC2 인스턴스로 구성된 EC2 오토스케일링 그룹입니다.
  - 모든 인스턴스는 동일한 인스턴스 유형, AMI 및 IAM 역할을 사용해야 합니다.
  - `eksctl` 명령줄 도구를 사용하면 이러한 설정을 쉽게 할 수 있습니다.

### Fargate Profiles

- **설명**: 컨테이너를 위한 맞춤형 컴퓨팅 용량을 제공합니다.
  - Fargate는 각 파드에 격리된 환경을 제공하며, 다른 파드와 커널, CPU, 메모리, 네트워크 인터페이스를 공유하지 않습니다.

### VPC

- **설명**: EKS는 AWS VPC 네트워크 정책을 사용하여 클러스터 내 Control Plane 구성 요소 간의 트래픽을 제한합니다.
  - 클러스터 API 서버 엔드포인트를 어떻게 노출할지 결정해야 합니다.
  - VPC 개념, 퍼블릭 및 프라이빗 서브넷, 보안 그룹 등을 이해하고 관리해야 합니다.
  - EKS 클러스터 간의 통신은 Kubernetes RBAC 정책으로 제어됩니다.

EKS 클러스터는 고가용성 및 높은 보안성을 제공하여 프로덕션 워크로드 배포에 적합합니다.
