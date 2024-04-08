# 쿠버네티스 클러스터 백업 및 복원 방법론

쿠버네티스 클러스터를 운영할 때 중요한 작업 중 하나는 데이터 및 구성의 백업 및 복원입니다. 이 과정은 잠재적인 데이터 손실을 방지하고 시스템의 복원력을 향상시킵니다.

## 백업 대상

- **etcd 클러스터**: 모든 클러스터 관련 정보가 저장되는 중심적인 저장소입니다.
- **지속적인 스토리지**: 애플리케이션에 구성된 지속적인 스토리지도 백업 대상입니다.
- **리소스 구성**: 커맨드 라인 또는 정의 파일을 통해 생성된 모든 리소스(네임스페이스, 시크릿, 컨피그 맵, 서비스 등) 구성입니다.

## 백업 방법

1. **명령어를 통한 리소스 백업**:

   - `kubectl get all --all-namespaces -o yaml > all-resources.yaml` 명령어를 사용해 모든 리소스를 YAML 형식으로 백업할 수 있습니다.
   - 이 접근법은 직접적으로 Kube API 서버를 쿼리하여 모든 객체의 구성을 저장합니다.

2. **etcd 백업**:

   - etcd 데이터 디렉토리 직접 백업 또는 etcd 내장 스냅샷 기능을 사용합니다.
   - etcd와 ectdctl의 버전을 맞추기 위해서 버전을 맞추는 작업이 필요합니다.
     - `kubectl -n kube-system logs etcd-controlplane | grep -i 'etcd-version'`로 버전을 확인하고
     - `v3`라면 `export ETCDCTL_API=3`
   - etcdctl 스냅샷 저장 및 복원 명령어를 사용합니다.

     ```bash
     etcdctl snapshot save snapshot.db
     etcdctl snapshot status snapshot.db

     service kube-apiserver stop
     etcdctl snapshot restore snapshot.db --data-dir /var/lib/etcd-from-backup
     systemctl daemon-reload
     service etcd restart
     service kube-apiserver start
     ```

   - 복원한 후 `/etc/kubernetes/manifests/etcd.yaml`을 update 해주어야 합니다.

   ```yaml
   volumes:
     - hostPath:
         path: <복원 폴더 위치> # 위의 경우 /var/lib/etcd-from-backup
         type: DirectoryOrCreate
       name: etcd-data
   ```

   - `etcd.yaml`이 업데이트 된 후 1~2분정도 후 restart되는데 watch를 하려면 아래 명령어를 입력하세요.

   ```sh
   watch "crictl ps | grep etcd"
   ```

   - etcd 클러스터 백업 및 복원 시 인증서 파일과 엔드포인트 지정이 필요합니다.

   ```bash
   ETCDCTL_API=3 etcdctl \
   snapshot save /tmp/snapshot.db \
   --endpoints=https://[127.0.0.1]:2379 \
   --cacert=/etc/kubernetes/pki/etcd/ca.crt \
   --cert=/etc/kubernetes/pki/etcd/server.crt \
   --key=/etc/kubernetes/pki/etcd/server.key
   ```

## 추가명령어

### 현재 운영중인 클러스터 확인

```sh
kubectl config view
kubectl config get-clusters
```

### 현재 클러스터 위치 바꾸기

```sh
kubectl config use-context cluster1
```

### etcd가 stack? external

- stack이면 `kubectl get pods -n kube-system  | grep etcd` 해당 명령어에 노출됩니다.
- external 이면 명령어에 노출되지 않습니다.
  - ssh로 해당 클러스터에 접속하여 `ps -ef | grep etcd`로 보면 나타납니다.
  - `kubectl -n kube-system describe pod kube-apiserver-cluster2-controlplane`로 좀 더 자세한 정보를 볼 수 있습니다.

## 백업 도구

- **Velero (이전 이름: Ark)**: 쿠버네티스 API를 사용해 클러스터의 리소스 및 지속적인 볼륨을 백업하고 복원할 수 있는 도구입니다.

## 백업 전략 선택

- **관리형 쿠버네티스 환경**: etcd 접근 권한이 없는 경우 Kube API 서버를 쿼리하는 방법이 더 적합할 수 있습니다.
- **자체 호스팅 클러스터**: etcd 백업을 포함한 포괄적인 백업 전략을 수립할 수 있습니다.

## K8s Reference Docs

https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/
https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster

https://github.com/etcd-io/website/blob/main/content/en/docs/v3.5/op-guide/recovery.md

https://www.youtube.com/watch?v=qRPNuT080Hk
