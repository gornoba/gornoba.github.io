# EKS Storage

## EBS와 EFS 비교

| **특성**          | **Amazon EBS**                                                     | **Amazon EFS**                                                                     |
| ----------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **타입**          | 블록 스토리지                                                      | 파일 스토리지                                                                      |
| **사용 사례**     | 데이터베이스 저장, 로그 저장, 파일 시스템 필요로 하는 애플리케이션 | 여러 인스턴스에서 공유하는 파일 시스템, 콘텐츠 관리 시스템, 빅 데이터 및 분석 작업 |
| **성능**          | 고성능 및 저지연, 다양한 볼륨 타입 제공, IOPS 및 처리량 조절 가능  | 지연 시간이 길고 처리량이 높은 워크로드에 적합, 퍼포먼스 및 처리량 모드 제공       |
| **데이터 접근성** | 하나의 EC2 인스턴스에만 연결 가능, 다중 연결 모드 지원             | 여러 EC2 인스턴스, EKS 파드에서 동시에 접근 가능, NFSv4.1 및 NFSv4.0 프로토콜 지원 |
| **가용성**        | 특정 가용 영역(AZ)에 종속적, AZ 내 고가용성 보장                   | 리전 전체에 걸쳐 고가용성 보장, 여러 가용 영역에 걸쳐 데이터 복제                  |
| **백업 및 복구**  | 스냅샷 기능 제공, 스냅샷을 통해 다른 리전으로 데이터 복사 가능     | 내장된 백업 기능 없음, 별도의 백업 솔루션 필요                                     |
| **비용**          | 사용한 용량에 따라 비용 청구, 높은 성능 요구 시 비용 증가 가능     | 사용한 용량에 따라 비용 청구, 동적 스케일링으로 비용 절감 가능                     |

## empty-dir로 테스트

[Github Link](https://github.com/gornoba/eks-nest/tree/7340926c0d2667e42f663644d882f6b78a4bea63/aws/storage/empty-dir)

간단하게 backend와 database pod을 만들어 놓고 테스트를 먼저 해봤습니다.

### Empty Dir

empty-dir은 pod이 지워지면 volume도 같이 삭제됩니다.  
https://kubernetes.io/docs/concepts/storage/volumes/#emptydir

### Liveness, Readiness

https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/

#### Liveness Probe

`livenessProbe`는 컨테이너가 "살아 있는지"를 확인하는 데 사용됩니다. 즉, 컨테이너가 아직도 작동하고 있으며 응답이 있는지 확인합니다. 이 프로브가 실패하면, Kubernetes는 컨테이너를 다시 시작합니다.

주요 용도

- 애플리케이션 복구: 애플리케이션이 특정 오류 상태에 빠져 응답하지 않는 경우, `livenessProbe`가 이를 감지하고 컨테이너를 재시작합니다.
- 데드락 방지: 프로세스가 데드락에 걸리거나 무한 루프에 빠졌을 때 이를 감지하여 복구합니다.

#### Readiness Probe

`readinessProbe`는 컨테이너가 "준비가 되었는지"를 확인하는 데 사용됩니다. 즉, 트래픽을 받을 준비가 되었는지 확인합니다. 이 프로브가 실패하면, Kubernetes는 해당 컨테이너에 대한 트래픽을 서비스에서 제외합니다.

주요 용도

- 서비스 가용성: 컨테이너가 트래픽을 받을 준비가 되지 않았을 때 이를 감지하여 트래픽을 차단함으로써, 서비스의 안정성을 보장합니다.
- 애플리케이션 초기화: 애플리케이션이 초기화 과정을 완료하지 않았거나, 외부 서비스와의 연결을 설정하지 않은 경우, 트래픽을 받지 않도록 합니다.

### Init Containers

https://kubernetes.io/docs/concepts/workloads/pods/init-containers/

`init Container`는 아래와 같은 용도로 많이 사용 됩니다.  
여기서는 postres가 실행될때까지 기다리는 용도로 사용되었습니다.

- 애플리케이션 설정: 메인 컨테이너가 시작되기 전에 필요한 설정 파일을 다운로드하거나 설정을 적용하는 작업.
- 데이터베이스 마이그레이션: 데이터베이스 마이그레이션 스크립트를 실행하여 메인 애플리케이션이 실행되기 전에 데이터베이스를 준비하는 작업.
- 권한 설정: 필요한 파일이나 디렉토리에 적절한 권한을 설정하는 작업.

## EBS

[Github Link](https://github.com/gornoba/eks-nest/tree/f848c3d785e92e1ce0a9da60d7e2c20e8d13db01/aws/storage/ebs)<br/>
https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/ebs-csi.html<br/>
https://github.com/kubernetes-sigs/aws-ebs-csi-driver/tree/master/examples/kubernetes<br/>
프리티어인 t2.micro로 진행이 안되서 t3.medium으로 노드그룹을 다시 만들고 진행하였습니다.

### IAM 역할 설정

```sh
eksctl create iamserviceaccount \
    --name ebs-csi-controller-sa \
    --namespace kube-system \
    --cluster <cluster-name> \
    --role-name AmazonEKS_EBS_CSI_DriverRole \
    --role-only \
    --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
    --approve
```

### EBS CSI 드라이버 추가

```sh
eksctl create addon --name aws-ebs-csi-driver --cluster <cluster-name> --service-account-role-arn arn:aws:iam::<role-number>:role/AmazonEKS_EBS_CSI_DriverRole --force
```

### Storage Class

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-sc
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
allowVolumeExpansion: true
parameters:
  type: gp3
  fsType: ext4
  encrypted: "true"
  kmsKeyId: arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef
  iopsPerGiB: "3"
  throughputPerGiB: "125"
allowedTopologies:
  - matchLabelExpressions:
      - key: topology.ebs.csi.aws.com/zone
        values:
          - ap-northeast-2a
          - ap-northeast-2b
```

#### volumeBindingMode

PV가 바인딩될 시점을 지정합니다.

- Immediate: PVC가 생성되면 즉시 PV를 바인딩합니다.
- WaitForFirstConsumer: PVC가 Pod에 바인딩될 때까지 대기합니다.

#### reclaimPolicy

PVC가 삭제된 후 PV를 어떻게 처리할지를 지정합니다.

- Retain: PV를 유지합니다.
- Delete: PV를 삭제합니다.

#### allowVolumeExpansion

PV의 크기를 확장할 수 있는지 여부를 지정합니다.

#### type

- gp2: General Purpose SSD (이전 세대)
- gp3: General Purpose SSD (최신 세대, 기본값)
- io1: Provisioned IOPS SSD
- sc1: Cold HDD
- st1: Throughput Optimized HDD
- standard: Magnetic

#### fsType

EBS 볼륨이 파일 시스템으로 포맷될 때 사용되는 파일 시스템 유형을 지정합니다.  
이는 PV가 Pod에 마운트될 때 파일 시스템이 자동으로 포맷되고, 마운트되는 방식을 결정합니다.

- ext4: 리눅스에서 가장 널리 사용되는 파일 시스템 유형 중 하나로, 일반적인 용도로 적합합니다.
- xfs: 대용량 데이터베이스와 같이 고성능이 요구되는 경우 사용됩니다.
- 그 외 btrfs, ext3 등 다른 파일 시스템 유형도 지정할 수 있습니다.

#### encrypted, kmsKeyId

EBS 볼륨을 암호화할지 여부를 지정합니다.  
EBS 볼륨 암호화에 사용할 KMS (Key Management Service) 키의 ID를 지정합니다.

#### iopsPerGiB

IOPS(Input/Output Operations Per Second) 성능을 지정하는 옵션 gp3 또는 io1 볼륨에만 해당됩니다.

- GiB당 제공될 IOPS 수를 지정합니다.
- EBS gp3 볼륨은 기본적으로 GiB당 3 IOPS를 제공합니다.
- IOPS 성능은 특정 용량 이상에서만 적용되며, 성능을 높일수록 비용이 증가합니다.

#### throughputPerGiB

gp3 볼륨에 대해 GiB당 스루풋 (Throughput)을 지정합니다.

- GiB당 제공될 스루풋을 지정합니다.
- 스루풋은 볼륨이 데이터를 전송할 수 있는 속도를 의미합니다.
- gp3 볼륨은 기본적으로 GiB당 125 MiB/s의 스루풋을 제공합니다.

#### allowedTopologies

토폴로지 키와 값을 매칭하여 PV가 해당 토폴로지에서만 프로비저닝되도록 제한합니다.

## EFS

[Github Link](https://github.com/gornoba/eks-nest/tree/b2fd0d6512f454c18e81fb8fc7ae949ea7cf5b6a/aws/storage/efs)<br/>
https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/efs-csi.html<br/>
https://github.com/kubernetes-sigs/aws-efs-csi-driver/tree/master/examples/kubernetes

### IAM

```sh
export cluster_name=eksnest
export role_name=AmazonEKS_EFS_CSI_DriverRole
eksctl create iamserviceaccount \
    --name efs-csi-controller-sa \
    --namespace kube-system \
    --cluster $cluster_name \
    --role-name $role_name \
    --role-only \
    --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEFSCSIDriverPolicy \
    --approve
TRUST_POLICY=$(aws iam get-role --role-name $role_name --query 'Role.AssumeRolePolicyDocument' | \
    sed -e 's/efs-csi-controller-sa/efs-csi-*/' -e 's/StringEquals/StringLike/')
aws iam update-assume-role-policy --role-name $role_name --policy-document "$TRUST_POLICY"
```

### EFS CSI 드라이버 추가

공식문서 가보면 console에서 추가라하고 권장합니다. 시키는데로 해봅시다.  
EKS > 클러스터 > 클러스터 이름 클릭 > 추가기능 > Amazon EFS CSI 드라이버 선택 > 위에서 만든 IAM 역할 선택, VPC는 EKS의 VPC 선택 > 생성

### 보안그룹추가

EC2 > 보안 그룹 > 보안 그룹 생성  
이름 원하는것을 기재하고 VPC를 EKS가 생성되면서 만들어진 VPC 선택, 인바운드 규칙은 유형은 NFS, 소스는 VPC의 IPv4 CIDR를 기재해준다. IPv4 CIDR는 VPC를 가면 확인할 수 있다.  
이후 EFS > 만든 EFS 선택 > 네트워크 액세스를 들어가서 만든 보안그룹을 선택하고 저장해준다. 2개,3개가 있으면 모두 선택해야 한다.
