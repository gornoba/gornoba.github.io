# Networking Troubleshooting

- kube-proxy에 문제가 있을 경우
  - kube-proxy의 로그를 확인
  - configmap의 kube-config 확인
  - demonset 확인
- coredns에 문제가 있을 경우
  - 네트워크 플러그인이 설치되어 있는지 확인
  - CrashLoopBackOff or Error state의 경우
    - 이전 버전의 Docker로 SELinux를 실행하는 노드가 있는 경우 코어던스 파드가 시작되지 않는 시나리오가 발생할 수 있습니다. 이 문제를 해결하려면 다음 옵션 중 하나를 시도해 볼 수 있습니다:
    1. 최신 버전의 Docker로 업그레이드합니다.
    2. SELinux를 비활성화합니다.
    3. coredns 배포를 수정하여 allowPrivilegeEscalation을 true로 설정합니다
    - kubelet 구성 yaml에 다음을 추가한다
      - resolvConf: `<path-to-your-real-resolv-conf-file>`
      - 이 플래그는 kubelet이 대체 resolv.conf를 파드에 전달하도록 지시한다.
      - systemd-resolved를 사용하는 시스템의 경우, 배포에 따라 다를 수 있지만,
      - 일반적으로 `/run/systemd/resolve/resolv.conf`가 위치이다.
    - 호스트 노드에서 로컬 DNS 캐시를 비활성화하고 `/etc/resolv.conf`를 원본으로 복원합니다.
    - /etc/resolv.conf를 업스트림 DNS의 IP 주소를 `forward . 8.8.8.8`와 같이 코어파일을 편집하여 수정할 수 있다.
      - 그러나 이것은 CoreDNS의 문제만 해결하며, kubelet은 계속해서 잘못된 resolv.conf를 모든 기본 dnsPolicy 파드에 전달하여 DNS를 확인할 수 없게 만든다.

## referrence

https://kubernetes.io/docs/tasks/debug-application-cluster/debug-service/<br/>
https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/
