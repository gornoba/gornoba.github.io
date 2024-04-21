# Container Network Interface(CNI)

## CNI란 무엇인가?

CNI(Container Network Interface)는 컨테이너의 네트워킹을 관리하는 표준입니다. 이 표준은 컨테이너 런타임이 네트워크 플러그인과 상호 작용하는 방식을 정의하며, 네트워크 설정과 관리를 일관되고 효율적으로 처리할 수 있도록 도와줍니다.

### CNI의 역할

- **네트워크 네임스페이스 생성**: 각 컨테이너에 대해 독립적인 네트워크 환경을 구성합니다.
- **IP 할당 및 라우팅 설정**: 컨테이너에 IP 주소를 할당하고 필요한 라우팅 정보를 구성합니다.
- **네트워크 플러그인과의 상호 작용**: 다양한 네트워크 플러그인을 사용하여 컨테이너 네트워킹 요구 사항을 충족시킵니다.

### CNI 플러그인 예시

- **Bridge**: 가상 브리지를 사용하여 컨테이너를 연결합니다.
- **VLAN**: 가상 LAN을 통해 컨테이너 간의 네트워킹을 지원합니다.
- **Macvlan**: 물리적 네트워크 인터페이스를 기반으로 가상 인터페이스를 생성합니다.

## CNI 표준에 따른 플러그인 개발

CNI는 플러그인이 지원해야 하는 명령어(`add`, `del`, `check`)와 인터페이스를 명확히 규정합니다. 이를 통해 다양한 컨테이너 런타임 환경에서 일관된 네트워킹 경험을 제공할 수 있습니다.

### 플러그인 구현 예시

```bash
# CNI 플러그인을 사용하여 네트워크를 구성하는 명령어
bridge add <container_id> <namespace_id>
```

이 명령은 `bridge` 플러그인을 사용하여 지정된 컨테이너에 네트워크 네임스페이스를 추가하고 네트워크 설정을 구성합니다.

## CNI와 Docker의 차이점

CNI는 Kubernetes와 같은 오케스트레이션 도구와 잘 통합되도록 설계되었지만, Docker는 기본적으로 CNM(Container Network Model)을 사용합니다. CNM도 CNI와 유사한 목표를 가지고 있지만, 구현 세부사항에서 차이가 있습니다.

## 결론

CNI는 컨테이너 네트워킹의 표준화를 위한 중요한 도구입니다. 이를 통해 개발자와 시스템 관리자는 다양한 네트워킹 요구사항을 효과적으로 관리하고, 컨테이너화된 애플리케이션의 배포와 운영을 간소화할 수 있습니다. 다음 강의에서는 CNI를 사용하여 실제 Kubernetes 환경에서 네트워킹을 구성하는 방법을 살펴보겠습니다.

## Third Party Network Plugin Providers

[Weave](https://github.com/rajch/weave#using-weave-on-kubernetes)
[Calico](https://www.tigera.io/project-calico/)
[Flannel](https://github.com/flannel-io/flannel#deploying-flannel-manually)
[Cilium](https://github.com/cilium/cilium)

## References Docs

https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/<br/>
https://kubernetes.io/docs/concepts/cluster-administration/networking/#how-to-implement-the-kubernetes-networking-model
