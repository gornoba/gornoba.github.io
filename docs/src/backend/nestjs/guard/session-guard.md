# Session을 이용하 Guard 만들기

[Github Link](https://github.com/gornoba/nestjs-describe/tree/9114e809f7e0e6e4360567b3f9b386e7865c213e)

## Session

session은 http 프로토콜의 stateless 함으로 웹 애플리케이션이 사용자의 상태와 데이터를 유지하는 기술 입니다.  
이전에는 jwt 토큰을 만들어서 cookie에 담아서 사용하는 방법을 했는데 이번에는 session을 이용하고 guard를 만들어보도록 합시다.

## login.controller.ts

```typescript
@ApiBody({ type: UsersDto })
@UseGuards(LocalAuthGuard)
@Post('cookie')
async loginCookie(
  @Req() req: Request,
  @Res({ passthrough: true }) res: Response,
): Promise<string> {
  const user = req.user as UsersDto;
  const jwt = await this.jwtSignService.signJwt({ ...user });
  this.loginService.setCookie(res, jwt);
  return '로그인 성공';
}

@ApiBody({ type: UsersDto })
@UseGuards(LocalAuthGuard)
@Post('session')
async loginSession(@Req() req: Request): Promise<string> {
  return this.loginService.setSession(req, req.user as UsersDto);
}
```

로그인이 두개가 생겼으니까 각각 이름 만들어 구분을 해줍니다.
LocalAuthGuard의 역할은 전과 다르지 않습니다.  
username과 password를 확인하고 boolean 값으로 고객을 인증합니다.

## loginService.setSession

```typescript
setSession(req: any, user: UsersDto) {
  req.session.isAuthenticated = true;
  req.session.user = user;
  return '로그인 성공';
}
```

서비스에서는 전달받은 requset와 user 정보를 session에 넣어줍니다.  
로그인 했다는 정보를 넣어주기 위해서 isAuthenticated를 true로 해줍니다.

## session.guard.ts

```typescript
@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.session.isAuthenticated;
  }
}
```

session의 isAuthenticated 값을 보고 사용자가 로그인 했는지를 인증 합니다.

## cats.controller.ts

```typescript
@ApiOkResponse({
  description: '모든 고양이를 반환합니다.',
  type: [CatsDto],
})
@ApiOperation({
  summary: '모든 고양이를 반환합니다.',
})
@UseGuards(SessionGuard)
@Get()
findAll(@Session() session: Record<string, any>): CatsDto[] {
  console.log(session);
  return [this.cats];
}
```

이번에는 findAll에 guard를 넣어주도록 해봅시다. session이 어떻게 찍히는지도 확인해보죠.  
Swagger에서 session으로 로그인을 하고.. 모든 고양이를 반환하는 /api/cats를 요청해봅시다.

```json
Session {
  cookie: {
    path: '/',
    _expires: 2024-04-03T08:28:40.266Z,
    originalMaxAge: 3600000,
    httpOnly: true,
    secure: false
  },
  isAuthenticated: true,
  user: { id: 1, username: 'atreides', password: '12' }
}
```

그럼 위와 같이 인증이 잘 된 모습을 볼 수 있습니다.

## Session Store에 redis를 연결하기

session은 express-session 덕분에 구현하기가 매우 간단합니다.  
단 상당히 휘발성이 강합니다. 해보시면 아시겠지만 저장한번 하면 내 session 정보가 날라갑니다.  
다시 해보려면 session cookie를 삭제해줘야 제대로 작동하죠. 그래서 redis를 저장소로 이용하여 session을 정해진 만료시간까지 잘지켜봅시다~  
여기서는 docker를 사용해서 redis를 사용해 볼 겁니다.  
docker도 설명을 하면 좋은데 그건 다른 부분에서 진행하도록 하고 [docker Desktop](https://www.docker.com/get-started/)이 없으시면 설치하도록 합니다.

### Dockerfile

```dockerfile
FROM node:alpine As development
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/dist ./dist
CMD ["node", "dist/apps/auth/main"]
```

### docker-compose.yaml

```yaml
services:
  backend:
    build:
      context: .
      dockerfile: ./Dockerfile
      target: development
    command: npm run start:dev
    env_file:
      - ./.env
    depends_on:
      - redis
    volumes:
      - .:/usr/src
      - /usr/src/node_modules
    ports:
      - "3000:3000"

  redis:
    image: redis:alpine
    command: redis-server --save 60 1 --loglevel warning
    volumes:
      - ./redis-data:/data
    ports:
      - "6379:6379"
```

### main.ts

```typescript
import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';

private session() {
  this.server.use(
    session({
      store: new RedisStore({
        client: new Redis({
          host: this.redis.host,
          port: this.redis.port,
        }),
        ttl: 60 * 60,
      }),
      secret: Buffer.from(this.sessionSecret).toString('base64'), // 세션을 안전하게 유지하기 위한 비밀
      resave: false, // 세션에 변경사항이 없으면 다시 저장하지 않음
      saveUninitialized: false, // 초기화되지 않은 세션을 스토어에 저장하지 않음
      cookie: {
        secure: process.env.ENV === 'production', // https 프로토콜을 사용하는 경우 true
        httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 함
        maxAge: 1000 * 60 * 60, // 쿠키 유효 시간
      },
    }),
  );
}
```

### 실행

```sh
docker-compose up --build -V
```

실행한 뒤 다시 Swagger에서 session으로 로그인을 하고.. 모든 고양이를 반환하는 /api/cats를 요청해봅시다. 이번에도 잘 나왔을 겁니다.  
이번에는 아무데나 주석하나 만들고 저장을 눌러 서버를 재시작 해봅니다. 다시 /api/cats에 요청해봅니다. 이전과 다르게 내 session이 잘 유지되는 걸 볼 수 있습니다.  
이번에는 terminal에서 docker-compose를 꺼보고(`ctrl+c`) 다시 시작해봅니다. 그리고 다시 /api/cats에 요청해봅니다. 역시 내 session은 잘 유지되고 있습니다.
