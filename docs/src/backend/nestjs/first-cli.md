# Link

[NestJs CLI Usages](https://docs.nestjs.com/cli/usages)

## Describe

NestJs Command Line Interface 입니다. <br/>
저는 처음 배울때는 자주 썼으나 지금은 잘 사용하지 않습니다.<br/>
처음에는 보통 module, controller, service를 만드는데 많이 사용하게 됩니다. <br/>

## Usages

```sh
nest generate <schematic> <name> [options]
nest g <schematic> <name> [options]
```

### Arguments

| Argument     |                      Description |
| :----------- | -------------------------------: |
| \<schematic> | 아래 schematics table에 내용정리 |
| \<name>      |                      원하는 이름 |

### Schematics

| Name          | Alias | Description                                                                                 |
| :------------ | ----- | ------------------------------------------------------------------------------------------- |
| `app`         |       | 모노레포에서 사용되는데 이건 나중에..                                                       |
| `library`     | `lib` | 이것도 모노레포에서..                                                                       |
| `class`       | `cl`  | Generate a new class.                                                                       |
| `controller`  | `co`  | Generate a controller declaration.                                                          |
| `decorator`   | `d`   | Generate a custom decorator.                                                                |
| `filter`      | `f`   | Generate a filter declaration.                                                              |
| `gateway`     | `ga`  | Generate a gateway declaration.                                                             |
| `guard`       | `gu`  | Generate a guard declaration.                                                               |
| `interface`   | `itf` | Generate an interface.                                                                      |
| `interceptor` | `itc` | Generate an interceptor declaration.                                                        |
| `middleware`  | `mi`  | Generate a middleware declaration.                                                          |
| `module`      | `mo`  | Generate a module declaration.                                                              |
| `pipe`        | `pi`  | Generate a pipe declaration.                                                                |
| `provider`    | `pr`  | Generate a provider declaration.                                                            |
| `resolver`    | `r`   | Generate a resolver declaration.                                                            |
| `resource`    | `res` | Generate a new CRUD resource. See the CRUD (resource) generator for more details. (TS only) |
| `service`     | `s`   | Generate a service declaration.                                                             |

### Options

| Option                |                                                               Description |
| :-------------------- | ------------------------------------------------------------------------: |
| `--dry-run`           |                              잘 실행되는지 확인하기 위해 사용 Alias: `-d` |
| `--project [project]` | 해당 요소를 추가할 프로젝트를 정한다. 모노레포에서 주로 사용. Alias: `-p` |
| `--flat`              |                                                     폴더를 만들지 않는다. |
| `--spec`              |                         test 할 수 있는 spec 파일을 만들어준다. (default) |
| `--no-spec`           |                                                    spec 파일 없이 만든다. |
