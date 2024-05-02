# Event

event emitter는 애플리케이션을 다양한 측면으로 분리할 수 있습니다.

## 설치 및 셋업

```sh
npm i --save @nestjs/event-emitter
```

```typescript
@Module({
  imports: [
    EventEmitterModule.forRoot(
      wildcard: false, // wildcard를 사용하 ㄹ수 있게 됩니다.
      delimiter: '.', // namespace에 분리지점을 설정할 수 있습니다.
      newListener: false, // true로 하면 newListener event가 발생합니다.
      removeListener: false, // true로 하면 removeListener event가 발생합니다.
      maxListeners: 10, // listener의 최대 숫자를 설정합니다.
      verboseMemoryLeak: false, // maxListeners를 초과하는 리스너가 추가될 때 발생하는 메모리 누수 경고 메시지에 이벤트 이름이 포함됩니다.
      ignoreErrors: false, // 에러를 무시하게 됩니다.
    )
  ],
})
export class AppModule {}
```

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/bce710cdc995fc3090f147c1eca0b3c7d4327af3)

### controller

eventEmitter로 `cat.updated`라는 이벤트로 데이터를 전달 합니다.  
boolean이 return 됩니다.

```typescript
@Put('pu-emit/:id')
async updateEmit(
  @Param('id', new ParseIntPipe()) id: number,
  @Body() updateCatDto: UpdateCatDto,
) {
  this.eventEmitter.emit('cat.updated', { id, updateCatDto });
}
```

### listenser

리스너에서 catsService의 update를 호출합니다.

```typescript
@OnEvent('cat.updated', {
  nextTick: true, // 이벤트 루프 틱에서 실행되도록 예약됩니다.
  async: true, // 비동기함수로 처리할 수 있게 됩니다.
  suppressErrors: true, // 에러가 무시됩니다.
})
async catUpdatedListen(event: any) {
  await this.catsService.update(event.id, event.updateCatDto);
}
```

## 한계

`@nestjs/event-emitter` 모듈은 이벤트를 발행하고 구독하는 용도로 설계되어 있어서 결과값을 return 받지 못합니다.  
이벤트 기반 아키텍처에서는 통상적으로 발행자(publisher)와 구독자(subscriber)가 분리되어 있습니다. 이벤트 발행자는 이벤트를 발생시키기만 하며, 발생된 이벤트를 처리하는 결과를 기다리지 않습니다. 이는 이벤트를 동기적으로 처리하는 것이 아니라 비동기적으로 처리되도록 설계되었기 때문입니다.

## 보완

### custom-emitter

custom emitter를 제작해보았습니다.  
최대 리스너는 10개로 하고 handleMessage에서 이벤트와 최대리스너를 처리하게 됩니다.  
결과값은 res에 포함하여 보냅니다.

```typescript
export interface EventData {
  sessionId: string;
  subject?: string;
  payload?: any;
}

@Injectable()
export class CustomEmitterService {
  private readonly logger = new Logger(CustomEmitterService.name);
  private eventSubject = new Subject<EventData>();
  private activeSubscriptions = 0;
  private maxSubscriptions = 10;

  getEventObservable(): Observable<EventData> {
    this.activeSubscriptions++;
    return this.eventSubject.asObservable();
  }

  handleMessage(data: EventData, res?: Response) {
    this.eventSubject.next(data);

    if (res) {
      const subscribe = this.getEventObservable().subscribe({
        next: (resData) => {
          if (this.activeSubscriptions > this.maxSubscriptions) {
            res
              .status(HttpStatus.TOO_MANY_REQUESTS)
              .send({ success: false, message: "Too many listeners" });
          } else {
            const result = { success: true, data: null };
            if (resData.sessionId === data.sessionId) {
              result.data = resData.payload;
            }
            subscribe.unsubscribe();
            this.activeSubscriptions--;
            res.status(HttpStatus.OK).send(result);
          }
        },
        error: (error) => {
          this.activeSubscriptions--;
          this.handleError(error);
        },
      });
    }
  }

  handleError(error: any) {
    this.eventSubject.error(error);
    this.logger.error("An error occurred", error);
  }

  complete() {
    this.eventSubject.complete();
  }
}
```

### controller

controller에서 event를 호출합니다.  
이때 요청자를 구분하기 위하여 session id를 포함하여 보냅니다.

```typescript
@Get('custom-emit')
async customEmit(
  @Session() session: Record<string, any>,
  @Res() res: Response,
) {
  this.customEmitterService.handleMessage(
    {
      sessionId: session.id,
      subject: 'CatsService.findAll',
    },
    res,
  );
}
```

### service

service에서는 module이 init할 때 이벤트를 구독합니다.  
subject를 `.`로 구분하여 앞단은 service 이름 뒷단은 method 이름으로 필터합니다.  
만약 적절한 값이 전달되면 동적으로 method를 호출하고 handleMessage로 이벤트를 생성합니다.

```typescript
onModuleInit() {
  this.customEmitterService.getEventObservable().subscribe({
    next: async (data) => {
      if (data?.subject) {
        const subject = data.subject as string;
        const subjectSplit = subject.split(/\./);

        if (
          subjectSplit[0] === CatsService.name &&
          this[subjectSplit[1]] instanceof Function
        ) {
          const result = await this[subjectSplit[1]]();
          this.customEmitterService.handleMessage({
            sessionId: data.sessionId,
            payload: result,
          });
        }
      }
    },
    error: (error) => {
      this.customEmitterService.handleError(error);
    },
  });
}
```
