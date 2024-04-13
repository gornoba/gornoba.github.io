# 쿠버네티스의 역할 기반 접근 제어(RBAC)

## RBAC의 기본

RBAC은 쿠버네티스의 보안을 강화하기 위한 중요한 도구로, 사용자가 클러스터 내에서 수행할 수 있는 작업을 제어합니다. 이를 통해 개발자, 관리자 등 다양한 역할의 사용자가 필요한 리소스에만 접근할 수 있도록 합니다.

## 역할(Role) 생성하기

역할을 생성하는 과정은 다음과 같습니다:

1. **역할 정의 파일 생성**

   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: Role
   metadata:
     namespace: default
     name: developer
   rules:
     - apiGroups: [""]
       resources: ["pods", "configmaps"]
       verbs: ["get", "list", "create", "delete"]
   ```

   ```bash
   kubectl create role developer --namespace=default --verb=list,create,delete --resource=pods
   ```

   이 파일은 개발자가 파드와 컨피그맵을 생성, 삭제, 조회할 수 있도록 설정합니다.

2. **역할 생성**
   ```bash
   kubectl create -f developer-role.yaml
   ```

## 역할 바인딩(RoleBinding) 생성하기

역할을 특정 사용자에게 연결하기 위해 역할 바인딩을 생성합니다:

1. **역할 바인딩 정의 파일 생성**

   ```yaml
   kind: RoleBinding
   apiVersion: rbac.authorization.k8s.io/v1
   metadata:
     name: dev-user-to-developer-binding
     namespace: default
   subjects:
     - kind: User
       name: dev-user
       apiGroup: rbac.authorization.k8s.io
   roleRef:
     kind: Role
     name: developer
     apiGroup: rbac.authorization.k8s.io
   ```

   ```bash
   kubectl create rolebinding dev-user-binding --namespace=default --role=developer --user=dev-user
   ```

2. **역할 바인딩 생성**
   ```bash
   kubectl create -f dev-user-binding.yaml
   ```

## 역할 및 역할 바인딩 관리

- **역할 조회**: `kubectl get roles`
- **역할 바인딩 조회**: `kubectl get rolebindings`
- **특정 역할 상세 조회**: `kubectl describe role developer`
- **특정 역할 바인딩 상세 조회**: `kubectl describe rolebinding dev-user-to-developer-binding`

## 사용자 권한 확인

사용자가 특정 작업을 수행할 수 있는지 확인하기 위해 `kubectl auth can-i` 명령을 사용합니다:

```bash
kubectl auth can-i create deployments --as dev-user
```

이 명령은 dev-user가 디플로이먼트를 생성할 수 있는지 확인합니다.

K8s Reference Docs
https://kubernetes.io/docs/reference/access-authn-authz/rbac/
https://kubernetes.io/docs/reference/access-authn-authz/rbac/#command-line-utilities
