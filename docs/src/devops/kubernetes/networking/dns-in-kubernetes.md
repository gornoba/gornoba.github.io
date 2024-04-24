# 쿠버네티스 클러스터 내 DNS 개요

## DNS의 역할과 중요성

쿠버네티스 클러스터 내의 DNS는 포드(Pod), 서비스(Service) 등의 컴포넌트 간 통신을 위해 필수적인 이름 해석 기능을 제공합니다. DNS를 통해 클러스터 내부의 리소스를 쉽게 찾고 연결할 수 있습니다.

## 쿠버네티스의 내장 DNS 서버

- 쿠버네티스 설치 시 기본적으로 DNS 서버(CoreDNS)가 배포됩니다.
- CoreDNS는 클러스터 내부의 이름 해석을 담당하며, 각 서비스와 포드에 대한 DNS 레코드를 관리합니다.

## 서비스 DNS 레코드

- 모든 쿠버네티스 서비스는 고유의 DNS 레코드를 갖습니다.
- 예를 들어, `webservice`라는 이름의 서비스가 `apps` 네임스페이스에 있을 경우, 전체 DNS 이름은 `webservice.apps.svc.cluster.local`입니다.
- 이 이름을 사용하여 클러스터 내의 어떤 포드에서든 해당 서비스에 접근할 수 있습니다.

## 포드 DNS 레코드

- 포드에 대한 DNS 레코드는 기본적으로 생성되지 않지만, 필요에 따라 설정할 수 있습니다.
- 포드의 DNS 레코드는 포드의 IP 주소를 기반으로 생성되며, 포드의 IP 주소의 각 점(`.`)을 하이픈(`-`)으로 대체하여 구성됩니다.

## DNS 레코드 해석

- 쿠버네티스 클러스터 내에서 서비스 또는 포드에 접근하기 위해 DNS 레코드를 사용합니다.
- 예: `curl http://my-service.default.svc.cluster.local:80` - 이 커맨드는 클러스터 내에서 `my-service` 서비스로 HTTP 요청을 보냅니다.

## References Docs

https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/
https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/
