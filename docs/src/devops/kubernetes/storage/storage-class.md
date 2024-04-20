# 쿠버네티스의 스토리지 클래스 (Storage Classes)

## 스토리지 클래스란?

스토리지 클래스는 쿠버네티스에서 스토리지 프로비저닝 방법을 정의하는 방법입니다. 스토리지 클래스를 사용하면 사용자는 스토리지 요구 사항에 따라 자동으로 볼륨을 생성하고 할당받을 수 있습니다. 이는 특히 동적 프로비저닝을 통해 큰 효율성을 제공합니다.

### 스토리지 클래스의 동작 원리

스토리지 클래스는 프로비저너를 정의하여 필요할 때 자동으로 스토리지를 생성합니다. 예를 들어, Google Cloud Platform(GCP)에서는 `kubernetes.io/gce-pd` 프로비저너를 사용하여 Google Cloud의 영구 디스크를 동적으로 프로비저닝할 수 있습니다.

### 스토리지 클래스 생성 예시

스토리지 클래스를 생성하는 방법은 다음과 같습니다.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-standard [ pd-standard | pd-ssd ]
  replication-type: none [ none | reginal-pd]
```

### PVC에서 스토리지 클래스 사용하기

PVC를 생성할 때 스토리지 클래스를 지정하면, 해당 클래스에 따라 스토리지가 자동으로 프로비저닝됩니다. 다음은 PVC에서 스토리지 클래스를 사용하는 예시입니다.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
  storageClassName: google-storage
```

이 구성에서 `storageClassName: google-storage`는 이전에 생성한 스토리지 클래스를 참조합니다. 이로 인해 요청된 스토리지가 자동으로 생성되고 PVC에 바인딩됩니다.

## Create a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: frontend
      image: nginx
      volumeMounts:
        - mountPath: "/var/www/html"
          name: web
  volumes:
    - name: web
      persistentVolumeClaim:
        claimName: myclaim
```

## 결론

스토리지 클래스는 쿠버네티스에서 스토리지 관리를 자동화하고 간소화하는 데 매우 중요한 역할을 합니다. 다양한 스토리지 옵션과 요구 사항에 따라 여러 스토리지 클래스를 정의할 수 있으며, 이를 통해 효율적으로 리소스를 관리할 수 있습니다.

## Kubernetes Storage Class Reference Docs

https://kubernetes.io/docs/concepts/storage/storage-classes/
https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes#storageclasses
https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html
