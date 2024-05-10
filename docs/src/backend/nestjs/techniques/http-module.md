# Http Module

자주 사용하는 axios를 module로 만들었고 rxjs를 사용하게 됩니다.

## 설치

```sh
npm i --save @nestjs/axios axios
```

## 사용

```typescript
@Module({
  imports: [HttpModule],
  providers: [CatsService],
})
export class CatsModule {}

@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<Cat[]>> {
    return this.httpService.get("http://localhost:3000/cats");
  }
}
```

## 예시

```typescript
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Cat[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Cat[]>("http://localhost:3000/cats").pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw "An error happened!";
        })
      )
    );
    return data;
  }
}
```
