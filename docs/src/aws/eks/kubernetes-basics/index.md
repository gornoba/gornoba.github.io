# Kubernetes basic

## Pod

```sh
docker run <name> --image=<image> --port=<port>
```

## deployment

```sh
k create deployment first-deploy --image=<image> --replicas=<number> --port=<port>
```

## Service

### NodePort

NodePort는 pod, deploy를 외부로 연결하는데 쓰입니다.

```sh
docker expose pod/<name> --type=NodePort --port=<port> --name=<name>
```

### ClusterIp

pod끼리 통신하기 위해서 사용됩니다. 위에서 타입만 바꾸면 됩니다.
