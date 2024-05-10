# Server Sent Event

SSE는 실시간 업데이트 혹은 채팅 같은 서비스를 매우 간단하게 구현할 수 있는 기능 입니다.

## 사용법

NestJs에서 SSE는 rxjs를 사용하고 `@Sse` 데코레이터를 사용합니다.

```typescript
@Sse('sse')
sse(): Observable<MessageEvent> {
  return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
}
```

## 의문점

### 1. 어떻게 DB에서 데이터를 가져와서 비동기를 구현할 것인가?

이것은 제가 rxjs를 잘 몰랐을 때 생겼던 의문입니다.  
rxjs는 이벤트 기반이긴 하지만 비동기를 구현할 수 있는 api가 충분히 있습니다.  
저는 sse에서는 주로 switchmap을 사용합니다.

### 2. 어떻게 DB가 update 될때만 데이터를 전달할 수 있을까?

사용법에 코드와 같이 1초에 1번씩 DB에 query를 날려 데이터를 가져오는 방식은 어쩔 수 없이 DB에 많은 무리가 가게 됩니다.  
어떻게하면 DB가 insert 되거나 update 될때만 db에 접속하여 데이터를 받아올 수 있을까를 고민하게 되었습니다.

#### PostgreSQL notify

이 답은 DB에 있었는 저는 주로 postgresql을 쓰고 있었고 plsql을 지원하여 trigger와 function을 이용하여 테이블이 변경되었다는 것을 notify 해줄 수 있었습니다.

- Trigger
  - 트리거는 테이블에 생하게 됩니다.
  - 아래의 SQL을 이용하면 insert나 update 될 때 function을 호출합니다.
  ```sql
  create trigger [이름] after
  insert
      or
  update
      on
      [테이블명] for each row execute function [function 명]
  ```
- Function

  - Function은 notify를 하는 역할 을 합니다.
  - update와 insert를 구분해서 notify하고 value에 변경된 데이터의 일부를 보냅니다.
  - 여기서는 날짜를 보내는데 현재 조회중인 날짜가 해당 날짜에 포함된다면 업데이트를 하는 형식이면 될 것 같습니다.

  ```sql
  CREATE OR REPLACE FUNCTION [function 명]
  RETURNS trigger
  LANGUAGE plpgsql
  AS $function$
  BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify('realtime', json_build_object('key', 'insert', 'value', TG_TABLE_NAME || '|' || NEW.created_at)::text);
    ELSIF TG_OP = 'UPDATE' THEN
      PERFORM pg_notify('realtime', json_build_object('key', 'update', 'value', TG_TABLE_NAME || '|' || NEW.updated_at)::text);
    END IF;

    RETURN NEW;
  END;
  $function$;

  ```

#### PG connect & event emmit

이제 NestJs에서 notify를 수신할 수 있어야 합니다. 수신하기 위한 서비스를 하나 만들어 줍니다.  
해당 코드는 postgresql의 notify를 듣고 rxjs로 subscribe하는 대상에게 데이터를 보내줍니다.

```typescript
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Subject } from "rxjs";
import { Client } from "pg";
import { ConfigService } from "@nestjs/config";
import { pgConfig } from "../config/pg.config";

@Injectable()
export class PubsubService implements OnModuleInit {
  private readonly logger = new Logger(PubsubService.name);
  private eventSubject = new Subject<any>();
  private client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client(pgConfig);
  }

  onModuleInit() {
    this.client.connect();

    this.client.on("connect", () => {
      this.client.query("LISTEN realtime");
    });

    this.client.on("notification", async (msg) => {
      const { channel, payload } = msg;

      if (channel === "realtime") {
        payload.split("|").reduce((a, b, i) => {
          if (i === 0) {
            a["table"] = b;
          } else {
            a["realtimeDate"] = b;
          }
          return a;
        }, {});
        this.handleMessage(payload);
      }
    });

    this.client.on("error", (err) => {
      this.logger.error(err);
    });
  }

  getEventSubject() {
    return this.eventSubject.asObservable();
  }

  handleMessage(data: string) {
    this.eventSubject.next(data);
  }
}
```

#### sse

이제 마지막 입니다.  
event emit로 받아온 데이터를 확인하고 그것이 맞다면 새롭게 db에서 데이터를 받아와 return 해줍니다.

```typescript
@Sse()
async sse(@Param() param: {startDate: string, endDate: string}) {
  const realtimeDate: string

  const pubsub = this.pubsubService.getEventSubject();
  pubsub.pipe().subscribe((data) => {
    if (data.table === '테이블명') // 내가 update하려는 테이블과 관련되어 있는지 확인하기 위함
    {
      realtimeDate = _.cloneDeep(data.realtimeDate)
    }
  });

  return interval(1000).pipe(
    startWith(0),
    switchMap(async () => {
      if (realtimeDate) {
        const realtimeDayjs = dayjs(realtimeDate);
        const startDateDayjs = dayjs(startDate);
        const endDateDayjs = dayjs(endDate);

        if ((realtimeDayjs.isAfter(startDateDayjs) || realtimeDayjs.isSame(startDateDayjs)) && (realtimeDayjs.isBefore(endDateDayjs) || realtimeDayjs.isSame(endDateDayjs))) {

          const data = await this.sseService.dataGet(
            param.startDate,
            param.endDate,
          );

          realtimeDate = undefined;

          return { data };
        }
      } else {
        return '동일';
      }
    }),
  );
}
```
