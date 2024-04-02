# DB dump

:::details

```sh
pg_dump --help
pg_dump 프로그램은 데이터베이스를 텍스트 파일 또는 기타
다른 형태의 파일로 덤프합니다.

사용법:
pg_dump [옵션]... [DB이름]

일반 옵션들:
-f, --file=FILENAME 출력 파일 이름
-F, --format=c|t|p 출력 파일 형식(사용자 지정, tar, 일반 텍스트)
-v, --verbose 세부 정보 표시 모드
-Z, --compress=0-9 압축되는 형식의 압축 수준
--lock-wait-timeout=TIMEOUT 테이블 잠금에 대한 TIMEOUT을 기다린 후 실패

--help 이 도움말을 표시하고 종료
--version 버전 정보를 출력하고 종료

출력 내용을 다루는 옵션들:
-a, --data-only 스키마 빼고 자료만 덤프
-b, --blobs Large Object들도 함께 덤프함
-c, --clean 다시 만들기 전에 데이터베이스 개체 지우기(삭제)
-C, --create 데이터베이스 만드는 명령구문도 포함시킴
-E, --encoding=인코딩 지정한 인코딩으로 자료를 덤프 함
-n, --schema=SCHEMA 지정한 SCHEMA들 자료만 덤프
-N, --exclude-schema=SCHEMA 지정한 SCHEMA들만 빼고 모두 덤프
-o, --oids OID 포함해서 덤프
-O, --no-owner 일반 텍스트 형식에서
개체 소유권 복원 건너뛰기
-s, --schema-only 자료구조(스키마)만 덤프
-S, --superuser=NAME 일반 텍스트 형식에서 사용할 superuser 사용자 이름
-t, --table=TABLE 지정한 이름의 테이블들만 덤프
-T, --exclude-table=TABLE 지정한 테이블들만 빼고 덤프
-x, --no-privileges 액세스 권한 (grant/revoke) 정보는 덤프 안 함
--binary-upgrade 업그레이드 유틸리티 전용
--inserts COPY가 아니라 INSERT 명령으로 데이터 덤프
--column-inserts 열 이름과 함께 INSERT 명령으로 데이터 덤프
--disable-dollar-quoting $ 인용 구문 사용안함 , SQL 표준 따옴표 사용
--disable-triggers 자료만 복원할 때 트리거 사용을 안함
--no-tablespaces 테이블스페이스 할당을 덤프하지 않음
--role=ROLENAME 덤프 전에 SET ROLE 수행
--use-set-session-authorization
SET SESSION AUTHORIZATION 명령을 ALTER OWNER 명령
대신 사용하여 소유권 설정

연결 옵션들:
-h, --host=HOSTNAME 접속할 데이터베이스 서버 또는 소켓 디렉터리
-p, --port=PORT 데이터베이스 서버의 포트 번호
-U, --username=NAME 연결할 데이터베이스 사용자
-w, --no-password 암호 프롬프트 표시 안 함
-W, --password 암호 입력 프롬프트 보임(자동으로 처리함)

데이터베이스 이름을 지정하지 않았다면, PGDATABASE 환경변수값을
사용합니다.
```

:::

## 백업

```sh
pg_dump -U [username] -h [host] -p [port] [database-name] > [filename].sql
```

## 복원

```sh
psql -U [username] -h [host] -p [port] [database-name] < [filename].sql
```

복원하기 전에 database를 삭제하고 다시 생성하는 것이 좋습니다.

## 압축하여 백업

```sh
pg_dump -U [username]  -h [host] -p [port] -d [database-name] -Fc -Z [0-9 압축률] -f "[filename].dump"
```

## 압축한 백업 복원

```sh
pg_restore -U [username]  -h [host] -p [port] -d [database-name] [filename].dump
```
