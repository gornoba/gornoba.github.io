# EC2에서 무중단배포 구현

## GCP App Engine

구글에서 App Engine을 소개할때 완전 관리형이라 표현하며 <Sup num=1 text="PaaS">PaaS</Sup> 입니다.  
사용자가 애플리케이션 개발에만 집중할 수 있도록 집중할 수 있도록 도와주는 서비스 입니다.  
아무리 PaaS라고 하더라도 알아야 할 것, 설정해야 할 것 매우 많습니다.  
하지만 <Sup num=2 text="IaC">IaC</Sup>로 인프라를 관리의 편리성과 무중단 배포, 다양한 언어지원, loggin, monitoring, 보안등 여러가지 이점이 많습니다.  
단, App Engine의 flexible Service와 auto scaling, 좀 높은 스펙의 인스턴트를 사용했더니 요즘이 많이 나와 깜짝 놀란적도 있습니다.

## 무중단 배포를 위한 PM2

<Sup num=3 text="PM2">PM2</Sup>는 NodeJs로 배포함에 있어서 부족함이 없는 프로세스 매니저 입니다.  
주요기능은 아래와 같습니다.

1. **프로세스 관리**: PM2는 애플리케이션을 백그라운드에서 실행하고, 자동으로 다시 시작하며, 애플리케이션 로그를 관리합니다.
2. **로드 밸런싱**: 내장된 로드 밸런서를 통해 애플리케이션 인스턴스 간의 트래픽을 자동으로 분산시킵니다.
3. **모니터링 및 로깅**: 실시간 애플리케이션 모니터링 및 로깅 기능을 제공하여 성능 문제를 신속하게 식별할 수 있습니다.
4. **무중단 배포**: 애플리케이션을 다운타임 없이 업데이트하고, 필요한 경우 이전 버전으로 롤백할 수 있습니다.
5. **클러스터 모드**: Node.js의 클러스터 모듈을 사용하여 CPU 코어 수에 맞춰 애플리케이션 인스턴스를 자동으로 확장합니다.
6. **ecosystem config**: `ecosystem.config.js` 파일을 통해 프로젝트 설정을 관리할 수 있습니다. 이 파일 내에서 스크립트 실행 명령, 환경 변수, 로그 파일 경로 등을 정의하여 프로젝트의 배포 및 운영을 용이하게 할 수 있습니다.

기회가 되면 PM2도 한번 다뤄보도록 하시죠!

### 문제점

PM2는 많은 장점을 갖고 있는 프로세스 매니저 입니다.  
유일한 단점이라면 PM2를 EC2에서 사용하려면 사전에 해야할 것이 매우 많다는 것입니다.  
한번 하나씩 nginx, redis, postgre 등등 설치해보면서 해봤는데....
물론 AMI를 만들어 사용할 수도 있지만 어떤 환경에서라도 동일하게 작동할 수 있어야 했습니다.  
그래서 선택한 것은 역시 docker

## docker

### Docker의 핵심 개념

- **이미지(Image)**: Docker 이미지는 애플리케이션과 그 애플리케이션을 실행하는 데 필요한 모든 파일과 설정을 포함하는 불변의 템플릿입니다. 이미지는 컨테이너를 생성하는 데 사용됩니다.
- **컨테이너(Container)**: Docker 컨테이너는 Docker 이미지의 실행 인스턴스입니다. 각 컨테이너는 서로 격리되어 있으며, 자체 파일 시스템을 가지고, 주어진 네트워크 리소스에 안전하게 액세스할 수 있습니다.
- **도커 데몬(Docker Daemon)**: Docker 데몬(dockerd)은 Docker API 요청을 수신하고 이미지, 컨테이너, 네트워크 및 볼륨과 같은 Docker 객체를 관리합니다.
- **도커 클라이언트(Docker Client)**: Docker 클라이언트(docker)는 사용자가 Docker 데몬과 통신할 수 있게 하는 주요 방법입니다. docker run 같은 명령을 사용하여 컨테이너를 시작할 수 있습니다.
- **도커 레지스트리(Docker Registry)**: Docker 이미지를 저장하는 곳입니다. Docker Hub는 누구나 사용할 수 있는 Docker의 공식 레지스트리이며, 개인 레지스트리도 구축할 수 있습니다.

### Docker의 장점

- **포터블리티**: Docker 컨테이너는 어디서나 실행될 수 있습니다. 개발 환경, 테스트 환경, 프로덕션 환경 등 관계 없이 동일하게 작동합니다.
- **경량성**: 컨테이너는 가상 머신보다 훨씬 더 경량화되어 있으며, 더 적은 자원을 사용하여 더 많은 애플리케이션을 호스팅할 수 있습니다.
- **빠른 시작 시간**: 컨테이너는 몇 초 내로 시작될 수 있어, 애플리케이션의 배포와 확장이 매우 빠릅니다.
- **일관성**: 애플리케이션과 그 종속성이 컨테이너 내에 캡슐화되어 있어, 환경 간의 일관성을 보장합니다.
- **자동화**: Docker는 애플리케이션의 배포와 관리를 자동화하는 다양한 도구와 표준을 제공합니다.

### Docker 배포를 위한 코드 작성

- [buildspec 작성](/aws/code-pipeline/code-build/build-create#buildspec-작성)하여 code build에서 docker image를 build하고 ECR에 push 해줍니다.
- [appspec 작성](/aws/code-pipeline/code-deploy/codedeploy-create#appsepc-작성) 합니다. 저는 ApplicationStart hook을 이용하였습니다.
- shell script의 코드 과정

  1. Code Build에서 ECR에 push한 image의 name, imageUri를 가져옵니다.
  2. ECR에 로그인하고 image를 가져옵니다.

  3. 현재 배포중인 컨테이너의 이름을 확인합니다.

  - port는 3000번과 4000번을 사용합니다.

  4. 3000번을 사용중이라면 4000번으로 이름과 port를 변경하여 docker run 합니다.
  5. docker log를 통하여 health check를 30초 동안 진행합니다.

  - 만약 health check를 통과하지 못하면 에러를 발생시키고 새로 받은 컨테이너와 이미지를 삭제 합니다.

  6. health check가 통과하면 nginx의 설정 파일을 변경하고 reload 합니다.
  7. 기존 컨테이너와 이미지는 삭제합니다.
     :::details 코드

     ```sh
     #!/bin/bash

     # 변수 설정

     name=$(jq -r '.name' /home/ec2-user/build/imagedefinitions.json)
     imageUri=$(jq -r '.imageUri' /home/ec2-user/build/imagedefinitions.json)

     if [ -z "$name" ] || [ -z "$imageUri" ]; then
     echo "Error: Required environment variables are not set."
     exit 1
     fi

     # ECR 로그인

     aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $imageUri
     sudo chmod 666 /var/run/docker.sock

     # Docker 이미지 가져오기

     docker pull $imageUri
     echo "Docker image pull success"

     # 포트와 태그 결정

     existing_container=$(docker ps | grep $name | awk '{print $NF}' | grep -E "$name-3000|$name-4000")
     if echo $existing_container | grep -q "$name-3000"; then
     new_port="4000:3000"
     tag="$name-4000"
     elif echo $existing_container | grep -q "$name-4000"; then
     new_port="3000:3000"
     tag="$name-3000"
     else
         new_port="3000:3000"
         tag="$name-3000"
     fi

     # Docker 컨테이너 실행

     if docker ps -a --filter "name=$tag" | grep -q "$tag"; then
     docker rm $tag -f
     echo "delete $tag"
     fi
     docker run -d --name $tag --network dev -p $new_port $imageUri

     # 로그 모니터링 및 대기

     start_time=$(date +%s)
     timeout=30
     found=0

     while [ $(($(date +%s) - start_time)) -lt $timeout ]; do
     if docker logs $tag 2>&1 | tail -1 | grep -q "localhost:3000"; then
           found=1
           break
       fi
       sleep 1
       echo $(docker logs $tag 2>&1 | tail -1)
       echo "Waiting for application to start just passed $(($(date +%s) - start_time)) seconds..."
     done

     if [ $found -eq 0 ]; then
     echo "Error: Application did not start correctly."
     docker rm -f $tag
     docker rmi $imageUri
     exit 1
     else
     echo "Container run success."
     fi

     # 설정 파일 업데이트

     echo "Nginx conf exchaing $new_port"
     if [[ $new_port == "4000:3000" ]]; then
       sed -i "s/$name-3000/$name-4000/" /home/ec2-user/conf.d/default.conf
     elif [[ $new_port == "3000:3000" ]]; then
       sed -i "s/$name-4000/$name-3000/" /home/ec2-user/conf.d/default.conf
     fi

     # Nginx 컨테이너 내에서 Nginx 리로드

     docker exec nginx nginx -s reload

     # 기존 컨테이너 검색 및 삭제

     if [ ! -z "$existing_container" ]; then
     echo "existing_container $existing_container delete"
     docker stop $existing_container
     docker rm $existing_container
     fi

     # 태그 없는 이미지 삭제

     docker images | grep '<none>' | awk '{print $3}' | xargs -r docker rmi
     echo "<none> container rmi success"

     echo "Deployment completed successfully."
     ```

     :::

<FootNote num=1 text="PaaS" url="https://www.ibm.com/kr-ko/topics/paas"/>
<FootNote num=2 text="IaC" url="https://www.redhat.com/ko/topics/automation/what-is-infrastructure-as-code-iac"/>
<FootNote num=3 text="PM2" url="https://pm2.keymetrics.io/"/>
