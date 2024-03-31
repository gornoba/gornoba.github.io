# ETCD

## ETCD 기초 소개

ETCD는 초보자를 위한 분산, 신뢰할 수 있는 key-value 저장소로, 단순함, 보안, 속도 측면에서 뛰어납니다. 이 글에서는 ETCD의 기본 개념과 사용 방법, Kubernetes에서의 ETCD 사용에 대해 설명합니다.

## key-value 저장소(Key-Value Store)란?

- 전통적인 SQL이나 관계형 데이터베이스는 데이터를 행과 열 형태로 저장합니다. 반면, key-value 저장소는 정보를 문서나 페이지로 저장하며, 각 개체에 대한 정보를 해당 파일 내에 저장합니다.
- key-value 저장소는 데이터를 JSON이나 YAML과 같은 형식으로 저장하고 검색할 때 편리합니다.
- 각 문서는 독립적이어서 하나의 파일을 변경해도 다른 파일에 영향을 주지 않습니다.

## ETCD 시작하기

- ETCD를 시작하는 것은 간단합니다. GitHub 릴리스 페이지에서 운영 체제에 맞는 바이너리를 다운로드하고 실행하기만 하면 됩니다.
- ETCD는 기본적으로 2379 포트에서 서비스를 시작하며, ETCD 서비스에 클라이언트를 연결하여 정보를 저장하고 검색할 수 있습니다.

## ETCDCTL 사용하기

- ETCD는 ETCDCTL이라는 기본 클라이언트 도구를 함께 제공합니다. 이를 사용하여 key-value 쌍을 저장하고 검색할 수 있습니다.
- 예를 들어, `etcdctl put key value` 명령어로 새 key-value 쌍을 저장하고, `etcdctl get key` 명령어로 값을 검색할 수 있습니다.

## ETCD 버전 및 API 변경 사항

- ETCD는 버전 2에서 3으로 업그레이드되면서 API 버전이 변경되었습니다. ETCDCTL은 API 버전 2와 3 모두를 지원하지만, 사용하기 전에 현재 설정된 API 버전을 확인해야 합니다.
- API 버전을 확인하고 변경하기 위해서는 `ETCDCTL_API` 환경 변수를 설정해야 합니다. 예를 들어, `export ETCDCTL_API=3` 명령으로 API 버전 3을 사용하도록 설정할 수 있습니다.

:::tip 중요
ETCD 버전 3에서는 key-value을 저장할 때 `etcdctl put key value` 명령을 사용하며, 버전 2에서 사용되던 `set` 명령은 지원하지 않습니다.
:::

## 요약

- ETCD는 key-value 저장소로, 데이터를 문서 형태로 저장하여 다루기 쉽고 변화에 유연합니다.
- ETCD를 사용하려면 우선 ETCD 바이너리를 다운로드하고 실행해야 하며, ETCDCTL 클라이언트 도구를 사용하여 데이터를 저장하고 검색할 수 있습니다.
- ETCD 버전과 API 버전을 확인하고 필요에 따라 변경하여 사용해야 합니다. 특히 버전 3으로의 전환은 명령어 변경을 수반하므로 주의해야 합니다.

ETCD는 Kubernetes 클러스터의 중요한 구성 요소로, 클러스터의 상태와 메타데이터를 저장하는 데 사용됩니다. 따라서 Kubernetes를 사용하려면 ETCD에 대한 기본적인 이해가 필요합니다.

## Kubernetes에서 ETCD란?

ETCD는 분산, 신뢰할 수 있는 키-값 저장소로서, Kubernetes 클러스터에 대한 모든 정보(노드, 파드, 설정, 비밀, 계정, 역할 등)를 저장합니다. `kubectl get` 명령으로 조회하는 모든 정보는 ETCD 서버에서 가져옵니다. 클러스터에 변경사항이 있을 때마다(노드 추가, 파드 배포 등), 그 변경사항은 ETCD 서버에 업데이트되며, ETCD 서버에 업데이트되는 순간 변경사항이 완료된 것으로 간주됩니다.

## ETCD 배포 방식

Kubernetes 클러스터를 설정하는 방식에 따라 ETCD의 배포 방식이 달라집니다. 크게 두 가지 방식이 있습니다:

1. **스크래치(Scratch)로부터 클러스터 설정**: 직접 ETCD 바이너리를 다운로드하고, 이를 설치한 뒤 마스터 노드에서 ETCD 서비스를 직접 구성합니다. 이 방식에서는 다양한 설정 옵션(특히 TLS 인증서 관련 옵션)을 지정해야 합니다.

```sh
wget -q --https-only "https://github.com/etcd-io/etcd/releases/download/v3.3.11/etcd-v3.3.11-linux-amd64.tar.gz"
```

2. **Kubeadm을 사용한 클러스터 설정**: Kubeadm 도구는 ETCD 서버를 자동으로 `kube-system` 네임스페이스에 파드로 배포합니다. 이 방식을 사용하면 ETCD 서버 설정이 훨씬 간소화됩니다.

```sh
kubectl get pods -n kube-system
```

:::tip
Kubeadm을 사용하여 ETCD를 배포할 경우, ETCD 서버는 파드로 실행되며 `kube-system` 네임스페이스에서 관리됩니다. ETCD 컨트롤 유틸리티를 사용하여 ETCD 데이터베이스를 탐색할 수 있습니다.
:::

## 고가용성(High Availability) 환경에서의 ETCD

- 고가용성 환경에서는 여러 마스터 노드에 ETCD 인스턴스가 분산되어 배포됩니다.
- 이 경우, 각 ETCD 인스턴스가 서로를 알 수 있도록 ETCD 서비스 구성에서 적절한 파라미터를 설정해야 합니다.
- `initial cluster` 옵션을 통해 ETCD 서비스의 다른 인스턴스를 지정할 수 있습니다.

## 요약

- ETCD는 Kubernetes 클러스터의 모든 데이터를 저장하는 핵심 구성 요소입니다.
- 클러스터를 스크래치로부터 설정하거나 kubeadm을 사용하여 설정할 수 있으며, 각 방식에 따라 ETCD의 배포 방식이 달라집니다.
- 고가용성 환경에서는 ETCD 인스턴스를 여러 마스터 노드에 분산시켜야 하며, 이를 위해서는 인스턴스 간에 서로 알도록 구성해야 합니다.

ETCD는 Kubernetes 클러스터를 안정적으로 운영하기 위한 중추적인 역할을 하므로, ETCD의 작동 방식과 구성을 이해하는 것이 중요합니다.

## ETCD - 명령어

ETCDCTL은 ETCD와 상호작용하기 위해 사용되는 CLI 도구입니다. ETCD 서버와의 상호작용을 위해 2가지 API 버전(버전 2와 버전 3)을 사용할 수 있습니다. 기본적으로 API 버전 2가 설정되어 있습니다. 각 버전은 다른 명령어 세트를 지원합니다.

:::tip 중요
ETCDCTL을 사용할 때 사용하려는 ETCD API 버전을 명시적으로 설정해야 합니다. 버전 2와 버전 3은 명령어가 상이하므로, 사용 중인 ETCD 서버의 버전에 맞는 API 버전을 사용하세요.
:::

## ETCDCTL 버전 2 명령어

- `etcdctl backup`: ETCD 백업
- `etcdctl cluster-health`: 클러스터 건강 상태 체크
- `etcdctl mk`: 키 생성
- `etcdctl mkdir`: 디렉토리 생성
- `etcdctl set`: 키에 값 설정

## ETCDCTL 버전 3 명령어

- `etcdctl snapshot save`: 스냅샷 저장
- `etcdctl endpoint health`: 엔드포인트 건강 상태 체크
- `etcdctl get`: 키 가져오기
- `etcdctl put`: 키에 값 저장

## API 버전 설정

사용하려는 API 버전에 맞게 ETCDCTL_API 환경 변수를 설정해야 합니다.

```bash
export ETCDCTL_API=3
```

## 인증서 경로 지정

ETCDCTL이 ETCD API 서버에 인증하기 위해서는 인증서 파일 경로를 지정해야 합니다. 이 인증서 파일은 다음 경로에 있습니다:

- `--cacert /etc/kubernetes/pki/etcd/ca.crt`
- `--cert /etc/kubernetes/pki/etcd/server.crt`
- `--key /etc/kubernetes/pki/etcd/server.key`

## 명령어 실행 예시

ETCDCTL API 버전과 인증서 파일 경로를 지정한 명령어 예시입니다:

```sh
kubectl exec etcd-master -n kube-system -- sh -c "ETCDCTL_API=3 etcdctl get / --prefix --keys-only --limit=10 --cacert /etc/kubernetes/pki/etcd/ca.crt --cert /etc/kubernetes/pki/etcd/server.crt  --key /etc/kubernetes/pki/etcd/server.key"
```

이 명령어는 Kubernetes 클러스터 내에서 ETCD 데이터를 안전하게 조회하기 위한 방법을 보여줍니다. 인증서를 사용하는 것은 ETCD 데이터에 대한 안전한 접근을 보장하기 위해 필수적입니다. 이 예시에서 사용된 명령어는 ETCD 내의 모든 키를 제한된 수(여기서는 10개)만큼 조회하는 데 사용됩니다.

:::warning 주의
API 버전을 올바르게 설정하지 않거나, 인증서 경로를 정확히 지정하지 않으면, ETCD 서버와의 통신에 실패할 수 있습니다. 따라서, ETCD와 상호작용하기 전에 환경 설정을 정확히 확인하고 진행하는 것이 중요합니다.
:::

## ETCD와 Kubernetes

Kubernetes 클러스터에서 ETCD는 매우 중요한 역할을 합니다. 클러스터의 모든 상태 정보, 구성 데이터 등이 ETCD에 저장되기 때문에, ETCD의 안정적인 운영은 클러스터의 건강과 직접적으로 연결됩니다. 따라서, ETCD를 관리하고 운영하는 데 필요한 기본적인 명령어와 개념을 숙지하는 것은 Kubernetes 관리자에게 필수적인 능력입니다.

## 결론

ETCDCTL은 ETCD와 상호작용하기 위한 강력한 도구입니다. 하지만, 올바르게 사용하기 위해서는 API 버전 설정과 인증서를 통한 안전한 접근 방법을 이해해야 합니다. Kubernetes 클러스터의 중요한 부분인 ETCD를 효과적으로 관리하기 위해 이러한 명령어와 옵션들을 숙지하고 활용하세요.

이 강의에서는 ETCD의 기본적인 사용법과 Kubernetes 클러스터에서의 역할에 대해 알아보았습니다. 클러스터를 보다 안전하고 효율적으로 관리하기 위해 ETCD에 대한 이해는 매우 중요합니다.

## K8s Reference Docs:

- https://kubernetes.io/docs/concepts/overview/components/
- https://etcd.io/docs/
- https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/
