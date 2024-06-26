# Choosing a Kubernetes Infrastructure

1. 이 클러스터의 목적은 무엇인가요? 학습, 개발, 테스트 용도인가요, 아니면 생산급 애플리케이션을 호스팅하기 위한 것인가요?
2. 귀사의 클라우드 도입 정도는 어느 정도인가요? 관리형 클라우드 서비스를 선호하나요, 아니면 자체 호스팅을 선호하나요?
3. 클러스터에서 실행할 작업 유형은 무엇인가요?
4. 클러스터에 호스팅할 애플리케이션은 몇 개인가요? 적은 수인가요, 많은 수인가요?
5. 어떤 종류의 애플리케이션을 클러스터에 호스팅할 예정인가요? 웹 애플리케이션, 빅 데이터, 분석 등?

## 로컬 머신에서 시작하기

- **Linux**: 지원되는 리눅스 머신에서는 바이너리를 수동으로 설치하고 로컬 클러스터를 설정할 수 있습니다. 그러나 이 방법은 처음 시작할 때 너무 번거로울 수 있습니다.
- **Windows**: 윈도우에서는 Hyper-V, VMware Workstation 또는 VirtualBox와 같은 가상화 소프트웨어를 사용하여 쿠버네티스를 실행할 수 있는 리눅스 VM을 생성해야 합니다.

### 로컬 쿠버네티스 솔루션

- **Minikube**: 싱글 노드 클러스터를 쉽게 배포합니다. VirtualBox와 같은 가상화 소프트웨어를 사용하여 쿠버네티스 클러스터 컴포넌트를 실행하는 가상 머신을 생성합니다.
- **Kubeadm**: 싱글 노드 또는 멀티 노드 클러스터를 신속하게 배포할 수 있지만, 지원되는 구성을 갖춘 호스트를 미리 준비해야 합니다.

## 프로덕션 환경

프로덕션용 클러스터는 사설 또는 공공 클라우드 환경에서 다양한 방식으로 시작할 수 있습니다. 이를 턴키 솔루션 또는 호스팅/관리 솔루션으로 분류할 수 있습니다.

### 턴키 솔루션

- 필요한 VM을 프로비저닝하고 쿠버네티스 클러스터를 구성합니다. 예를 들어, AWS에서 **KOPS** 도구를 사용하여 쿠버네티스 클러스터를 배포할 수 있습니다.

### 호스팅 솔루션

- **Google Kubernetes Engine (GKE)**, **Azure Kubernetes Service (AKS)**, **Amazon Elastic Kubernetes Service (EKS)** 등과 같은 쿠버네티스 서비스는 클러스터와 필요한 VM을 제공하며, 클러스터 구성을 위한 별도의 작업이 필요 없습니다.

## 클라우드 네이티브 솔루션

- **OpenShift**: Red Hat에서 제공하는 인기 있는 온프렘 Kubernetes 플랫폼입니다. GUI를 통해 Kubernetes 구성 요소를 쉽게 생성하고 관리할 수 있습니다.
- **Cloud Foundry Container Runtime**: BOSH 도구를 사용하여 Kubernetes 클러스터를 배포하고 관리하는 오픈소스 프로젝트입니다.

이러한 솔루션을 통해 조직 내에서 쿠버네티스 클러스터를 쉽게 배포하고 관리할 수 있습니다. 각 솔루션은 특정 요구 사항에 맞게 클러스터를 설계하고 구성하는 데 도움을 줄 수 있습니다.
