# Task Scheduling

## 설명

[Github Link](https://github.com/gornoba/nestjs-describe/tree/7c0c6a9dbbe94eb4f8eee08426ae4728157aa433)<br/>

NestJs에서 batch를 제작하는 방법은 여러가지가 있습니다.  
그 중 하나는 scheduler를 만드는 것입니다.  
단, scheduler를 이용할 떄 여러가지 예상치 못하는 제약이 있습니다.  
처음 사용했을 떄는 다른 module에서 import하는 의존성을 알지 못하는 경우도 있고 예전에 적용한 `nestjs-cls`의 context를 읽지 못하는 경우도 있습니다.  
scheduler를 적용하면서 cats를 findAll하는 method에 적용하였고 적용하면서 cls를 Async Local Storage로 모두 교체하였습니다.

## 설치 및 적용

### 설치

```sh
npm install --save @nestjs/schedule
```

### 적용

```typescript
// app.module.ts

import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
})
export class AppModule {}
```

## 데코레이터 종류

- **Cron**: cron은 linux에서 널리 사용하는 스케줄러 입니다. [generator](https://crontab.cronhub.io/)를 이용하면 간편합니다.
  - 이름을 지정하여 동적으로 작동할 수 있습니다. [Dynamic schedule](https://docs.nestjs.com/techniques/task-scheduling#dynamic-schedule-module-api)
  - timezone을 설정할 수 있습니다.
- **Interval**: millisecond로 설정하면 해당 시간에 맞춰 반복적으로 실행됩니다.
- **Timeout**: 설정한 millisecond만큼 기다린 뒤 1번실행되고 종료 됩니다.

## 적용

작동하는 것을 보기 위해 아래와 같은 서비스를 만들었습니다.

```typescript
@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  @Cron("45 * * * * *", {
    name: "cron-job",
    timeZone: "Asia/Seoul",
  })
  handleCron() {
    this.logger.debug(`Called when the current second is 45`);
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: "cron-job-every-30-seconds",
    timeZone: "Asia/Seoul",
  })
  handleCronEvery30Seconds() {
    this.logger.debug("Called every 30 seconds");
  }

  @Interval("interval-job", 10000)
  handleInterval() {
    this.logger.debug("Called Interval every 10 seconds");
  }

  @Timeout(60000)
  handleTimeout() {
    this.schedulerRegistry.deleteCronJob("cron-job");
    this.schedulerRegistry.deleteCronJob("cron-job-every-30-seconds");
    this.schedulerRegistry.deleteInterval("interval-job");
    this.logger.debug("Called Timeout after 60 seconds and deleted all jobs");
  }
}
```

결과는 아래와 같습니다.

```sh
backend-1        | [Nest] 509  - 04/24/2024, 4:19:26 AM   DEBUG [CronService] Called Interval every 10 seconds
backend-1        | [Nest] 509  - 04/24/2024, 4:19:30 AM   DEBUG [CronService] Called every 30 seconds
backend-1        | [Nest] 509  - 04/24/2024, 4:19:36 AM   DEBUG [CronService] Called Interval every 10 seconds
backend-1        | [Nest] 509  - 04/24/2024, 4:19:45 AM   DEBUG [CronService] Called when the current second is 45
backend-1        | [Nest] 509  - 04/24/2024, 4:19:46 AM   DEBUG [CronService] Called Interval every 10 seconds
backend-1        | [Nest] 509  - 04/24/2024, 4:19:56 AM   DEBUG [CronService] Called Interval every 10 seconds
backend-1        | [Nest] 509  - 04/24/2024, 4:20:00 AM   DEBUG [CronService] Called every 30 seconds
backend-1        | [Nest] 509  - 04/24/2024, 4:20:06 AM   DEBUG [CronService] Called Timeout after 60 seconds and deleted all jobs
```

### cats controller에 적용

```typescript
@Cron('0 0 */1 * * *', {
  name: 'cats-all',
  timeZone: 'Asia/Seoul',
})
@Get()
async findAll() {
  const result = await this.catsService.findAll();
  this.logger.log(result);
  return result;
}
```

위를 적용하기 위해 cls를 als로 모두 변경하였습니다.  
이제 매 정각 시간마다 출력결과가 logd에 찍히게 됩니다.
