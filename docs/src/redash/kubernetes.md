# Kubernetes를 통한 redash 설치

## link

https://github.com/getredash/contrib-helm-chart

## helm

쿠버네티스는 helm으로 개인들이 모여서 계속 업데이트가 이뤄지고 있습니다.  
docker 이미지는 업데이트가 예저에 멈춘데 비해서 helm은 꾸준히 업데이트가 되고 있어서 좋은 것 같습니다.  
대부분 세팅이 끝나 있어서 [values.yaml](https://github.com/getredash/contrib-helm-chart/blob/master/charts/redash/values.yaml) 부분의 필요한 부분만 받아 설치하면 끝입니다.  
저는 eks를 이용하였습니다.

## values.yaml

제가 수정했던 부분만 넣도록 하겠습니다.

### image

원래 내용을 보면 `redash/preview`를 이용하는데 그것보다는 안정화된 버전을 이용하는 것이 좋을 것 같아서 아래와 같이 이요하였습니다.

```yaml
image:
  registry: docker.io
  repo: redash/redash
  tag: 10.0.0.b50363
  pullPolicy: IfNotPresent
```

### redash env

```yaml
redash:
  secretKey: $(openssl rand -base64 32)
  cookieSecret: $(openssl rand -base64 32)
  mailServer: "smtp.gmail.com"
  mailPort: "587"
  mailUseTls: "true"
  mailUsername: "<이메일주소>"
  mailPassword: "<비밀번호>"
  mailDefaultSender: "<이메일주소>"
```

### ingress

저는 alb와 externalDNS를 이용하여 도메인을 설정하였습니다.  
만약 externalDNS를 이용하지 않는다면 router 53에서 A레코드의 별칭을 alb로 생성된 loadbalancer를 선택해주시면 될 것 같습니다.

```yaml
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: "alb"
    alb.ingress.kubernetes.io/load-balancer-name: redash-ingress
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/healthcheck-protocol: HTTP
    alb.ingress.kubernetes.io/healthcheck-port: traffic-port
    alb.ingress.kubernetes.io/healthcheck-path: /ping
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80, "HTTPS":443}]'
    alb.ingress.kubernetes.io/certificate-arn: <인증서 arn>
    alb.ingress.kubernetes.io/ssl-redirect: "443"
    meta.helm.sh/release-name: redash
    meta.helm.sh/release-namespace: redash

  hosts:
    - host: <도메인>
      paths: ["/"]
```

### postgres

만약 helm의 postgres를 사용하신다면 아래와 같이 하시면 됩니다.

```yaml
postgresql:
  enabled: true
  primary:
    service:
      ports:
        postgresql: 5432
  auth:
    username: <아이디>
    password: $(openssl rand -base64 32)
    database: <데이터베이스 이름>
```

만약 저와 같이 외부의 postgres를 이용하신다면 아래와 같이 하시면 됩니다.

```yaml
externalPostgreSQL: postgresql://<아이디>:<비밀번호>@<host>:<port>/<database>
# 만약 secret를 만든다면..
externalPostgreSQL: postgresql://<아이디>:$(POSTGRESQL_PASSWORD)@<host>:<port>/<database>
externalPostgreSQLSecret:
  name: redash-postgres
  key: POSTGRESQL_PASSWORD

postgresql:
  enabled: false
```

저는 eks를 private로 만들고 rds를 사용하여서 external service도 함께 만들어 주었습니다.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: database
  namespace: redash
spec:
  type: ExternalName
  externalName: <RDS endpoint>
```

### redis

redis의 password는 반드시 설정해야 합니다.  
replicaCount를 늘리면 redis가 cluster모드로 작동하게 됩니다.  
만약 스케줄 및 noti가 많다면 사용하면 좋을 것 같습니다.

```yaml
redis:
  enabled: true
  auth:
    password: $(openssl rand -base64 32)
  database: 0
  master:
    service:
      ports:
        redis: 6379
  replica:
    replicaCount: 0
```

## 실행

```sh
helm upgrade --install -f values.yaml redash redash/redash -n redash
```

## TroubleShooting

### redis 비밀번호 오류

수정작업을 하다가 보면 sever pod에서 redis 비밀번호가 맞지 않다는 오류가 뜹니다.  
가끔 발생하는 것 같은데 그럴경우 server deploy를 rollout restart해주면 잘 됩니다.

### outbound 통신이 안되는 경우

이것은 아직도 원인을 밝혀내지 못하고 있습니다.  
기가막히게 server의 replia 숫자를 늘리면 outbound 통신이 안되서 database 접속이 안됩니다.  
그런데 1개로 만들면 잘 되고 그 안에서 scale up하면 문제없이 잘 됩니다.  
어쩌면 alb의 문제인가 싶기도 합니다.
