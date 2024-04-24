# 쿠버네티스 클러스터에서의 DNS 구현

## DNS의 역할

쿠버네티스 클러스터 내에서 DNS는 서비스와 포드(Pod) 간의 통신을 가능하게 하는 중요한 구성 요소입니다. DNS는 포드와 서비스의 이름을 IP 주소로 변환하여, 클러스터 내의 컴포넌트들이 서로를 찾고 소통할 수 있게 합니다.

## CoreDNS의 역할

- **CoreDNS**는 쿠버네티스의 기본 DNS 서버로, 포드와 서비스의 DNS 쿼리를 처리합니다.
- CoreDNS는 `kube-system` 네임스페이스 내에 ```, 일반적으로 레플리카셋을 통해 높은 가용성을 보장합니다.

## DNS 설정 방법

CoreDNS는 `Corefile`을 통해 구성되며, 이 파일은 다양한 DNS 관련 설정을 포함합니다.

```plaintext
. {
    kubernetes cluster.local in-addr.arpa ip6.arpa {
       pods insecure
       fallthrough in-addr.arpa ip6.arpa
    }
    prometheus :9153
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
}
```

- **플러그인 구성**: 위의 Corefile 예제에서는 Kubernetes, Prometheus, Forward, Cache 등 여러 플러그인이 구성되어 있습니다.

## 서비스 발견

- 클러스터 내의 모든 서비스는 고유한 DNS 레코드를 가지며 `서비스명.네임스페이스.svc.cluster.local` 형식으로 접근할 수 있습니다.
- 예를 들어, `my-service.default.svc.cluster.local`은 기본 네임스페이스의 `my-service` 서비스를 가리킵니다.

## 포드 DNS 레코드

- 포드에 대한 DNS 레코드는 기본적으로 생성되지 않지만, CoreDNS 설정에서 이를 활성화할 수 있습니다.
- 포드의 IP 주소를 기반으로 DNS 레코드가 생성되며, 이를 통해 다른 포드가 해당 포드를 찾을 수 있습니다.

## 실습

1. `kubectl get services --all-namespaces` 명령을 사용하여 클러스터의 모든 서비스를 조회합니다.
2. `kubectl exec`을 사용하여 포드 내부에서 DNS 쿼리를 실행해 보며, 서비스와 다른 포드를 어떻게 찾는지 실습합니다.
3. CoreDNS의 로그를 확인하여 DNS 쿼리 처리 과정을 이해합니다.

## 결론

쿠버네티스에서 DNS는 클러스터의 핵심 네트워킹 구성 요소로, 서비스 디스커버리 및 포드 간 통신을 용이하게 합니다.

## References Docs

https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#services
https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pods
