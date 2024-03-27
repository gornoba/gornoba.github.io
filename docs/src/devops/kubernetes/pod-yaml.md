# YAML 기반 Pod 생성하기

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      imgae: nginx
```

## YAML 기반 Pod 생성

- Kubernetes는 객체 생성을 위해 YAML 파일을 사용함 (예: Pods, Replicas, Deployments, Services 등)
- Kubernetes 정의 파일은 항상 4가지 최상위 필드를 포함: `apiVersion`, `kind`, `metadata`, `spec`

### 필수 필드

1. **apiVersion**: 생성하려는 객체에 사용할 Kubernetes API의 버전 (예: Pods의 경우 `v1`)
   |Kind|Version|
   |:-|-:|
   |Pod|v1|
   |Servcie|v1|
   |ReplicaSet|apps/v1|
   |Deployment|apps/v1|
2. **kind**: 생성하려는 객체의 종류 (예: `Pod`)
3. **metadata**: 객체에 대한 메타데이터 (이름, 레이블 등)

   - Name
     - 리소스를 고유하게 식별하는 데 사용되는 문자열
     - 클러스터 내에서 유일해야 하며, 특정 종류의 리소스 내에서만 고유하면 됨
     - 예: 한 클러스터 내에서 동일한 이름의 Pod와 Service를 가질 수 없지만, 서로 다른 네임스페이스에 동일한 이름을 사용할 수 있음
   - Labels
     - 키-값 쌍으로 구성되어 Kubernetes 객체를 조직화하고 선택할 수 있게 해주는 간단한 메커니즘
     - 하나의 리소스에 여러 레이블을 붙일 수 있으며, 같은 레이블을 여러 리소스에 붙일 수 있음
     - 레이블을 사용하면 리소스들을 그룹화하고, 선택하고, 관리할 수 있는 유연한 방법을 제공함
     - 예를 들어, 애플리케이션의 여러 컴포넌트(프론트엔드, 백엔드, 데이터베이스 등)에 `app=frontend`, `app=backend`, `role=database`와 같은 레이블을 붙여서 특정 부분만 선택적으로 관리할 수 있음
     - Labels의 사용 예
       - 특정 환경(environment), 애플리케이션 버전(version), 애플리케이션 구성 요소(app component) 등을 나타내는 데 사용됨
       - `kubectl` 명령어를 사용하여 레이블 셀렉터를 통해 특정 레이블이 붙은 리소스들만 조회할 수 있음
       - `kubectl get pods -l app=frontend` 명령어는 `app=frontend` 레이블이 붙은 모든 Pod를 조회함

4. **spec**: 객체에 대한 명세, 즉 Kubernetes에 해당 객체에 대한 추가 정보를 제공

### 주의 사항

- `metadata`는 이름과 레이블 등을 포함하는 key, value 형태임
- `spec`은 List/Array이며 생성하려는 객체(이 경우 Pod)에 대한 추가 정보가 포함되며, 이는 객체마다 다를 수 있음

### Pod 생성 예제

- Pod에 대한 YAML 파일은 `containers` 리스트를 `spec`에 포함시켜야 함
- Pod는 다수의 컨테이너를 포함할 수 있지만, 예제에서는 단일 컨테이너(Nginx 이미지)만 포함
- 파일 생성 후, `kubectl create -f pod-definition.yaml` 명령어로 Pod 생성

### Pod 확인 및 정보 조회

- `kubectl get pods`: 사용 가능한 Pod 목록 표시
- `kubectl describe pod [Pod 이름]`: Pod에 대한 자세한 정보 표시
  ![pod-yaml](/pod-yaml.png)

## 요약

- Kubernetes에서 YAML 파일을 사용해 Pod 등의 Kubernetes 객체를 생성할 수 있음
- 정의 파일에는 반드시 `apiVersion`, `kind`, `metadata`, `spec` 필드가 포함되어야 함
- 각 객체 유형(`kind`)에 따라 `spec` 내용이 달라질 수 있으므로, 객체 생성 시 적절한 명세를 제공해야 함
