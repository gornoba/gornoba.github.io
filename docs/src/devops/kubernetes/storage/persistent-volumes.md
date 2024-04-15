# 쿠버네티스의 퍼시스턴트 볼륨 (Persistent Volumes)

## 퍼시스턴트 볼륨이란?

퍼시스턴트 볼륨(PV)은 쿠버네티스 클러스터에서 사용할 수 있는 스토리지의 집합을 관리자가 사전에 설정해두는 방식입니다. 이는 개별 포드 설정 파일 내에서 스토리지를 설정하는 대신, 중앙에서 스토리지를 관리하고 사용자가 필요에 따라 스토리지를 할당받을 수 있도록 합니다.

### 퍼시스턴트 볼륨 생성 예시

퍼시스턴트 볼륨을 생성하기 위해 기본 템플릿을 시작하고 API 버전을 업데이트합니다.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-vol1
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/pv-vol1
```

위 YAML 파일은 로컬 호스트의 `/data/pv-vol1` 디렉토리를 사용하여 1GB의 스토리지를 가진 퍼시스턴트 볼륨을 생성합니다. `ReadWriteOnce` 액세스 모드는 볼륨이 단일 노드에서 읽기 및 쓰기가 가능하다는 것을 의미합니다.

### 퍼시스턴트 볼륨 생성 및 조회 CLI 명령어

퍼시스턴트 볼륨을 생성하고 조회하기 위한 `kubectl` 명령어는 다음과 같습니다.

```bash
kubectl create -f pv.yaml
kubectl get persistentvolumes
```

이 명령어들은 먼저 퍼시스턴트 볼륨을 생성하고, 생성된 볼륨의 목록을 확인합니다.

## 퍼시스턴트 볼륨 클레임 (Persistent Volume Claims)

퍼시스턴트 볼륨 클레임(PVC)은 사용자가 퍼시스턴트 볼륨에서 필요한 스토리지의 일부를 요청하는 방법입니다. PVC를 통해 사용자는 사전에 정의된 퍼시스턴트 볼륨에서 필요한 만큼의 스토리지를 할당받을 수 있습니다.

## 결론

이 강의에서는 쿠버네티스의 퍼시스턴트 볼륨에 대해 배웠습니다. 퍼시스턴트 볼륨은 클러스터 전체에서 스토리지를 효율적으로 관리하고, 사용자가 스토리지를 쉽게 사용할 수 있도록 돕습니다. 다음 강의에서는 이러한 볼륨을 어떻게 실제로 사용하는지에 대해 더 자세히 설명하겠습니다.

## Kubernetes Persistent Volumes

https://kubernetes.io/docs/concepts/storage/persistent-volumes/
https://portworx.com/tutorial-kubernetes-persistent-volumes/
