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

## 구현

https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/alb-ingress.html<br/>
한참동안을 삽질 했던 것 같습니다. Udemy에서 들었던 강의가 많은 내용을 담고 있어서 참 많은 도움이 되긴 했지만 4년전에 만들어진 강의라 변경된 것도 많은 것 같습니다.  
ALB를 설치하고 나서 ingress class가 저절로 만들어지는데 굳이 왜 새롭게 만들어 쓰나 했는데 새롭게 만들필요가 없었습니다.  
그냥 spec.ingressClassName에 alb만 추가해주면 됩니다.  
만약 쓰기 싫다면 ingress class의 annotiations에 `ingressclass.kubernetes.io/is-default-class: "true"`를 추가해주면 됩니다.  
관련된 주석에 관한 내용은 [Ingress annotations](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.7/guide/ingress/annotations/)을 참고시면 될 것 같습니다.

### basic

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: <name>
  labels:
    <key: value>
  annotations:
    alb.ingress.kubernetes.io/load-balancer-name: <load balancer name>
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/healthcheck-protocol: HTTP
    alb.ingress.kubernetes.io/healthcheck-port: traffic-port
    # alb.ingress.kubernetes.io/healthcheck-path: /
    alb.ingress.kubernetes.io/healthcheck-interval-seconds: "15"
    alb.ingress.kubernetes.io/healthcheck-timeout-seconds: "5"
    alb.ingress.kubernetes.io/success-codes: "200"
    alb.ingress.kubernetes.io/healthy-threshold-count: "2"
    alb.ingress.kubernetes.io/unhealthy-threshold-count: "2"
spec:
  ingressClassName: alb
  defaultBackend:
    service:
      name: default-service
      port:
        number: 80
  rules:
    - http:
        paths:
          - path: /app1
            pathType: Prefix
            backend:
              service:
                name: app1-service
                port:
                  number: 80
          - path: /app2
            pathType: Prefix
            backend:
              service:
                name: app2-service
                port:
                  number: 80
```

- defaultBackend: 경로 규칙에 일치하지 않는 요청을 처리하는 기본 백엔드 서비스를 지정. 일종의 "fallback" 서비스로 작동.
- rules: 특정 경로나 호스트에 대한 명확한 트래픽 라우팅 규칙을 정의. 각 규칙은 특정 조건을 만족할 때 트래픽을 특정 서비스로 전달.
  - 위과 같이 contextPath 기반으로 여러 서비스를 라우팅을 할 경우 NodePort 서비스의 annotations에서 healthcheck가 필요함.
  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: app3-nginx-nodeport-service
    labels:
      app: app3-nginx
    annotations:
      alb.ingress.kubernetes.io/healthcheck-path: /index.html
  spec:
    type: NodePort
    selector:
      app: app3-nginx
    ports:
      - port: 80
        targetPort: 80
  ```
