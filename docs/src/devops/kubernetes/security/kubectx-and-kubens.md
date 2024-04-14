# Kubectx와 Kubens 소개

Kubectx와 Kubens는 Kubernetes 클러스터에서 컨텍스트와 네임스페이스를 쉽게 전환할 수 있도록 도와주는 명령줄 도구입니다. 이 도구들은 복잡한 클러스터 환경에서 작업할 때 시간을 절약하고 효율을 증가시키는 데 매우 유용합니다.

## Kubectx

- **목적**: 여러 클러스터 간의 컨텍스트를 빠르게 전환합니다.
- **설치 방법**:
  ```bash
  sudo git clone https://github.com/ahmetb/kubectx /opt/kubectx
  sudo ln -s /opt/kubectx/kubectx /usr/local/bin/kubectx
  ```
- **사용법**:
  - 모든 컨텍스트 나열: `kubectx`
  - 새 컨텍스트로 전환: `kubectx <context_name>`
  - 이전 컨텍스트로 돌아가기: `kubectx -`
  - 현재 컨텍스트 확인: `kubectx -c`

## Kubens

- **목적**: 네임스페이스를 빠르게 전환합니다.
- **설치 방법**:
  ```bash
  sudo git clone https://github.com/ahmetb/kubectx /opt/kubectx
  sudo ln -s /opt/kubectx/kubens /usr/local/bin/kubens
  ```
- **사용법**:
  - 새 네임스페이스로 전환: `kubens <new_namespace>`
  - 이전 네임스페이스로 돌아가기: `kubens -`

## 요약

이 도구들은 복잡한 `kubectl config` 명령어를 사용하지 않고도 클러스터 및 네임스페이스 간의 전환을 간단하게 할 수 있게 도와줍니다. 실제 운영 환경에서 클러스터를 효율적으로 관리하는 데 큰 도움이 됩니다.
