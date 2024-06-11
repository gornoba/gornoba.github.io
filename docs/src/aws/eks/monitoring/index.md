# Monitoring

## Grafana & Prometheus

[EBS](/aws/eks/aws-storage/#ebs)가 활성화 되어야 합니다.

### Prometheus

#### namespace 생성

```sh
kubectl create namespace monitoring
```

#### helm 레파지토리 추가

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

### Grafana

#### helm 설치

```sh
helm upgrade -i prometheus prometheus-community/prometheus \
    --namespace monitoring \
    --set alertmanager.persistentVolume.storageClass="gp2",server.persistentVolume.storageClass="gp2"
```

## Cloud Watch

https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-EKS.html

### 역할에 권한 추가

Worker노드의 EC2로 가서 iam을 클릭해 CloudWatchAgentServerPolicy 정책을 추가해준다.

### 설치

```sh
# eks 추가기능 설정
aws eks create-addon --cluster-name schclu --addon-name amazon-cloudwatch-observability
```

이후 작업 cloud watch에서 로그그룹을 통해 로그를 시각화하여 볼 수 있습니다.
