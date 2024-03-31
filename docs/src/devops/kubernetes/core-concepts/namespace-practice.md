# Kubernetes Namespace Practice

1. 시스템에 몇 개의 네임스페이스가 존재합니까?

```sh

kubectl get ns
```

3. 연구 네임스페이스에는 몇 개의 포드가 존재합니까?

```sh
kubectl get pods --namespace=research
kubectl get pods -n=research
```

4. Finance 네임스페이스에 POD를 생성합니다.

```sh
kubectl run redis --image=redis -n=finance
```

5. 어떤 네임스페이스에 blue pod가 있나요?

```sh
kubectl get pods --all-namespaces | grep blue
kubectl get pods -A | grep blue
```

6. dev 네임스페이스의 데이터베이스 db-service에 엑세스 하려면?

```sh
db-service.dev.svc.cluster.local
db-service.dev
```
