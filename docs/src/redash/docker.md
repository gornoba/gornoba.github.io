# Docker를 통한 redash 설치

## Link

https://redash.io/help/open-source/setup/  
https://hub.docker.com/r/redash/redash

## 설명

Redash는 Docker를 통해서 간단히 설치가 가능합니다.  
AWS를 사용한다면 AMI를 페이지에서 제공하니 지역만 선택하고 SSH, HTTP, HTTPS를 보안그룹에서 활성화만 하면 자동으로 만들어 집니다.  
AMI는 버전이 8이고 버전 10으로의 업그레이드가 필요한데 그것도 페이지에서 잘 설명이 나와 있습니다.  
하지만 아래 docker-compose.yml 코드를 복붙해도 됩니다.  
docker-compose.yml의 경로는 `/opt/redash` 입니다.

```yml
version: "2"
x-redash-service: &redash-service
  image: redash/redash:10.1.0.b50633
  depends_on:
    - postgres
    - redis
  env_file: /opt/redash/env
  restart: always
services:
  server:
    <<: *redash-service
    command: server
    ports:
      - "5000:5000"
    environment:
      REDASH_WEB_WORKERS: 4
  scheduler:
    <<: *redash-service
    command: scheduler
  scheduled_worker:
    <<: *redash-service
    command: worker
  adhoc_worker:
    <<: *redash-service
    command: worker
  redis:
    image: redis:5.0-alpine
    restart: always
  postgres:
    image: postgres:9.6-alpine
    env_file: /opt/redash/env
    volumes:
      - /opt/redash/postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: always
  nginx:
    image: redash/nginx:latest
    ports:
      - "80:80"
    depends_on:
      - server
    links:
      - server:redash
    volumes:
      - /opt/redash/conf.d:/etc/nginx/conf.d
    restart: always
  worker:
    <<: *redash-service
    command: worker
    environment:
      QUEUES: "periodic emails default"
      WORKERS_COUNT: 1
```

postres는 원래 port가 설정되어 있지 않지만 외부접속을 위해 port를 설정하였습니다.  
아래 환경변수를 모두 설정하고 `docker-compose up -d`를 해주시면 됩니다.

### 환경변수

https://redash.io/help/open-source/admin-guide/env-vars-settings/  
redash는 꽤 많은 환경변수를 제공합니다.  
그 중에 필요한 부분은 메일, postgres, redis를 살펴보겠습니다.
경로는 `/opt/redash/env` 입니다.

#### 메일 설정

메일을 설정하는 방법은 여러가지가 있는데 저는 제일 간단하게 gmail을 이용해보려고 합니다.  
[다른 블로그의 고마운 분](https://velog.io/@qhflrnfl4324/이메일로-인증번호-받기-구현-Nodemailerwith-Gmail)이 에서 gmail을 설정하는 방법이 잘 나와있으니 확인하고 세팅해주면 됩니다.  
그리고 vim으로 넣어주면 됩니다.

```
REDASH_MAIL_SERVER=smtp.gmail.com
REDASH_MAIL_USE_TLS=True
REDASH_MAIL_PORT=587
REDASH_MAIL_USERNAME=<메일주소>
REDASH_MAIL_PASSWORD=<비밀번호>
```

#### postgres

database는 간단합니다.  
만약 외부 database를 쓴다고 하면 아래와 같은 형식으로 변경해주시면 됩니다.  
기본 세팅은 docker-compose에 있는 postgres를 사용합니다.

```
REDASH_DATABASE_URL=postgresql://<아이디>:<비밀번호>@<host>:<port>/<database>
```

#### redis

redis도 마찬가지로 외부의 리소스를 이용한다면 아래와 같은 양식으로 해주시면 됩니다.  
기본 세팅은 docker-compose에 있는 redis 사용합니다.

```
REDASH_REDIS_URL=redis://<host>:<port>/”
```

#### domain

도메인이 있다면 아래와 같이 설정하고

```
REDASH_HOST=<도메인>
```

`/opt/redash/conf.d/default.conf` 파일의 server_name을 확인해주세요.  
환경변수의 적용은 필요없어 보이기는하나 장애가 될 것 없으니 입력해주도록 합니다.  
도메인이 설정되면 nginx의 container를 restart 혹은 reload 해줍니다.  
이후에 router 53, load balance를 설정해주면 도메인이 잘 연결 됩니다.
