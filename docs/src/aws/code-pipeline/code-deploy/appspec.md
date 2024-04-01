# appspec.yaml

[CodeDeploy AppSpec 파일 참조](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file.html) <br/>
[AppSpec EC2/온프레미스 배포를 위한 파일 구조](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure.html#server-appspec-structure) <br/>
[AppSpec 파일 및 파일 위치 확인](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-validate.html)<br/>
[AppSpec EC2/온프레미스 배포를 위한 파일 예제](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-example.html#appspec-file-example-server)

```sh
version: 0.0
os: linux
files:
  - source: Config/config.txt
    destination: /webapps/Config
  - source: source
    destination: /webapps/myApp
hooks:
  BeforeInstall:
    - location: Scripts/UnzipResourceBundle.sh
    - location: Scripts/UnzipDataBundle.sh
  AfterInstall:
    - location: Scripts/RunResourceTests.sh
      timeout: 180
  ApplicationStart:
    - location: Scripts/RunFunctionalTests.sh
      timeout: 3600
  ValidateService:
    - location: Scripts/MonitorService.sh
      timeout: 3600
      runas: codedeployuser

```
