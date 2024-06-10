# docker image error

## 에러 문구

제 노트북은 apple m1 입니다.  
클러스터 설정과 노드그룹을 모두 만들고 로컬에서 docker에서 이미지 build 후 ECR에 올려 pod으로 간단히 돌려봤는데 BackOff가 났습니다.  
log를 보려했더니 아래와 같은 문구가 나타납니다.

```sh
exec /usr/local/bin/docker-entrypoint.sh: exec format error
```

이 문구는 다른 플랫폼에서 image를 build해서 생기는 문제라고 합니다.  
제가 찾은 해결방법은 2가지가 있습니다.

## 첫번째 해결방법 code commit, code build, code pipeline

### code commit

code commit 말고 그냥 github 이용하셔도 됩니다.  
git을 복제하나 아애 remote로 설정하는 방법이 있습니다.  
아래 공식문서에 잘 나와 있고 연결하고 나중에는 그냥 git이랑 똑같이 쓰면 됩니다.

refference: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-connect.html

### code build

이름 적고 소스에 code commit이나 github을 연결해주고 build spec을 작성해서 같이 넣어주면 됩니다.  
아직 아티팩트는 필요없으니 아티팩트는 없음으로 두면 됩니다.
사실 여기까지만 해도 됩니다. 나중에 커밋할때마다 직접 빌드하면 되니까요.

### code pipeline

code commit을 사용하면 트리거를 설정할 필요가 없지만 github을 사용하면 트리거를 설정해주어야 합니다.  
code build는 위에서 만든거 설정해주고 code deploy는 넘어 갑니다.
이렇게 만들어주면 commit할때마다 알아서 image를 build하고 push 합니다.

### 평가

편하기는 한데 로컬의 컴퓨터만큼 빠르지는 않습니다. 몇분 기다려야 합니다.  
그리고 비용도 발생하게 되구요.

## 두번쨰 해결방법 docker buildx

```sh
docker buildx create --name multi-arch-builder --driver docker-container --bootstrap --use
docker buildx build --platform linux/amd64 --push
```

두번째는 docker buildx를 이용하는 방법입니다.  
다른 플랫폼에서도 이용할 수 있게 만들어 줍니다.

```sh
"ecr:push": "docker buildx build --platform linux/amd64 -t <Repository>${npm_config_name}:latest -f ./apps/${npm_config_name}/Dockerfile --push ."
npm run ecr:push --name=<이름>
```

package.json에 위와같이 만들어 줍니다.  
monorepo를 이용하다보니 app마다 이미지가 달라서 그것도 arg로 설정했습니다.
