# batch 변경 및 통합

## GCP에서의 Batch

AWS에도 유사한 서비스가 존재하겠지만 AWS에는 서버리스 PaaS 서비스가 많이 있습니다.  
대표적으로 Cloud Function, Cloud Run, App Engine이 있죠.  
GCP에서 api연동은 주로 Cloud Run을 통해 하였습니다.  
GCP 인증을 걸어두고 Cloud Scheduler를 통해 스케줄링까지 해놓았습니다.  
편리함과 보안 모두를 챙길 수 있었죠.  
AWS로 옮겨와서는 lamda와 eventbridge를 생각하고 있었으나 runduck이 구축되어 있어 다른 방법을 모색해야 했습니다.

## Nest Commander

Nest Commander는 NestJs을 command line application로 만들어주는 tool 입니다.  
NestJs의 기존의 의존성을 그대로 쓸 수 있다는 점에서 매우 좋습니다.

[Nest Commander](/backend/nestjs/applied/commander)

## rundeck

rundeck은 batch를 실행할 수 있는 아주 유용한 tool입니다.  
AWS에 IAM 사용자에 권한을 부여하고 access_key와 private_access_key를 등록하고  
ec2에서 ssh-keygen을 통해 key를 만들고 private-key를 등록해주면 알아서 ec2를 찾습니다.  
해당 ec2에서 script 명령어를 만들어서 실행해주면 됩니다.  
저는 docker로 실행했으니 `docker exec`를 이용했고 배포할때마다 이름이 변경되어 그에 맞게 script를 제작했습니다.

```sh
docker ps | grep <name> | awk '{print $1}' | xargs -r -I {} docker exec {} node dist/main <command name> <arg> <options>
```

## 후기

rundeck을 이용하는 것은 보안적으로 사용면에서 매우 좋았습니다.  
가장 좋은건 cloud service에 의존하지 않아도 된다는 점입니다.  
이제 GCP-AWS 서비스 이전이 끝났습니다.  
마지막 제 욕심만이 남았죠 :grin:
