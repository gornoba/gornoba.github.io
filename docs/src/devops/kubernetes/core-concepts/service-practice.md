# Kubernetes Srvice Practice

1. 시스템에 몇개의 서비스가 있나요?

```sh
kubectl get services
```

2. kubernetes service의 targetPort는 무엇인가요?

```sh
kubectl describe service | grep TargetPort
```

3.  kubernetes service의 label이 몇개나 있나요?

```sh
kubectl describe service
kubectl describe service --show-labels
```

4. kubernetes service에 Endpoint가 얼마나 붙어 있나요?

```sh
kubectl describe service
```

5. deployment가 몇개나 있나요?

```sh
kubectl get deployment
```

6. deployment의 image는 무엇인가요?

```sh
kubectl describe deployment
kubectl get deployment -o wide
```

7. service-definition-1.yaml 파일로 새로운 서비스를 만들어 보세요.

```sh
vi service-definition-1.yaml
kubectl create -f service-definition-1.yaml
```
