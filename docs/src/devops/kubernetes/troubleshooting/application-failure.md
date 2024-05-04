# Application Failure

- deployment의 확인 포인트
  - service 이름이 제대로 되어 있는지 확인합니다.
  - environment가 제대로 되어 있는지 확인합니다.
- service의 확인 포인트
  - port가 제대로 설정되어 있는지 확인합니다.
  - seleor와 endpoint를 확인하고 pod의 label이 제대로 되어 있는지 확인합니다.
- pod의 확인 포인트
  - deployment에 설정되어 있는 환경변수정보가 제대로 되어 있는지 확인합니다.

## referrence

https://kubernetes.io/docs/tasks/debug/debug-application/
