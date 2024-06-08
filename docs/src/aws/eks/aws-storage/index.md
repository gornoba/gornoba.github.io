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

[Github Link]()
https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/ebs-csi.html

## IAM 역할 설정

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

## EBS CSI 드라이버 추가

```sh
eksctl create addon --name aws-ebs-csi-driver --cluster <cluster-name> --service-account-role-arn arn:aws:iam::<role-number>:role/AmazonEKS_EBS_CSI_DriverRole --force
```
