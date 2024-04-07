# Kubernetes에서 Rest 상태의 시크릿 데이터 암호화하기

## 시크릿 객체 생성하기

먼저, 일반 시크릿 객체를 생성합니다.

```sh
kubectl create secret generic my-secret --from-literal=key1=supersecret
```

이 명령어는 `key1`이라는 키와 `supersecret`이라는 값을 가진 시크릿 객체 `my-secret`을 생성합니다.

## 시크릿 데이터의 기본 인코딩 확인하기

생성된 시크릿 데이터는 Base64로 인코딩되어 저장됩니다. 이는 쉽게 디코딩될 수 있기 때문에, 본질적으로 안전하지 않습니다.

```sh
kubectl get secret my-secret -o yaml
```

이 명령어를 통해 시크릿 데이터의 인코딩된 형태를 확인할 수 있습니다.

## etcd 서버에서의 데이터 저장 방식

Kubernetes는 시크릿 데이터를 etcd 서버에 저장합니다. 기본적으로, 이 데이터는 암호화되지 않은 상태로 저장됩니다. 이는 etcd에 접근할 수 있는 사람이라면 누구나 시크릿 데이터를 볼 수 있음을 의미합니다.

## etcd에서 시크릿 데이터 암호화 활성화하기

Kubernetes에서는 etcd에 저장되는 데이터를 암호화하기 위한 옵션을 제공합니다. 이를 활성화하기 위해, 다음 단계를 따릅니다:

1. 암호화를 위한 설정 파일 생성하기:

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <base64-encoded-secret>
      - identity: {}
```

`head -c 32 /dev/urandom | base64`로 랜덤키 생성합니다.  
이 YAML 파일은 시크릿 데이터를 AES CBC 알고리즘을 사용하여 암호화하도록 Kubernetes에 지시합니다.

2. API 서버에 암호화 설정 적용하기:

API 서버 설정 파일에 암호화 설정 파일의 경로를 추가합니다.

```yaml
# /etc/kubernetes/manifests/kube-apiserver.yaml
---
#
# This is a fragment of a manifest for a static Pod.
# Check whether this is correct for your cluster and for your API server.
#
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubeadm.kubernetes.io/kube-apiserver.advertise-address.endpoint: 10.20.30.40:443
  creationTimestamp: null
  labels:
    app.kubernetes.io/component: kube-apiserver
    tier: control-plane
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    ...
    - --encryption-provider-config=/etc/kubernetes/enc/enc.yaml  # add this line # [!code highlight]
    volumeMounts:
    ...
    - name: enc                           # add this line # [!code highlight]
      mountPath: /etc/kubernetes/enc      # add this line # [!code highlight]
      readOnly: true                      # add this line # [!code highlight]
    ...
  volumes:
  ...
  - name: enc                             # add this line # [!code highlight]
    hostPath:                             # add this line # [!code highlight]
      path: /etc/kubernetes/enc           # add this line # [!code highlight]
      type: DirectoryOrCreate             # add this line # [!code highlight]
  ...

--encryption-provider-config=/etc/kubernetes/pki/etcd/encryption-config.yaml
```

이 변경을 적용한 후, Kubernetes API 서버를 재시작해야 합니다.

## 암호화된 시크릿 데이터 확인하기

암호화 설정을 적용한 후, 새로운 시크릿 데이터를 생성하면 etcd에 암호화되어 저장됩니다. 이전에 생성된 시크릿 데이터는 업데이트하거나 재생성해야 암호화됩니다.

```sh
kubectl create secret generic my-new-secret --from-literal=key2=topsecret
```

이제 새로 생성된 시크릿 `my-new-secret`은 etcd에 암호화되어 저장됩니다.

## 결론

Kubernetes에서 시크릿 데이터의 안전성을 높이기 위해, etcd에서의 데이터 암호화를 활성화하는 것이 중요합니다. 이는 etcd 서버에 대한 접근이 제한되어 있더라도 추가적인 보안 계층을 제공합니다.

## k8s referrence

https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/
