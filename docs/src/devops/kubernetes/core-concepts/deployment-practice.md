# Kubernetes 시스템에서 리소스 관리

이 섹션에서는 Kubernetes 시스템에 존재하는 Pod, ReplicaSet, Deployment의 수와 상태를 확인하고 관리하는 방법에 대해 알아봅니다.

## 리소스 상태 확인

1. **Pod 상태 확인**

   - `kubectl get pods` 명령어로 현재 시스템에 존재하는 Pod의 수를 확인합니다.

2. **ReplicaSet 상태 확인**

   - `kubectl get rs` 명령어로 시스템에 존재하는 ReplicaSet의 수를 확인합니다.

3. **Deployment 상태 확인**
   - `kubectl get deployments` 명령어로 시스템에 존재하는 Deployment의 수를 확인합니다.

## Deployment와 관련된 작업

1. **Pod의 이미지 확인**

   - `kubectl describe deploy` 또는 `kubectl get deploy -o wide` 명령어를 실행하여 새 Deployment에서 사용된 이미지를 확인합니다.

2. **Deployment 준비 상태 확인**

   - `kubectl describe pods` 명령어로 Deployment의 준비 상태와 관련된 이벤트를 확인합니다.

3. **file 생성**
   - `kubectl create deploy --image=httpd:2.4-alpine httpd-frontend --replicas=3 --dry-run=client -o yaml > httpd-frontend-deploy.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: httpd-frontend
  name: httpd-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: httpd-frontend
  template:
    metadata:
      labels:
        app: httpd-frontend
    spec:
      containers:
        - image: httpd:2.4-alpine
          name: httpd
```
