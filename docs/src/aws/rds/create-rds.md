# RDS 생성

`RDS > 데이터베이스 생성`

## 엔진 옵션

저는 PostgreSQL을 사용하여 선택했습니다.

## 가용성 및 내구성

단일 DB 인스턴스

## 설정

DB 인스턴스 식별자에 원하는 이름 설정  
Credentials management는 저는 Managed In AWS Secrets Manager를 선택했습니다.  
더 저렴하게 쓰고 싶다면 Self Managed를 사용하여 비밀번호를 만들면 됩니다.  
만들고 나면 상단에 비밀번호가 뭐라고 뜹니다.

## 인스턴스 구성

`버스터블 클래스(t 클래스 포함) > db.t3.micro`  
나중에 업그레이드 한다고 해도 일단 제일 낮을 걸로..

## 스토리지 유형

범용 SSD(gp2) 100GiB

## 연결

컴퓨팅 리소스 > EC2 컴퓨팅 리소스에 연결 > [만들어준 EC2 선택](/aws/ec2/instance/create-instance)

## VPC 보안 그룹(방화벽)

새로 하나 만들어 줍니다.

## 모니터링

일단 껐습니다.
