# Kubelet 소개

## Kubelet이란?

Kubelet은 Kubernetes 클러스터 내의 워커 노드에서 실행되는 주요 구성 요소로, '선박의 선장'과 같은 역할을 합니다. 클러스터에 노드를 등록하고, 스케줄러로부터 받은 지시에 따라 파드와 컨테이너를 로드하거나 언로드합니다. 또한, 노드와 그 위의 컨테이너 상태에 대한 정기적인 보고를 kube API 서버에 전송합니다.

### 주요 기능

- **노드 등록**: Kubernetes 클러스터와 워커 노드의 연결을 담당합니다.
- **컨테이너 로드 및 언로드**: 스케줄러의 지시에 따라 컨테이너 런타임 엔진(Docker 등)을 통해 필요한 이미지를 가져오고 인스턴스를 실행합니다.
- **상태 모니터링 및 보고**: 파드와 컨테이너의 상태를 지속적으로 모니터링하고, 이에 대한 정보를 kube API 서버에 정기적으로 보고합니다.

## Kubelet 설치

- **kubeadm을 사용한 클러스터 배포 시**: kubeadm은 클러스터의 다른 구성 요소와 달리 kubelet을 자동으로 배포하지 않습니다. 따라서 워커 노드에 kubelet을 수동으로 설치해야 합니다.
- **수동 설치**: Kubernetes 릴리스 페이지에서 kubelet 인스톨러를 다운로드하여 워커 노드에 서비스로 실행합니다.

```sh
wget https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/linux/amd64/kubelet
```

## Kubelet 프로세스 및 옵션 확인

- 워커 노드에서 프로세스를 나열하고 `kubelet`을 검색하여 실행 중인 kubelet 프로세스와 효과적인 옵션을 확인할 수 있습니다.

:::tip
클러스터의 워커 노드에서 파드와 컨테이너의 생명주기를 관리하는 kubelet은 Kubernetes 운영에 있어 핵심적인 구성 요소입니다. kubelet의 정확한 설치와 구성은 클러스터의 안정적인 운영을 위해 중요합니다.
:::

## K8s Reference Docs:

https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/
https://kubernetes.io/docs/concepts/overview/components/
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/kubelet-integration/
