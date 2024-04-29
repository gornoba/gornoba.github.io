# Queue

[NestJs Queue](https://docs.nestjs.com/techniques/queues)

## 역할

1. 처리 피크를 평탄화하기: 사용자가 임의의 시간에 자원 집약적 작업을 시작할 수 있는 경우, 이러한 작업을 동기적으로 수행하는 대신 큐에 추가하고 작업자 프로세스가 제어된 방식으로 큐에서 작업을 가져오도록 할 수 있습니다. 애플리케이션이 확장됨에 따라 큐 소비자를 쉽게 추가하여 백엔드 작업 처리를 확장할 수 있습니다.
   - 온라인 상점에서 대규모 세일 이벤트 동안, 많은 사용자들이 동시에 주문을 합니다. 이때 주문 처리와 결제 확인이 자원 집약적 작업을 유발하여 서버에 부하를 줄 수 있습니다.
2. 대형 태스크 분할: 사용자 요청이 CPU 집약적 작업(예: 오디오 트랜스코딩)을 필요로 하는 경우, 이러한 작업을 다른 프로세스에 위임하여 사용자 대면 프로세스가 응답성을 유지하도록 할 수 있습니다.
   - 웹 기반 비디오 편집 플랫폼에서 사용자가 고해상도 비디오 파일을 업로드하고, 변환을 요청합니다. 비디오 트랜스코딩은 매우 CPU 집약적입니다.
3. 서비스 간 신뢰할 수 있는 통신 채널 제공: 한 프로세스 또는 서비스에서 작업(작업)을 큐에 넣고 다른 프로세스에서 이를 소비할 수 있습니다. 작업의 수명 주기에 걸쳐 완료, 오류 또는 다른 상태 변경이 있을 때 알림을 받을 수 있습니다(상태 이벤트를 청취하여). 큐 생산자나 소비자가 실패할 경우 그 상태는 보존되고 노드가 재시작될 때 작업 처리가 자동으로 재개될 수 있습니다.
   - 전자 상거래 플랫폼에서 주문 시, 재고 관리, 배송 처리, 결제 서비스 등 다양한 시스템과의 상호 작용이 필요합니다.

## 설치 및 setup

### 설치

```sh
npm install --save @nestjs/bull bull
```

### setup

```typescript
import { ConfigService } from "@nestjs/config";
import { QueueOptions } from "bull";

export const bullModuleOptions = {
  useFactory: async (configService: ConfigService): Promise<QueueOptions> => {
    const redis = JSON.parse(configService.get("REDIS"));

    return {
      prefix: "queue",
      redis: {
        host: redis.host,
        port: redis.port,
      },
      limiter: {
        max: 1000,
        duration: 1000, // 1초동안 최대 1000개 처리
        bounceBack: true, // 대기열 초과시에도 초과시 대기
      },
      defaultJobOptions: {
        priority: 3, // 중간 수준의 우선순위
        delay: 1000, // 1초 후에 작업 처리 시작
        attempts: 3, // 작업이 성공할 때까지 최대 3번 시도
        backoff: {
          type: "fixed", // 고정된 시간 간격
          delay: 2000, // 실패 후 2초 후에 재시도
        },
        timeout: 30000, // 30초 후에 타임아웃 오류 발생
        removeOnComplete: true, // 작업 완료 후 자동으로 삭제
        removeOnFail: false, // 실패 후 작업을 큐에 유지
        stackTraceLimit: 10, // 스택 트레이스 라인 수 제한
      },
    };
  },
  inject: [ConfigService],
};
```

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/cceac1f8c53c31a28872ad4ea415e951e818bc61)

### module

```typescript
BullModule.registerQueue({ name: "cats" });
```

### controller or provider

```typescript
async findAll() {
  const result = await this.catsQueue.add(
    'findAll',
    'findAll',
    {}, // 추가옵션이 있다면
  );
  return await result.finished();
}
```

### queue

```typescript
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CatsService } from "./cats.service";

@Processor("cats")
export class CatsQueue {
  constructor(private readonly catsService: CatsService) {}

  @Process("findAll")
  async findAll(job: Job) {
    if (job.data === "findAll") {
      const result = await this.catsService.findAll();
      return result;
    }
    return [];
  }
}
```

## 활용방향

1. 이메일 발송 서비스
   - 사용자가 회원가입, 비밀번호 재설정, 주문 확인 등을 할 때 자동으로 이메일을 발송합니다. 큐를 사용하면 대량의 이메일 발송 요청을 순차적으로 처리하여 이메일 서버에 발생할 수 있는 부하를 줄일 수 있습니다.
2. 비디오 트랜스코딩 서비스

- 사용자가 비디오를 업로드하면 다양한 디바이스에서 재생 가능하도록 여러 형식으로 트랜스코딩합니다. 각 트랜스코딩 작업을 큐에 추가하여 시스템 리소스를 효율적으로 사용할 수 있습니다.

3. 주문 처리 시스템

- 전자상거래 플랫폼에서 사용자의 주문을 받고, 재고 확인, 결제 처리, 배송 준비 등의 과정을 큐를 통해 관리합니다. 이를 통해 각 단계의 처리가 독립적으로 이루어지며, 전체 프로세스의 효율성을 높일 수 있습니다.

4. PDF 생성 및 보고서 생성 서비스

- 대량의 데이터를 처리하여 보고서나 PDF 문서를 생성할 때, 요청을 큐에 추가하고 순차적으로 생성 작업을 진행할 수 있습니다. 이 방법은 서버가 과부하되는 것을 방지하고 사용자에게 완성된 문서를 제공하는 데 걸리는 시간을 최적화할 수 있습니다.

5. 백업 및 데이터 마이그레이션 작업

- 데이터의 정기적인 백업이나 대규모 데이터의 이전을 처리할 때, 작업을 큐에 넣어 순차적으로 처리함으로써 데이터 무결성을 보장하고, 프로세스의 안정성을 유지할 수 있습니다.

6. 임시 이미지 또는 데이터 처리

- 사진 공유 사이트나 소셜 미디어 플랫폼에서 사용자가 이미지를 업로드할 때, 이미지 리사이징, 필터 적용, 메타데이터 추출 등의 작업을 큐를 통해 관리합니다.

7. 태스크 스케줄링 및 워크플로우 관리

- 다양한 작업의 실행을 예약하고, 종속성에 따라 순차적 또는 병렬로 실행하도록 조정합니다. 예를 들어, 데이터 처리 파이프라인에서 여러 단계의 작업을 큐와 함께 조정할 수 있습니다.

## 한계

`Queue`의 interface를 보면 `EventEmitter`를 상속받는 것을 볼 수 있습니다.  
이것은 queue가 lifecycle에 추가된다면 queue 이전과 이후가 단절되었다고 보는 것이 좋습니다.  
예를들어 코드 단축을 위해 만들어 놓았던 `TransactionDecorator` 혹은 middleware에 `Async Local Strage`을 이용하여 session 정보를 저장해두었던 것은 전혀 쓸수가 없게 됩니다.  
queue를 전달해주면서 session 정보를 전달해주고 transaction을 각각 따로 만들어야 합니다.  
그러므로 [별도의 프로세스](https://docs.nestjs.com/techniques/queues#separate-processes)를 만들어 성능향상과 더불어 코드를 분리할 수 있습니다.  
다만 별도의 프로세스를 만든다면 NestJs의 의존성을 사용할 수 없게 되어 외부 종속성을 다시 세팅해주어야 합니다.
