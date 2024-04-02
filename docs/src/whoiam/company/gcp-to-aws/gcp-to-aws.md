# 험난한 GCP에서 AWS로의 서비스 이전

## 계열사 변경

이전 회사를 2년정도 다닌 것 같다. 2년 중에도 다른 계열사로 이동했었다.<br/>
그런데 이번에는 같은 계열사이긴 한데 완전 다른 회사로 바뀌었다.<br/>
계열사 이동하면서 가장 큰 변화는 Cloud 환경이었다.<br/>
기존은 GCP를 썼는데 이동한 회사는 AWS를 사용했다.<br/>
이제 GCP에서 AWS로 서비스를 이전하는 험난한 모험의 과정에 대해 그을 써볼까한다...<br/>
힘드러따..😂🥲🤣

## GCP와 AWS의 서비스 비교 및 대응

GCP와 AWS 비슷하면서도 많이 다른댜.  
전체적으로 GCP는 Pass로 많이 쓰는 것 같고 AWS는 Iaas로 많이 쓰는 것 같다.  
|용도|GCP|AWS|
|:-:|:-:|:-:|
|deployment|App Engine|EC2|
|CI/CD|Cloud Build|Code Pipeline|
|batch|Cloud Run|Rundeck|
|schedule|Cloud Scheduler|Rundeck|
|domain|Cloud Domain|Route 53|
|보안|Cloud Amor|WAF & Shield|

AWS에도 Beanstalk라고 app engine과 비슷한 서비스가 있었으나 기존 서비스가 모두 ec2로 운영중이라 ec2로 변경하기로 했다.  
나중에 기회가 되면 GCP에 서비스환경을 구축했던 것도 정리해두면 좋을 것 같다.

## GCP에서 AWS로 서비스 이전에 해야할 과제

- [**첫번째 과제**](/whoiam/company/gcp-to-aws/first-challenge)
  - CI/CD를 어떻게 AWS로 변경할 것인가?
- [**두번째 과제**](/whoiam/company/gcp-to-aws/second-challenge)
  - app engine은 무중단배포가 가능한 서비스라 EC2에서 어떻게 무중단배포를 구현할 것인가?
- [**세번째 과제**](/whoiam/company/gcp-to-aws/third-challenge)
  - api 연동하는 batch를 어떻게 변경하고 통합할 것인가?
- [**네번째 과제**](/whoiam/company/gcp-to-aws/fourth-challenge)
  - 개인적인 과제로 사용자 체감속도 향상을 위해 express에서 fatify로 변경.

## 후기

이번에 GCP에서 AWS로 서비스를 이전하면서 많은 것을 알고 배웠던 것 같습니다.  
잊을 뻔했는데 [DB Migration](/database/postgre/pg-dump)은 간단하게 pg_dump를 이용하니 금방되었습니다.  
항상 뭔가 할 수록 더 배우고 싶고 하고 싶은 마음이 많이 드네요.
