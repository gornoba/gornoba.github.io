# 클러스터 역할 및 클러스터 역할 바인딩 이해하기

클러스터 역할과 클러스터 역할 바인딩은 클러스터 전체 리소스에 대한 접근 권한을 제어하는데 중요한 역할을 합니다. 이는 네임스페이스 내 리소스뿐만 아니라 클러스터 수준의 리소스에 대해서도 권한을 부여할 수 있습니다.

## 클러스터 역할 생성하기

클러스터 역할을 생성하기 위해 다음과 같은 정의 파일을 작성합니다:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-admin
rules:
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["get", "list", "create", "delete"]
```

이 예제에서는 클러스터 관리자가 노드에 대해 조회, 목록 확인, 생성, 삭제를 할 수 있도록 설정합니다.

## 클러스터 역할 바인딩 생성하기

사용자를 클러스터 역할에 연결하기 위해 클러스터 역할 바인딩을 생성합니다:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-admin-binding
subjects:
  - kind: User
    name: cluster-admin
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

이 설정은 'cluster-admin' 사용자를 'cluster-admin' 클러스터 역할에 바인딩합니다.

## 클러스터 역할과 바인딩의 활용

- **클러스터 역할 조회**: `kubectl get clusterroles`
- **클러스터 역할 바인딩 조회**: `kubectl get clusterrolebindings`
- **역할 상세 정보 조회**: `kubectl describe clusterrole cluster-admin`
- **역할 바인딩 상세 정보 조회**: `kubectl describe clusterrolebinding cluster-admin-binding`

## 사용자 권한 테스트

사용자가 특정 클러스터 리소스에 접근할 수 있는지 확인하려면 `kubectl auth can-i` 명령을 사용합니다:

```bash
kubectl auth can-i create nodes --as cluster-admin
```

이 명령은 'cluster-admin' 사용자가 노드를 생성할 수 있는지 확인합니다.

## K8s Reference Docs

https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole
https://kubernetes.io/docs/reference/access-authn-authz/rbac/#command-line-utilities
