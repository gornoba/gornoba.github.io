# NestJs Commander

[NestJs Commander](https://docs.nestjs.com/recipes/nest-commander#installation)  
[Nest-Commander](https://nest-commander.jaymcdoniel.dev/en/introduction/intro/)

## Install

```sh
npm i nest-commander
```

## main.ts

```typescript
import { CommandFactory } from "nest-commander";
import { AppModule } from "./app.module";

async function bootstrap() {
  await CommandFactory.run(AppModule, ["warn", "error"]);
}

bootstrap();
```

### 만약 express와 같이 실행한다면

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const commanderApi = [];
  const argv = process.argv;
  const isCli = commanderArr.some((a) => argv.includes(a));

  if (isCli) {
    await CommandFactory.run(AppModule, ["warn", "error"]);
  } else {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  }
}
bootstrap();
```

## Commander Decoreator

### Command 기본 설정

```typescript
@Command({
  name: "my-exec",
  arguments: "<task>",
  options: { isDefault: true },
})
export class TaskRunner extends CommandRunner {
  async run(inputs: string[], options: Record<string, any>): Promise<void> {}
}
```

:::tip
import { Command, CommandRunner } from 'nest-commander';
:::

### 기본설정 실행

```sh
nest start --watch my-exec
```

## Setting Options for the Command

```typescript
@Command({
  name: "my-exec",
  arguments: "<task>",
  options: { isDefault: true },
})
export class TaskRunner extends CommandRunner {
  async run(arguments: string[], options: Record<string, any>): Promise<void> {
    return options.parseShell;
  }

  @Option({
    flags: "-s, --shell <shell>",
    description: "A different shell to spawn than the default",
  })
  parseShell(shell: string) {
    return shell;
  }
}
```

### 실행

```sh
nest start --watch [argument] -s [shell]
```

## 그외 다양한 기능

- 선택 옵션을 줄 수도 있습니다. [link](https://nest-commander.jaymcdoniel.dev/en/features/commander/#setting-choices-for-your-options)
- --help, -h flag로 도움말을 설정할 수 있습니다.
- 서브 Command를 만들어 하위명령을 추가할 수 있습니다. <br/>

위 기능말고도 공식 홈페이지에는 정말 다양한 기능이 있습니다.  
저는 schedule로 batch를 돌리는게 목적이라 코드가 보여진 곳까지 만들었습니다.
