# codedeploy agent 설치

[아마존 리눅스 또는 RHEL용 CodeDeploy 에이전트 설치](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-linux.html)

## 필수설치

```sh
sudo yum update -y
sudo yum install ruby wget -y
```

## CodeDeploy 에이전트 설치

```sh
wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install # 다운로드
chmod +x ./install # 실행권한 설정
sudo ./install auto # 최신버전 설치
systemctl status codedeploy-agent # 서비스 실행 중 확인
```
