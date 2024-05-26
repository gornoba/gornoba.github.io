# Create EKS Cluster & Node Groups

## Create EKS Cluster using eksctl

```sh
# Create Cluster
eksctl create cluster --name=eksdemo1 --region=ap-northeast-2 --zones=ap-northeast-2a,ap-northeast-2b --without-nodegroup

# Get List of clusters
eksctl get cluster
```

## Create & Associate IAM OIDC Provider for our EKS Cluster

```sh
eksctl utils associate-iam-oidc-provider --region ap-northeast-2 --cluster eksdemo1 --approve
```

## Create EC2 Keypair

EC2 > 네트워크 및 보안 > 키 페어 > 키 페어 생성 > 이름 적고 그대로 생성

## Create Node Group with additional Add-Ons in Public Subnets

```sh
# Create Public Node Group
eksctl create nodegroup --cluster=eksdemo1 \
                       --region=ap-northeast-2 \
                       --name=eksdemo1-ng-public1 \
                       --node-type=t2.micro \
                       --nodes=2 \
                       --nodes-min=2 \
                       --nodes-max=4 \
                       --node-volume-size=20 \
                       --ssh-access \
                       --ssh-public-key=kube-demo \
                       --managed \
                       --asg-access \
                       --external-dns-access \
                       --full-ecr-access \
                       --appmesh-access \
                       --alb-ingress-access
```

### `eksctl create nodegroup`

- **용도**: EKS 클러스터에 새로운 노드 그룹을 생성하는 명령어.
- **사용 예**: Kubernetes 클러스터를 확장하거나, 특정 용도에 맞는 노드 그룹을 추가할 때 사용.

### `--cluster=eksdemo1`

- **용도**: 노드 그룹을 추가할 대상 EKS 클러스터의 이름을 지정.
- **사용 예**: 여러 클러스터를 운영 중일 때, 특정 클러스터에 노드 그룹을 추가할 때 사용.

### `--region=ap-northeast-2`

- **용도**: 클러스터가 위치한 AWS 리전(지역)을 지정.
- **사용 예**: EKS 클러스터를 배포할 지리적 위치를 결정. 예를 들어, 서울 리전(ap-northeast-2)을 선택하면 서울 데이터 센터에서 클러스터 운영.

### `--name=eksdemo1-ng-public1`

- **용도**: 생성할 노드 그룹의 이름을 지정.
- **사용 예**: 노드 그룹을 식별하기 쉽게 이름을 지정하여, 관리와 운영을 용이하게 함.

### `--node-type=t2.micro`

- **용도**: 노드 그룹의 EC2 인스턴스 타입을 지정. 프리티어로 지정
- **사용 예**: 워크로드의 요구사항에 맞게 적절한 인스턴스 타입을 선택. t2.micro는 비용이 저렴하여 개발/테스트 환경에 적합.

### `--nodes=2`

- **용도**: 노드 그룹의 초기 노드 수를 지정.
- **사용 예**: 클러스터 생성 시점에 몇 개의 노드를 생성할지 결정. 초기 노드 수는 클러스터의 초기 용량을 설정하는 데 중요.

### `--nodes-min=2`

- **용도**: 노드 그룹의 최소 노드 수를 지정.
- **사용 예**: 자동 확장(Auto Scaling) 시 최소한 유지해야 하는 노드 수를 설정. 최소 2개 노드를 유지함으로써 기본 가용성을 확보.

### `--nodes-max=4`

- **용도**: 노드 그룹의 최대 노드 수를 지정.
- **사용 예**: 자동 확장(Auto Scaling) 시 최대 허용 노드 수를 설정. 최대 4개 노드를 설정하여, 필요 시 최대한의 확장성을 확보.

### `--node-volume-size=20`

- **용도**: 각 노드의 EBS 볼륨 크기를 지정.
- **사용 예**: 노드에서 사용할 디스크 공간을 설정. 예를 들어, 데이터베이스나 로그 파일이 많은 경우 더 큰 볼륨이 필요할 수 있음.

### `--ssh-access`

- **용도**: SSH를 통해 노드에 접근할 수 있도록 설정.
- **사용 예**: 노드에 직접 접근하여 디버깅하거나, 로그를 확인하거나, 관리 작업을 수행할 수 있음.

### `--ssh-public-key=kube-demo`

- **용도**: SSH 접근을 위한 공개 키의 이름을 지정.
- **사용 예**: 노드에 SSH로 접근할 때 사용할 공개 키를 설정. `kube-demo` 키를 통해 접근 권한을 관리.

### `--managed`

- **용도**: 관리형 노드 그룹을 생성.
- **사용 예**: AWS가 노드 그룹의 수명 주기(생성, 업데이트, 삭제)를 자동으로 관리하게 함. 관리 부담을 줄이고 AWS의 관리 기능을 활용.

### `--asg-access`

- **용도**: 노드 그룹이 자동 확장 그룹(Auto Scaling Group)과 상호작용할 수 있는 권한을 부여.
- **사용 예**: 워크로드에 따라 자동으로 노드 수를 조정할 수 있게 함. 예를 들어, 트래픽 증가 시 자동으로 노드를 추가할 수 있음.

### `--external-dns-access`

- **용도**: External DNS와 상호작용할 수 있는 권한을 노드 그룹에 부여.
- **사용 예**: Kubernetes 클러스터가 자동으로 DNS 레코드를 생성 및 업데이트할 수 있게 함. 예를 들어, 도메인 이름을 Kubernetes 서비스에 매핑할 때 사용.

### `--full-ecr-access`

- **용도**: AWS Elastic Container Registry(ECR)와 상호작용할 수 있는 완전한 권한을 노드 그룹에 부여.
- **사용 예**: ECR에서 컨테이너 이미지를 풀(Pull)하거나 푸시(Push)할 수 있게 함. ECR을 사용해 컨테이너 이미지를 저장하고 배포할 때 유용.

### `--appmesh-access`

- **용도**: AWS App Mesh와 상호작용할 수 있는 권한을 노드 그룹에 부여.
- **사용 예**: 서비스 메시를 사용하여 마이크로서비스 간의 통신을 관리하고 모니터링할 때 사용. App Mesh를 통해 트래픽 제어 및 관리를 용이하게 함.

### `--alb-ingress-access`

- **용도**: AWS Application Load Balancer(ALB) Ingress Controller와 상호작용할 수 있는 권한을 노드 그룹에 부여.
- **사용 예**: ALB를 통해 Kubernetes 클러스터에 외부 트래픽을 라우팅할 때 사용. Ingress 리소스를 통해 ALB를 설정하고 관리할 수 있음.

## 확인

- EKS, VPC, EC2, IAM, 보안그룹, CloudFormation이 제대로 생성되어 있는지 확인
- EC2가 private key로 ssh 접속 가능한지 확인
- 공부를 위해서 EC2의 보안그룹에 inbound를 모두 수용하게 설정
