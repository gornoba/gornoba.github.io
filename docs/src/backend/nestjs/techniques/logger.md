# Logger

[NestJs Logger](https://docs.nestjs.com/techniques/logger#extend-built-in-logger)<br/>
[NestJs Pino](https://www.npmjs.com/package/nestjs-pino)

## 설치 및 구현

NestJs의 기본 Logger 매우 훌륭하지만 Pino와 더해진다면 더 많은 정보를 수집 할 수 있게 됩니다.  
특히 roation을 이용한다면 파일을 local에 저장하고 local의 파일을 이용하여 db에 저장할수도 있고 grafana, prometheus와 같은 tool을 이용할 수도 있습니다.

### 설치

```sh
npm i nestjs-pino pino-http pino-pretty rotating-file-stream
```

### app.module.ts

```typescript
import { LoggerModule } from 'nestjs-pino';
import * as rfs from 'rotating-file-stream';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pinoHttpOptions: {
          level: string;
          stream?: rfs.RotatingFileStream;
          transport?: any;
        } = {
          level: 'info',
        };

        if (configService.get('ENV') === 'production') {
          const rfsStream = rfs.createStream('file.log', {
            interval: '15s',
            size: '1M',
            path: resolve(__dirname, '..', 'logs'),
          });

          rfsStream.on('error', (err) => {
            console.error(err);
          });

          pinoHttpOptions.stream = rfsStream;
        } else {
          pinoHttpOptions.transport = {
            target: 'pino-pretty',
            options: {
              singleLine: true,
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          };
        }

        return {
          pinoHttp: pinoHttpOptions,
        };
      },
    }),
  ]
})
```

해당 코드는 운영일 때는 logger를 숨기고 rotation하여 저장하는 형태로 되어 있습니다.  
만약 개발단계라고 하면 pino-pretty를 이용하여 logger를 볼 수 있게 하였습니다.

### main.ts

```typescript
import { Logger } from "nestjs-pino";

const app = await NestFactory.create(AppModule, { bufferLogs: true });
app.useLogger(app.get(Logger));
```

마지막으로 main.ts에 해당 적용하면 pino가 적용되어 logger를 볼 수 있습니다.

### db에 저장

db에 저장할 때 rotation 된 파일을 순환하고 그것을 db에 저장하는 코드를 만들어야 할 것입니다.  
그런데 로그는 상당량이 쌓일 수 있음으로 table을 partition으로 생성합니다.  
기간은 원하는데로 하면 되는데 저는 1달 단위로 했습니다. 만약 로그가 정말 많다면 그것보다 더 짧게 테이블을 만들면 될 것 같습니다.  
스케줄러를 통해 자동화가 되어 있습니다.  
또한 저는 logger를 수집할 때 기본적으로 request가 있을 경우만 수집하였습니다. 그리고 수집이 끝나면 파일을 삭제하는 형식으로 진행하였습니다.

#### service

```typescript
import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as JSON5 from "json5";
import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import { SchedulerRepository } from "./scheduler.repository";
import { Cron } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

@Injectable()
export class SchedulerService {
  private logger = new Logger(SchedulerService.name);
  private env: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRepository: SchedulerRepository
  ) {
    this.env = this.configService.get("node.env");
  }

  @Cron("17 * * * * *")
  async sendLogTable() {
    if (this.env !== "production") {
      return;
    }

    await this.readJsonFile();
  }

  @Cron("0,5,10 0 1 * *", {
    timeZone: "Asia/Seoul",
  })
  async newMonth() {
    if (this.env !== "production") {
      return;
    }

    const date = this.today();
    await this.createPartitionTable(
      date.tableForamt,
      date.firstday,
      date.lastday
    );
    this.logger.log(
      `New month partition table created. name: ${date.tableForamt}`
    );
  }

  async readJsonFile() {
    const filePath = path.join(__dirname, "..", "..", "logs");

    if (!fs.existsSync(filePath)) {
      return "No file";
    }

    const files = fs.readdirSync(filePath);

    for (const file of files) {
      if (/^[\d-]+file\.log$/.test(file)) {
        const data = fs.readFileSync(path.join(filePath, file), "utf8");
        const logLines = data.split("\n");

        // 각 로그 항목을 JSON 객체로 파싱
        const parsedLogs = logLines
          .map((line) => {
            try {
              const json = JSON5.parse(line);

              if (!json?.req) {
                return null;
              }

              delete json?.res?.headers["content-security-policy"];
              return json;
            } catch (e) {
              return null;
            }
          })
          .filter((log) => log);

        const result = await this.schedulerRepository.insertData(parsedLogs);
        this.logger.log(`Inserted ${result.length} logs`);
        fs.unlinkSync(path.join(filePath, file));
      }
    }
  }

  async createPartitionTable(
    tableName: string,
    fromDate: string,
    toDate: string
  ) {
    await this.schedulerRepository.createPartitionTable(
      tableName,
      fromDate,
      toDate
    );
  }

  today() {
    const today = dayjs().tz("Asia/Seoul");
    const firstday = today.startOf("month").format("YYYY-MM-DD");
    const lastday = today.endOf("month").format("YYYY-MM-DD");
    const tableForamt = `nestjs_logs_${today.format("YYYYMM")}`;

    return { firstday, lastday, tableForamt };
  }
}
```

#### repository

```typescript
import { NestjsLogsEntity } from "@/db/entities/nestjs-logs/nestjs-logs.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class SchedulerRepository {
  constructor(private readonly dataSource: DataSource) {}

  async createPartitionTable(
    tableName: string,
    fromDate: string,
    toDate: string
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tableExists = await queryRunner.query(`
          SELECT EXISTS (
              SELECT 1 
              FROM information_schema.tables 
              WHERE table_name = '${tableName}'
          );
      `);

      if (!tableExists[0].exists) {
        await queryRunner.query(`
              CREATE TABLE "diet_crm"."${tableName}" PARTITION OF "diet_crm"."nestjs_logs"
              FOR VALUES FROM ('${fromDate}') TO ('${toDate}');
          `);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async insertData(data: any[]) {
    const logsEntities = data.map((a) => {
      const logsEntity = new NestjsLogsEntity();
      logsEntity.logs = a;
      return logsEntity;
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.save(logsEntities);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
```
