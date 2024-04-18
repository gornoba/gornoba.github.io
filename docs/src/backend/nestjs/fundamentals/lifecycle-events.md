# Lifecycle Events

## Lifecycle sequence

![alt](https://docs.nestjs.com/assets/lifecycle-events.png)

## Lifecycle events

<table>
  <thead>
    <tr>
      <th>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >수명주기 후크 방법</font
          ></font
        >
      </th>
      <th>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >후크 메서드 호출을 트리거하는 수명 주기 이벤트</font
          ></font
        >
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>onModuleInit()</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >호스트 모듈의 종속성이 해결되면 호출됩니다.</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td><code>onApplicationBootstrap()</code></td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >모든 모듈이 초기화된 후 호출되지만 연결을 수신하기 전에
            호출됩니다.</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td>
        <code>onModuleDestroy()</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">*</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">종료 신호(예: </font></font
        ><code>SIGTERM</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >)가 수신된 후 호출됩니다.</font
          ></font
        >
      </td>
    </tr>
    <tr>
      <td>
        <code>beforeApplicationShutdown()</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">*</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">모든 </font></font
        ><code>onModuleDestroy()</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >핸들러가 완료된 후 호출됩니다(프로미스 해결 또는 거부).
          </font></font
        ><br /><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >완료되면(프라미스가 해결되거나 거부됨) 기존의 모든 연결이 닫힙니다(
          </font></font
        ><code>app.close()</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">호출됨).</font></font
        >
      </td>
    </tr>
    <tr>
      <td>
        <code>onApplicationShutdown()</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">*</font></font
        >
      </td>
      <td>
        <font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;"
            >연결이 닫힌 후 호출됩니다(
          </font></font
        ><code>app.close()</code
        ><font style="vertical-align: inherit;"
          ><font style="vertical-align: inherit;">해결).</font></font
        >
      </td>
    </tr>
  </tbody>
</table>

## 구현

[Gihub Link](https://github.com/gornoba/nestjs-describe/tree/fd8e6d02a8c6cb79e41fa108d32f897f85906bb6)

```typescript
@Controller()
export class AppController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log("onModuleInit");
  }

  onApplicationBootstrap() {
    console.log("onApplicationBootstrap");
  }

  onModuleDestroy() {
    console.log("onModuleDestroy");
  }

  beforeApplicationShutdown() {
    console.log("beforeApplicationShutdown");
  }

  onApplicationShutdown(signal?: string) {
    console.log("onApplicationShutdown");
  }
}
```

### 결과

```
backend-1   | onModuleInit
backend-1   | onApplicationBootstrap
backend-1   | [Nest] 48  - 04/18/2024, 12:52:35 AM     LOG [NestApplication] Nest application successfully started +5ms
backend-1   | [Nest] 48  - 04/18/2024, 12:52:35 AM     LOG [Application] Server running on http://localhost:3000
backend-1   | ✔  TSC  Initializing type checker...
backend-1   | >  TSC  Found 0 issues.
backend-1   | onModuleDestroy
backend-1   | beforeApplicationShutdown
backend-1   | onApplicationShutdown
```
