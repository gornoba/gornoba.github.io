# Code Deploy 생성

## appsepc 작성

[appspec.yml](/aws/code-pipeline/code-deploy/appspec)

```yml
version: 0.0
os: linux
files:
  - source: /
    destination: /home/ec2-user/build
    overwrite: true
file_exists_behavior: OVERWRITE

hooks:
  AfterInstall:
    - location: scripts/AfterInstall.sh
      timeout: 120
      runas: root
  ApplicationStart:
    - location: scripts/ApplicationStart.sh
      timeout: 120
      runas: root
```

## 애플리케이션 생성

`CodeDeploy > 애플리케이션 > 애플리케이션 생성`  
이름을 작성하고 컴퓨팅 플랫폼에 `EC2/온프레미스`를 선택합니다.

## 배포 그룹 생성

`CodeDeploy > 애플리케이션 > 애플리케이션 > [애플리케이션 이름] > 배포 그룹 생성`

### 배포 그룹 이름

원하는 이름으로 만듭니다.

### 서비스 역할

Code Deploy를 위해 만든 [역할](/aws/iam/access-management/role#codedeploy를-위한-역할-설정)을 선택합니다.

### 환경구성

Amazon EC2 인스턴스을 선택하고 배포하려는 EC2의 태그를 선택해줍니다.

### 로드 밸런서

로드 밸런싱 활성화에 체크를 해지 합니다.

## 배포 생성

`CodeDeploy > 애플리케이션 > 애플리케이션 > [애플리케이션 이름] > 배포 생성`  
배포 그룹이 만들어지면 배포를 생성합니다.

### 배포 설정

개정 유형을 `애플리케이션을 GitHub에 저장`을 선택하고 GitHub을 연결해줍니다.  
저는 github을 테스트로 사용했습니다. Code Build의 아티팩트가 S3에 저장되니 실제 배포에서는 S3를 사용합니다.

### 추가 배포 동작 설정

배포 실패를 선택 합니다.

:::info
배포 이전에 appspec 파일이 root 폴더에 있어야 합니다.<br/>
appspec에 files의 destination이 ec2에 존재해야 합니다.
:::
