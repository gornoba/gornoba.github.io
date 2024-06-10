# Classic and Network LoadBalancers

## Private Subnet에 EKS nodegroup 생성

### 기존 nodegroup 삭제

```sh
eksctl delete nodegroup eksnest-ng-public1 --cluster eksnest
```

### nodegroup 생성

```sh
eksctl create nodegroup --cluster=eksnest \
                       --region=ap-northeast-2 \
                       --name=eksnest-ng-private \
                       --node-type=t3.medium \
                       --nodes=2 \
                       --nodes-min=2 \
                       --nodes-max=4 \
                       --node-volume-size=20 \
                       --ssh-access \
                       --ssh-public-key=eksnest \
                       --managed \
                       --asg-access \
                       --external-dns-access \
                       --full-ecr-access \
                       --appmesh-access \
                       --alb-ingress-access \
                       --node-private-networking
```

nodegroup을 생성할 때 private subnet의 routing table에 rds 접속용으로 기재해놓을 것 삭제해야 합니다.

## Classic LoadBalancer

```yaml
apiVersion: v1
kind: Service
metadata:
  name: <이름>
  labels:
    <key: value>
spec:
  type: LoadBalancer # Default - CLB
  selector:
    <key: value>
  ports:
    - port: <port>
      targetPort: <targetPort>
```

## Newtwork LoadBalancer

```yaml
apiVersion: v1
kind: Service
metadata:
  name: <이름>
  labels:
    <key: value>
  ations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb # To create Network Load Balancer
spec:
  type: LoadBalancer
  selector:
    <key: value>
  ports:
    - port: <port>
      targetPort: <targetPort>
```
