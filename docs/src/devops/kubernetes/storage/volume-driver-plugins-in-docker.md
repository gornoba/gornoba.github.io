# Docker 저장 드라이버와 볼륨 드라이버 플러그인

이 강의에서는 Docker의 저장 드라이버와 볼륨 드라이버 플러그인의 역할에 대해 배웁니다. 저장 드라이버는 이미지와 컨테이너의 저장공간을 관리하는 반면, 볼륨 드라이버 플러그인은 데이터의 영속성을 보장하는 데 중요한 역할을 합니다.

## 볼륨 드라이버 플러그인의 기능

볼륨 드라이버 플러그인은 Docker 호스트에서 데이터를 영구적으로 저장할 수 있도록 도와줍니다. 기본 볼륨 드라이버인 `local`은 `/var/lib/docker/volumes` 디렉토리 아래에 볼륨을 생성합니다.

### 다양한 볼륨 드라이버 플러그인

Docker는 여러 서드파티 볼륨 드라이버 플러그인을 지원하여, AWS, Google Cloud, Azure 등 다양한 클라우드 서비스에서 볼륨을 생성할 수 있게 합니다.

| 볼륨 드라이버 | 지원하는 스토리지                                          |
| ------------- | ---------------------------------------------------------- |
| REX-Ray       | AWS EBS, S3, EMC, Google Persistent Disk, OpenStack Cinder |
| Portworx      | Kubernetes, Swarm, Cloud and On-prem environments          |
| Flocker       | Amazon EBS, Rackspace, OpenStack                           |

### 볼륨 생성 및 컨테이너 실행 예시

AWS의 EBS를 사용하여 볼륨을 생성하고 컨테이너에 연결하는 방법은 다음과 같습니다.

```bash
# REX-Ray EBS 볼륨 드라이버를 사용하여 볼륨 생성 및 컨테이너 실행
docker run -it --volume-driver=rexray/ebs -v myvolume:/data busybox
```

이 명령은 AWS EBS에서 `myvolume`이라는 볼륨을 생성하고, 이를 컨테이너의 `/data` 디렉토리에 마운트하여 실행합니다.

## 요약

- **저장 드라이버**는 이미지와 컨테이너의 데이터를 관리합니다.
- **볼륨 드라이버 플러그인**은 데이터의 영속성을 보장하고, 다양한 스토리지 솔루션과 통합을 제공합니다.
- 데이터가 안전하게 보관되어야 할 경우, 적절한 볼륨 드라이버를 선택하여 볼륨을 생성하고 사용해야 합니다.

## Docker Reference Docs

https://docs.docker.com/engine/extend/legacy_plugins/
https://github.com/rexray/rexray
