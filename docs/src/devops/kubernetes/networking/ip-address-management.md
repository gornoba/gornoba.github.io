# 쿠버네티스에서의 IP 주소 관리 (IPAM)

## IPAM이란?

IP 주소 관리(IP Address Management, IPAM)는 네트워크의 IP 주소 할당, 트랙킹 및 관리를 체계적으로 수행하는 프로세스입니다. 쿠버네티스에서 IPAM은 포드와 서비스에 IP 주소를 동적으로 할당하는 역할을 합니다.

## 쿠버네티스에서의 IPAM 구현 방법

쿠버네티스는 CNI(Container Network Interface) 플러그인을 통해 네트워크 및 IPAM 구성을 관리합니다. 각 CNI 플러그인은 IPAM 요구사항을 충족하기 위해 다양한 방식을 제공할 수 있습니다.

### 기본 CNI IPAM 플러그인

- **host-local**: 각 호스트별로 IP 주소를 관리하는 로컬 IPAM 솔루션입니다. 이 플러그인은 지정된 서브넷에서 IP 주소를 할당하며, 각 노드는 독립적으로 IP 주소 범위를 관리합니다.
- **dhcp**: DHCP 서버를 사용하여 포드에 IP 주소를 동적으로 할당하는 IPAM 솔루션입니다.

### IPAM 설정 예시

CNI 구성 파일에서 IPAM 섹션을 통해 IPAM 플러그인을 설정할 수 있습니다. 예를 들어, `host-local` 플러그인을 사용하는 경우의 구성은 다음과 같습니다:

```json
{
  "cniVersion": "0.3.1",
  "name": "mynet",
  "type": "bridge",
  "bridge": "kube-bridge",
  "isGateway": true,
  "ipMasq": true,
  "ipam": {
    "type": "host-local",
    "subnet": "10.22.0.0/16",
    "routes": [{ "dst": "0.0.0.0/0" }]
  }
}
```

## Weave CNI 플러그인에서의 IPAM

Weave는 자체적인 방식으로 IPAM을 구현합니다. Weave는 클러스터 전체에 대해 대규모 IP 주소 범위(예: 10.32.0.0/12)를 관리하고, 각 노드에 서브넷을 할당하여 포드에 IP 주소를 분배합니다.

### Weave의 IPAM 구성 방식

- **자동 IP 할당**: Weave는 네트워크에 연결된 각 포드에 자동으로 IP 주소를 할당합니다.
- **네트워크 세분화**: 큰 IP 범위를 여러 노드에 걸쳐 세분화하여 관리하며, 이를 통해 효율적인 IP 주소 관리가 가능합니다.

## 실습: IPAM 구성 및 관리

이론적인 부분을 학습한 후, 실습 섹션에서는 실제 쿠버네티스 클러스터에서 IPAM 설정을 직접 구현하고 테스트합니다. 다음과 같은 실습을 수행할 수 있습니다:

1. **CNI 플러그인 설정**: 쿠버네티스 클러스터에 CNI 플러그인을 설정하고 IPAM 구성을 확인합니다.
2. **IP 할당 확인**: 포드에 할당된 IP 주소를 확인하고, IPAM 로그를 통해 IP 할당 과정을 분석합니다.

### 실습

1. 네트워크 솔루션을 어떻게 확인하는가?
   `etc/cni/net.d/`를 살펴보면 알 수 있다.
2. 얼마나 많은 `agennts/peers`가 있는가?
   `kubectl get pod -n kube-system`
3. `weave`의 ip address range는?
   `ip addr show weave`
4. `node01`의 pod schedule의 default gateway의 ip는?
   `ssh node01` > `ip route`
   ```sh
   kubectl run busybox --image=busybox --dry-run=client -o yaml -- sleep 1000 > busybox.yaml # spec.nodename: node01
   kubectl exec busybox -- ip route
   ```

## References Docs

https://kubernetes.io/docs/concepts/cluster-administration/networking/
