# Control Plane Failure

- node status를 체크한다.
- kube-system의 pod 상태를 체크한다.
- systemctl로 kube-apiserver, kube-controller-manager, kube-scheduler, kubelet, kube-proxy의 상태를 체크한다.
- kube-apiserver-master의 log를 확인한다.
  - `sudo journalctl -u kube-apiserver`를 통해서도 가능

## referrence

https://kubernetes.io/docs/tasks/debug/debug-cluster/
