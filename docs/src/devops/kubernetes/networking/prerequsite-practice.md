# Practice

## 1. 이 클러스 터에는 몇 개의 노드가 포함되어 있습니까?

```sh
kubectl get nodes
```

## 2. 이 클러스터에 있는 제어 영역 노드의 내부 IP 주소는 무엇입니까?

```sh
kubectl get nodes -o wide
```

## 3. 컨트롤플레인 노드의 클러스터 연결을 위해 구성된 네트워크 인터페이스는 무엇입니까?

이는 이전 질문에서 결정한 것과 동일한 IP 주소를 가진 네트워크 인터페이스가 됩니다.

```sh
ip a
```

위 명령에 대한 출력이 상당히 많습니다. 더 잘 필터링할 수 있습니다.

```sh
ip a | grep -B2 X.X.X.X

3058: eth0@if3059: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP group default
   link/ether 02:42:c0:08:ea:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
  inet 192.8.234.3/24 brd 192.8.234.255 scope global eth0
```

위의 결과로 다음과 같은 답을 얻을 수 있습니다.

```sh
eth0
```

## 4. 컨트롤플레인 노드 인터페이스의 MAC 주소는 무엇입니까?

이 값은 이전 질문에 대해 실행한 명령의 출력에도 나타납니다. MAC 주소는 link/ether출력 필드 의 값이며 .으로 구분된 6개의 16진수 숫자입니다.<br/>

출력이 다음과 같은 eth0경우

```sh
3058: eth0@if3059: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP group default
   link/ether 02:42:c0:08:ea:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
  inet 192.8.234.3/24 brd 192.8.234.255 scope global eth0
```

그러면 MAC 주소는

```sh
02:42:c0:08:ea:03
```

## 5. node01에 할당된 IP 주소는 무엇입니까?

```sh
kubectl get nodes -o wide
```

## 6. node01에 할당된 MAC 주소는 무엇입니까?

이를 위해 SSH를 통해 node01인터페이스를 볼 수 있어야 합니다. 이전 질문에서 결정했으므로 어떤 IP를 찾아야 하는지 알고 있습니다.

```sh
ssh node01
ip a | grep -B2 X.X.X.X
```

X.X.X.X이전 질문에서 얻은 IP 주소는 어디에 있습니까? 다시 한번 link/ether을 살펴보세요.<br/><br/>

`noe01`의 인터페이스가 `eth0`이라고 추측한다면 아래와 같은 명령어를 사용합니다.

```sh
ip link show eth0
```

하지만 확실히 하는 것이 가장 좋습니다.

이제 `controlplane`로 돌아갑니다.

```sh
exit
```

## 7. 우리는 Containerd를 컨테이너 런타임으로 사용합니다. 이 호스트에서 Containerd가 생성한 인터페이스/브리지는 무엇입니까?

```sh
ip link show
```

- eth의 이름으로 시작되는 모든 인터페이스는 "물리적" 인터페이스이며 호스트에 연결된 네트워크 카드를 나타냅니다.
- 인터페이스 lo는 루프백이며 `127.`로 시작하는 모든 IP 주소를 포함합니다. 모든 컴퓨터에는 이것이 있습니다.
- 이름이 시작되는 모든 인터페이스는 veth호스트와 포드 네트워크 간의 터널링에 사용되는 가상 네트워크 인터페이스입니다. 이는 브리지와 연결되며 브리지 인터페이스 이름이 세부 정보와 함께 나열됩니다.
- 두 veth장치의 경우 목록의 다른 장치와 연결되어 있으므로 cni0이것이 답입니다.

## 8. cni0 인터페이스의 상태는 무엇입니까?

이전 명령의 출력에서 ​​상태 필드가 다음과 같은 것을 볼 수 있습니다.

```sh
UP
```

## 9. 제어 영역 노드에서 Google에 ping을 실행하려면 어떤 경로가 필요합니까?

기본 게이트웨이의 IP 주소는 무엇입니까?

```sh
ip route show default
```

## 10. kube-scheduler가 컨트롤 플레인 노드에서 수신 대기하는 포트는 무엇인가요?

    호스트에서 실행되는 프로그램이 사용하는 네트워크 소켓을 보려면 netstat 명령을 사용하십시오. 출력이 많기 때문에 프로세스 이름으로 필터링하겠습니다.

```sh
netstat -nplt | grep kube-scheduler
```

사용된 netstat 옵션의 의미

- n: IP 주소 표시(호스트 이름으로 확인하려고 하지 마십시오.)
- p: 프로세스 이름 표시(예: kube-scheduler )
- l: _listening_ sockets 만 포함
- t: TCP 소켓만 포함

```sh
tcp 0 0 127.0.0.1:10259 0.0.0.0* LISTEN 3291/kube-scheduler
```

localhost, port 10259에서 수신 대기 중인 것을 볼 수 있습니다.

## 11. ETCD는 두 개의 포트에서 수신 대기하고 있습니다. 다음 중 더 많은 클라이언트 연결이 설정된 것은 무엇입니까?

우리는 netstat약간 다른 옵션과 필터를 사용합니다.etcd

```sh
netstat -anp | grep -i etcd
netstat -anp | grep -i etcd | grep -i 2379 | wc -i
netstat -anp | grep -i etcd | grep -i 2380 | wc -i
```

사용된 netstat 옵션의 의미

- a: 모든 상태에 소켓을 포함합니다.
- n: IP 주소 표시(호스트 이름으로 확인하려고 하지 마십시오.)
- p: 프로세스 이름 표시(예 etcd: )
  가장 많이 사용되는 포트는 단연코 이라는 것을 알 수 있습니다 2379.

## 12. 정보

API 서버가 연결하는 ETCD의 2379 포트이기 때문입니다. API 서버가 여러 etcd 작업을 동시에 처리할 수 있도록 여러 개의 동시 연결이 있기 때문입니다.<br/>

2380은 컨트롤플레인 노드가 여러 개 있는 경우 etcd `peer-to-peer` 연결에만 사용됩니다. 이 경우에는 그렇지 않습니다.
