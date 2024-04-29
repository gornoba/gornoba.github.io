# 다중 요청건에 대한 방어

## 개발 배경

개발을 하면서 frontend에서는 여러번에 요청을 막기 위해서 보통 `debounce`를 버튼 등에 걸어 놓습니다.  
`debounce`가 걸린 버튼은 정해진 시간동안 클릭을 많이한다고 하더라도 1번으로 인정되어 백엔드에 요청됩니다.  
그러나 사람이 하는 일이다 보니 놓치는 부분은 언제나 존재 합니다.  
이번 프로젝트를 하면서 요청 온 것이 처리가 완료될때까지 이전 처리를 어떻게 해결할지에 대해 논의해보고 구현해보겠습니다.

## 과제

### 어떻게 각 api의 실행시간을 예상할 것인가?

1. 먼저 latency와 관련된 entity를 만들어 주었습니다. latency는 sessionId를 기준으로 요청되는 method_url과 latency를 수집합니다.

```typescript
@Entity({
  name: "latency",
})
@Index(["url", "createdAt"])
export class LatencyEntity extends AbstractEntity {
  @Column({
    type: "varchar",
  })
  sessionId: string;

  @Column({
    type: "varchar",
  })
  method_url: string;

  @Column({
    type: "int",
  })
  latency: number;
}
```

2. 어떤 값을 latency로 결정할 것인가?
   postgres에서는 통계적 계산을 해줄 수 있는 다양한 함수를 제공합니다. 그 중에 저는 표준편차를 사용하기로 하였고 간단하게 create와 select할 수 있는 repository를 만들었습니다.

```typescript
@Injectable()
export class LatencyRepository {
  constructor(
    @InjectRepository(LatencyEntity)
    private latencyRepository: Repository<LatencyEntity>
  ) {}

  async createLatency(data: LatencyEntity) {
    return await this.latencyRepository.save(data);
  }

  async meanLatency(method_url: string) {
    const today = new Date();
    const result = await this.latencyRepository
      .createQueryBuilder("latency")
      .select("STDDEV(latency.latency)", "stddev")
      .where(
        `latency.createdAt between :today::timestamp - interval '1' day AND :today::timestamp`,
        {
          today,
        }
      )
      .andWhere("latency.method_url = :method_url", { method_url })
      .getRawOne();

    return parseInt(result.stddev, 0) || 100;
  }
}
```

코드와 같이 1일전에서 오늘까지의 표준편차를 구하고 만약 값이 없으면 100ms로 고정하였습니다.

### 어떻게 데이터를 수집할 것인가?

해당 부분은 interceptor를 이용하였습니다. interceptor는 요청이 시작되고 끝나는 모든 지점에서 사용되어 latency를 계산하기에는 매우 유용했습니다.

```typescript
@Injectable()
export class LatencyInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LatencyInterceptor.name);

  constructor(private readonly latencyRepository: LatencyRepository) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const req = context.switchToHttp().getRequest();
    const start = performance.now();
    const sessionId = req.session.id;
    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      tap(() => {
        if (method === "GET") {
          const elapsedTime: number = performance.now() - start;
          const entity = new LatencyEntity();
          entity.sessionId = sessionId;
          entity.url = url;
          entity.latency = Math.floor(elapsedTime);

          this.latencyRepository
            .createLatency(entity)
            .catch((error) => this.logger.error(error));
        }
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
```

### 어떤 부분에서 한꺼번에 요청 들어오는 경우를 막을 것인가?

이것은 middleware를 이용하기로 하였습니다. middleware는 NestJs의 lifecycle에서 가장 먼저 실행되는 부분입니다.

```typescript
@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly latencyRepository: LatencyRepository
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.session.id;
    const url = req.baseUrl;
    const method = req.method;
    const value = `${method}-${url}`;

    const cached = await this.cacheManager.get(sessionId);

    if (!cached || (cached && cached !== value)) {
      // latency cache
      let latencyCache: number = await this.cacheManager.get(value);
      if (!latencyCache) {
        latencyCache = await this.latencyRepository.meanLatency(value);
        await this.cacheManager.set(value, latencyCache, 1000 * 60 * 10);
      }

      // session cache
      await this.cacheManager.set(sessionId, value, latencyCache + 100);
      next();
    } else if (cached === value) {
      res.status(429).json({
        statusCode: 429,
        message: "이전 요청이 끝날때까지 기다려주세요.",
      });
    } else {
      next();
    }
  }
}
```

요청이 들어오면 sessionId를 key로 요청된 method와 url을 결합하여 value로 넣고 계산된 latency를 ttl로 넣습니다.  
method_url 또한 10분간 cache로 유지합니다.  
이제 요청이 중복으로 들어올 경우 해당 sessionId로 동일한 method_url로 요청이 들어온다면 429 에러가 발생하게 됩니다.
