# Commands and Arguments in Pod Definition Files

## Docker 내의 Commands, Arguments, 및 Entry Points

Docker 컨테이너는 특정 작업이나 프로세스를 실행하기 위해 존재합니다. 예를 들어, 웹 서버, 애플리케이션 서버, 데이터베이스 또는 계산 및 분석 작업을 실행합니다. 작업이 완료되면 컨테이너는 종료됩니다. 컨테이너 내에서 실행할 프로세스는 Dockerfile의 `CMD` 명령어를 통해 정의됩니다.

### Docker run 예시

Ubuntu 이미지에서 Docker 컨테이너를 실행할 경우 기본적으로 bash가 실행됩니다. Docker는 기본적으로 컨테이너에 터미널을 연결하지 않으므로 bash는 종료됩니다.

```bash
docker run ubuntu
```

### 커맨드 변경 방법

Docker run 명령어에 커맨드를 추가하여 기본 커맨드를 덮어쓸 수 있습니다. 예를 들어, Ubuntu 이미지에서 5초간 대기하는 컨테이너를 실행하려면 다음과 같이 입력합니다.

```bash
docker run ubuntu sleep 5
```

### 자신의 이미지 생성

기본 동작을 변경하기 위해 기반 Ubuntu 이미지에서 새로운 Docker 이미지를 생성할 수 있습니다. 이때, `CMD` 명령어를 사용하여 기본 커맨드를 변경할 수 있습니다.

### Entry Point의 사용

`ENTRYPOINT`는 컨테이너가 시작될 때 실행할 프로그램을 지정합니다. 커맨드 라인에서 지정한 파라미터는 `ENTRYPOINT`에 추가됩니다.

```Dockerfile
FROM ubuntu
ENTRYPOINT ["sleep"]
```

이 방식을 사용하면 커맨드 라인에서 다음과 같이 컨테이너 실행 시간을 지정할 수 있습니다.

```bash
docker run ubuntu-sleeper 10
```

default 지정

```Dockerfile
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

entrypoint override

```sh
docker run --entirypoint sleep2.0 ubuntu-sleeper 10
```

## 요약

- **Commands**와 **Arguments**는 컨테이너가 실행할 작업을 정의합니다.
- Docker 컨테이너는 특정 작업 완료 후 종료됩니다.
- `CMD` 명령어는 Docker 이미지 내에서 기본적으로 실행될 커맨드를 정의합니다.
- `ENTRYPOINT` 명령어는 커맨드 라인 파라미터를 프로그램 실행에 추가하는 데 사용됩니다.
- 컨테이너의 실행 동작을 변경하려면 `docker run` 명령어에 커맨드를 추가하거나 새 Docker 이미지를 생성하여 `CMD` 또는 `ENTRYPOINT`를 사용할 수 있습니다.

## K8s Reference Docs

https://docs.docker.com/engine/reference/builder/#cmd
