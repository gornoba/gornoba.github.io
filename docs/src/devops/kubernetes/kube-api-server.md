ver.service에 위치한 kube-apiserver 서비스를 확인하여 옵션을 검사

# Kubernetes의 kube-apiserver 소개

## kube-apiserver란?

kube-apiserver는 Kubernetes의 핵심 관리 구성 요소로, 모든 `kubectl` 명령은 실제로 kube-apiserver에 도달합니다. kube-apiserver는 요청을 인증하고 유효성을 검증한 후, etcd 클러스터에서 데이터를 검색하여 요청된 정보를 응답합니다.

## 주요 기능

- **요청 인증 및 유효성 검증**: 모든 요청은 먼저 인증과 검증 과정을 거칩니다.
- **데이터 검색 및 업데이트**: 변경사항(노드 추가, 파드 배포 등)이 etcd에 업데이트되면 변경이 완료된 것으로 간주됩니다.
- **스케줄링과 통신**: 새로운 파드가 생성되면 스케줄러가 적절한 노드를 식별하여 kube-apiserver에 통보하고, kube-apiserver는 해당 정보를 etcd에 업데이트합니다.

## 배포 방식

- **kubeadmin을 사용한 설정**: kubeadmin 도구를 사용하면 kube-apiserver가 `kube-system` 네임스페이스에 파드로 배포됩니다.
  ```sh
  kubectl get pods -n kube-system
  ```
- **수동 설정**: 직접 kube-apiserver 바이너리를 다운로드하고 마스터 노드에서 서비스로 구성할 수 있습니다.
  ```sh
  wget https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/linux/amd64/kube-apiserver
  ```

## 구성 옵션

kube-apiserver는 다양한 파라미터와 함께 실행되며, 이는 인증, 인가, 암호화 및 보안 설정을 포함합니다. 중요한 구성 옵션 중 하나는 `etcd servers`로, 여기에 etcd 서버의 위치를 지정합니다.

## 구성 옵션 확인 방법

- **kubeadmin 설정**: `etc/kubernetes/manifest` 폴더 내의 파드 정의 파일을 통해 옵션을 볼 수 있습니다.
  ```sh
  cat /etc/kubernetes/manifests/kube-apiserver.yaml
  ```
- **수동 설정**: `etc/systemd/system/kube-apiserver.service`에서 kube-apiserver 서비스를 검사하거나, 마스터 노드에서 프로세스를 나열하여 kube-apiserver를 검색함으로써 실행 중인 프로세스와 효과적인 옵션을 확인할 수 있습니다.

:::tip
kube-apiserver는 Kubernetes 클러스터에서 중앙 역할을 하며, 모든 변경사항을 관리하고 etcd 데이터 스토어와 직접 상호작용하는 유일한 구성 요소입니다. 클러스터의 다른 구성 요소들은 변경사항을 수행하기 위해 API 서버를 통해 작업합니다.
:::

## K8s Reference Docs:

- https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/
- https://kubernetes.io/docs/concepts/overview/components/
- https://kubernetes.io/docs/concepts/overview/kubernetes-api/
- https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/
- https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/
