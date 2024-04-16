# 쿠버네티스의 퍼시스턴트 볼륨 클레임 (PVC)

## 퍼시스턴트 볼륨 클레임이란?

퍼시스턴트 볼륨 클레임(PVC)은 사용자가 퍼시스턴트 볼륨(PV)에 대한 스토리지 요구를 정의하고, 이를 할당받기 위해 사용하는 쿠버네티스 리소스입니다. PVC와 PV 사이의 바인딩은 쿠버네티스가 자동으로 관리합니다.

### PVC 생성 과정

PVC를 생성하기 위해 필요한 YAML 파일의 기본 구조는 다음과 같습니다.

```yaml
# pvc-definition.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-claim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

```yaml
# pv-definition.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-vol1
spec:
  accessModes: ["ReadWriteOnce"]
  capacity:
    storage: 1Gi
  hostPath:
    path: /tmp/data
```

이 구조를 사용하여 `500Mi`의 스토리지를 요청하며, `ReadWriteOnce` 액세스 모드로 설정된 PVC를 생성합니다. 이 액세스 모드는 볼륨을 한 번에 하나의 노드에서만 읽고 쓸 수 있음을 의미합니다.

### PVC와 PV 바인딩 확인

PVC를 생성한 후, 쿠버네티스는 조건을 충족하는 PV를 찾아 자동으로 바인딩합니다. 생성된 PVC와 바인딩 상태를 확인하기 위해 다음 명령어를 사용합니다.

```bash
kubectl get persistentvolumeclaims
```

### PVC 삭제 및 볼륨 처리 옵션

PVC를 삭제할 때, PV에 대한 처리 방식을 결정할 수 있습니다. 기본적으로 PV는 `Retain` 정책을 사용하여 PVC 삭제 후에도 데이터를 보존합니다. 다른 옵션으로는 `Delete`와 `Recycle`가 있습니다. `Delete` 옵션을 사용하면 PVC와 함께 PV도 삭제되고, `Recycle` 옵션은 데이터를 지운 후 다른 요청에 재사용할 수 있도록 합니다.

```bash
kubectl delete persistentvolumeclaim my-claim
```

이 명령은 `my-claim` 이름의 PVC를 삭제합니다. 이와 관련된 PV의 처리는 PV의 정책에 따라 다르게 실행됩니다.

## Kubernetes Persistent Volume Claims Reference Docs

https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims<br/>
https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#persistentvolumeclaim-v1-core<br/>
https://docs.cloud.oracle.com/en-us/iaas/Content/ContEng/Tasks/contengcreatingpersistentvolumeclaim.htm
