# Application Load Balancer

https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/aws-load-balancer-controller.html
공식문서에서 필수조건을 모두 완료했다는 전제하에 시작됩니다.

## 설치

### IAM 역할 생성

#### 정책 다운로드

```sh
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.7.2/docs/install/iam_policy.json
```

#### 정책생성

```sh
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
```

#### eksctl을 사용하여 IAM 역할 생성

```sh
eksctl create iamserviceaccount \
  --cluster=eksnest \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --role-name AmazonEKSLoadBalancerControllerRole \
  --attach-policy-arn=arn:aws:iam::637423522620:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve
```

#### eksctl을 통하여 iam service account 확인

```sh
eksctl get iamserviceaccount --cluster eksnest
kubectl describe sa aws-load-balancer-controller -n kube-system
```

### AWS Load Balancer Controller 설치

#### helm 설치

https://helm.sh/docs/intro/install/

#### Helm을 통한 설치

```sh
helm repo add eks https://aws.github.io/eks-charts # repository 추가
helm repo update eks # 차트 업데이트
# 설치
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=eksnet \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  --set region=ap-northeast-2 \
  --set vpcId=vpc-<id> \
  --set image.repository=602401143452.dkr.ecr.ap-northeast-2.amazonaws.com/amazon/aws-load-balancer-controller
```

#### 설치확인

```sh
helm search repo eks/aws-load-balancer-controller --versions
kubectl get deployment -n kube-system aws-load-balancer-controller
```
