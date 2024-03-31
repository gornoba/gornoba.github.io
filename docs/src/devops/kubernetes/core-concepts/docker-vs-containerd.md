# Docker와 ContainerD: Kubernetes에서의 컨테이너 런타임

## 배경과 발전

- 초기에는 Docker가 컨테이너 기술에서 지배적이었으나, Kubernetes의 등장과 함께 다양한 컨테이너 런타임 지원 필요성이 증가함.
- Kubernetes는 Container Runtime Interface (CRI)를 도입하여 다양한 컨테이너 런타임이 OCI(Open Container Initiative) 표준을 준수하는 한 지원될 수 있도록 함.
- Docker는 CRI에 직접 맞춰지지 않았기 때문에, Kubernetes는 `dockershim`을 통해 Docker를 계속 지원했으나, 이는 Kubernetes 1.24 버전에서 제거됨.

## ContainerD

- Docker는 다양한 도구를 포함하는 더 큰 툴세트이며, `ContainerD`와 `runC` 같은 컨테이너 런타임을 포함함.
- ContainerD는 CRI에 호환되며, Kubernetes와 직접 작동할 수 있음. 따라서, Docker 없이도 ContainerD를 사용하여 컨테이너를 관리할 수 있음.

## CLI 도구

### ctr

- ContainerD와 함께 제공되는 CLI 도구로, 주로 디버깅 용도로 사용됨. 사용자 친화적이지 않고 기능이 제한적임.

### nerdctl (nerd control)

- Docker와 유사한 사용자 경험을 제공하는 ContainerD용 CLI 도구.
- Docker 명령어 대부분을 지원하며, ContainerD의 최신 기능에 접근할 수 있음.

### crictl (CRI Control)

- Kubernetes에서 CRI 호환 런타임을 관리하기 위한 CLI 도구.
- Kubernetes 커뮤니티에서 개발되어 여러 CRI 호환 런타임에서 동작하며, 주로 디버깅 용도로 사용됨.

## 요약

- **Docker**는 초기 컨테이너 기술의 지배적 플레이어였으나, Kubernetes와의 통합을 위해 **CRI**가 도입되었음.
- **ContainerD**는 Docker의 일부였으나 이제 독립적인 프로젝트로, Kubernetes와 직접 통합할 수 있는 CRI 호환 런타임임.
- **ctr**는 ContainerD의 디버깅을 위한 도구로 기능이 제한적이며, **nerdctl**은 Docker 명령어와 유사한 경험을 제공하는 ContainerD의 CLI 도구임.
- **crictl**은 모든 CRI 호환 런타임을 위한 Kubernetes 커뮤니티의 CLI 도구로, 주로 디버깅에 사용됨.

## 추가 설명

- **CRI (Container Runtime Interface)**: Kubernetes가 다양한 컨테이너 런타임(예: Docker, ContainerD 등)과 통신하기 위해 사용하는 표준 인터페이스입니다.
- **OCI (Open Container Initiative)**: 컨테이너 이미지와 런타임의 표준화를 목표로 하는 프로젝트입니다. OCI 표준을 준수한다는 것은 컨테이너 이미지와 런타임이 다양한 환경에서 호환될 수 있음을 의미합니다.
- **Dockershim**: Kubernetes가 Docker 컨테이너 런타임을 CRI 표준에 맞게 간접적으로 지원하기 위해 사용한 중간 계층입니다. Kubernetes 1.24 버전에서 제거되었습니다.
- Kubernetes와 컨테테이너 런타임 간의 관계는 시간이 지남에 따라 발전하였으며, Kubernetes 생태계 내에서 여러 가지 런타임 옵션이 지원됩니다. 이러한 변화는 사용자가 더 유연하게 컨테이너 기술을 선택하고 사용할 수 있게 해줍니다.

## 중요한 변화와 선택

- **Docker에서 Containerd로의 전환**: Kubernetes 1.24부터는 `dockershim`이 제거되어 Docker 직접 지원이 중단되었습니다. 이는 Docker 이미지와 컨테이너는 계속 호환되지만, 컨테이너 실행에는 Docker 대신

  > [!IMPORTANT]
  > Containerd 같은 CRI 호환 런타임이 사용되어야 함을 의미합니다.

- **Containerd와 Docker의 차이점**: Docker는 개발자 친화적인 툴셋과 사용자 인터페이스를 제공하는 반면, Containerd는 더 가볍고 Kubernetes와 직접 통합될 수 있도록 설계된 컨테이너 런타임입니다. Containerd는 이미지 관리와 컨테이너 실행에 필요한 핵심 기능을 제공하며, 필요한 경우 추가 도구(예: `nerdctl`)를 통해 Docker와 유사한 경험을 제공할 수 있습니다.

## 개발자와 운영자를 위한 가이드

- Kubernetes 클러스터를 운영하는 경우, **Containerd** 또는 다른 CRI 호환 런타임을 사용하는 것이 좋습니다. 이러한 런타임은 Kubernetes와 원활하게 통합되고, 클러스터의 리소스 사용을 최적화하는 데 도움이 됩니다.
- 컨테이너 이미지를 빌드하고 관리하는 작업에는 **Docker**를 계속 사용할 수 있습니다. Docker 이미지는 OCI 표준을 따르므로 Containerd와 같은 다른 런타임에서도 실행할 수 있습니다.
- 컨테이너를 직접 실행하고 관리하기 위해 CLI 도구가 필요한 경우, **nerdctl**을 사용하는 것이 좋습니다. nerdctl은 Docker와 유사한 명령어를 제공하며, Containerd의 기능을 활용할 수 있습니다.
- Kubernetes 클러스터의 디버깅과 문제 해결을 위해서는 **crictl**을 사용하세요. crictl은 CRI 호환 런타임과 통신하며, 클러스터 내 컨테이너의 상태를 검사하고 로그를 확인하는 데 유용합니다.

## 결론

Kubernetes 생태계에서는 다양한 컨테이너 런타임을 지원하여 사용자가 특정 기술에 국한되지 않고 최적의 도구를 선택할 수 있도록 합니다. Docker에서 Containerd로의 전환은 이러한 변화의 일부이며, 개발자와 운영자는 이러한 변화를 이해하고 적절한 도구를 선택하여 클러스터를 효율적으로 관리할 수 있어야 합니다.
