# Dynimic Modules

## 동적 모듈(Dynamic Modules) 소개

NestJS에서 동적 모듈은 애플리케이션의 구성을 실행 시간에 결정할 수 있게 해주는 기능입니다. 기본적으로 모듈은 애플리케이션의 일부 기능을 묶어 관리하는데 사용됩니다. 동적 모듈은 이러한 모듈의 설정을 사용하는 시점에 조정할 수 있어, 같은 모듈을 다양한 방법으로 재사용할 수 있습니다.

## 동적 모듈 사용 사례

동적 모듈은 특히 설정이나 환경에 따라 달라져야 하는 기능을 포함하는 모듈에 유용합니다. 예를 들어, 다양한 데이터베이스 설정이 필요한 경우나, 서로 다른 외부 서비스의 API 키를 사용해야 하는 경우에 동적 모듈을 사용할 수 있습니다.

## 설정 모듈(Config Module) 예시

ConfigModule은 환경 변수나 설정 파일을 관리하는데 사용되는 모듈입니다. 동적 모듈을 사용하여, ConfigModule을 여러 환경에 맞게 다르게 설정할 수 있습니다. 예를 들어, 개발 환경과 운영 환경에서 다른 데이터베이스를 사용하도록 설정할 수 있습니다.

typescript
Copy code
@Module({
imports: [
ConfigModule.register({ folder: './config' })
]
})
export class AppModule {}
위 코드에서 ConfigModule.register()는 설정 파일이 위치할 폴더를 지정합니다.

## 모듈 구성

동적 모듈을 구성할 때는 register 또는 registerAsync 메소드를 통해 모듈을 초기화하고, 필요한 설정을 전달합니다. 이 메소드들은 설정 객체를 받아 모듈의 providers에 추가하고, 이를 모듈 내부에서 사용할 수 있도록 합니다.

### 동적 모듈 구성의 기본 개념

동적 모듈은 @Module() 데코레이터를 사용하여 정적으로 선언된 모듈과 비슷하게 시작합니다. 하지만, 설정 정보를 동적으로 처리하기 위해 register 또는 registerAsync 메소드를 포함할 수 있습니다. 이 메소드들은 모듈을 초기화할 때 설정 옵션을 받아들여 모듈의 행동을 결정합니다.

### 구성 방법

1. 기본 구성: 모듈은 기본적으로 다음과 같이 구성됩니다.

```typescript
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
class MyModule {}
```

2. 동적 구성을 위한 메소드 추가: 동적 모듈을 위해서는 모듈 클래스 내에 static 메소드를 추가합니다. 이 메소드는 DynamicModule을 반환해야 하며, 이를 통해 NestJS가 모듈을 적절히 로드하고 구성할 수 있습니다.

```typescript
@Module()
export class ConfigModule {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: "CONFIG_OPTIONS",
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
```

이 예에서 register 메소드는 options 객체를 받아, 이를 통해 모듈 내부의 프로바이더를 설정합니다. useValue를 사용하여 CONFIG_OPTIONS 토큰에 옵션 객체를 주입하고, 이 토큰을 다른 프로바이더에서 의존성으로 주입할 수 있습니다.

3. 모듈 사용: 이제 AppModule에서 ConfigModule을 동적으로 구성하여 사용할 수 있습니다.

```typescript
@Module({
  imports: [ConfigModule.register({ env: process.env.NODE_ENV })],
})
export class AppModule {}
```

AppModule은 ConfigModule의 register 메소드를 호출하면서 실행 환경에 맞는 설정을 전달합니다. 이렇게 함으로써 ConfigModule은 주어진 환경에 따라 다르게 행동할 수 있습니다.

## 커뮤니티 가이드라인

NestJS 커뮤니티에서는 동적 모듈을 register, forRoot, forFeature 메소드와 함께 사용할 것을 권장합니다. 이러한 메소드들은 모듈의 설정을 초기화하고, 필요에 따라 다른 모듈에서 재사용할 수 있도록 합니다.

1. register
   register 메소드는 특정 모듈을 동적으로 구성할 때 사용합니다. 이 메소드는 모듈이 각 사용 사례에 맞게 구성될 수 있도록 설정 객체를 매개변수로 받습니다. register는 일반적으로 모듈이 다른 설정을 가질 수 있게 할 때 사용되며, 이 설정은 호출하는 모듈에 의해 제공됩니다.

예를 들어, 같은 로깅 모듈을 다른 설정으로 여러 모듈에서 사용하려고 할 때 register를 사용할 수 있습니다. 각 모듈은 로깅 수준이나 출력 형식과 같은 자체 설정을 로깅 모듈에 제공할 수 있습니다.

```typescript
@Module({})
export class LoggingModule {
  static register(options: LoggingOptions): DynamicModule {
    return {
      module: LoggingModule,
      providers: [
        {
          provide: "LOGGING_OPTIONS",
          useValue: options,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
```

2. forRoot
   forRoot 메소드는 주로 애플리케이션의 루트 모듈 또는 기능 모듈에서 모듈을 전역적으로 구성할 때 사용됩니다. 이 메소드는 모듈이 애플리케이션 전체에 걸쳐 한 번만 구성되고, 그 구성을 여러 곳에서 재사용할 수 있도록 합니다. 데이터베이스 설정, 애플리케이션의 전역 설정 관리 등이 이에 해당합니다.

예를 들어, 데이터베이스 연결을 구성하는 DatabaseModule이 있을 때, forRoot를 사용하여 데이터베이스 접속 정보를 전달하고 이 모듈을 전역적으로 사용할 수 있습니다.

```typescript
@Module({})
export class DatabaseModule {
  static forRoot(config: DatabaseConfig): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: "DATABASE_CONNECTION",
          useValue: createConnection(config),
        },
      ],
      exports: ["DATABASE_CONNECTION"],
    };
  }
}
```

3. forFeature
   forFeature 메소드는 특정 기능을 위해 이미 구성된 모듈을 확장할 때 사용됩니다. 예를 들어, 일부 특정 도메인에서만 필요한 특정 저장소 또는 커스텀 설정을 설정하는 경우에 사용됩니다. forFeature는 일반적으로 데이터 접근 계층에서 모델 또는 저장소를 동적으로 등록할 때 사용됩니다.

예를 들어, 사용자와 주문을 처리하는 애플리케이션에서 DatabaseModule을 사용하여 다양한 저장소를 등록할 때 forFeature를 사용할 수 있습니다.

```typescript
@Module({})
export class UserModule {
  static forFeature(): DynamicModule {
    return {
      module: UserModule,
      imports: [DatabaseModule.forFeature({ feature: "user" })],
      providers: [UserService],
      exports: [UserService],
    };
  }
}
```

## 구성 가능 모듈 빌더(Configurable Module Builder)

ConfigurableModuleBuilder는 동적 모듈을 쉽게 생성할 수 있도록 돕는 클래스입니다. 이를 사용하면, registerAsync와 같은 비동기 메소드를 포함한 동적 모듈을 간단하게 설정할 수 있습니다.

## 사용자 정의 메소드 키(Custom Method Key)

동적 모듈에서 사용할 메소드 이름을 사용자가 정의할 수 있습니다. 이를 통해 기본 제공 메소드 외에도 특정한 기능을 수행하는 메소드를 추가로 구현할 수 있습니다.

## 사용자 정의 옵션 팩토리 클래스(Custom Options Factory Class)

동적 모듈을 위한 설정을 생성하는 팩토리 클래스를 사용자가 정의할 수 있습니다. 이 클래스는 설정 객체를 동적으로 생성하고, 이를 모듈에 전달하는 역할을 합니다.

## 추가 옵션(Extra Options)

Extra options 기능을 사용하면 모듈을 등록할 때 추가적인 설정을 제공할 수 있습니다. 예를 들어, 모듈을 전역 모듈로 등록할지 여부를 결정하는 isGlobal 같은 플래그를 설정할 수 있습니다. 이런 옵션들은 모듈의 기본 동작을 제어하는 데 유용하며, 설정 정보와 함께 다룰 때 모듈의 유연성을 크게 향상시킬 수 있습니다.

## 자동 생성 메소드 확장(Extending Auto-Generated Methods)

ConfigurableModuleBuilder를 통해 생성된 메소드들은 필요에 따라 확장할 수 있습니다. 예를 들어, register 또는 registerAsync 메소드를 상속받아 추가적인 로직을 구현할 수 있습니다. 이를 통해 기본 설정 외에 특정 조건을 검사하거나, 추가적인 처리를 수행할 수 있습니다. 이러한 확장성은 모듈을 더욱 다양한 상황에 맞게 조정할 수 있게 해줍니다.

```typescript
class MyConfigModule extends ConfigModule {
  static register(options: MyOptions): DynamicModule {
    // 여기에 사용자 정의 로직 추가
    return super.register(options);
  }
}
```

위 예제는 MyConfigModule이 ConfigModule의 register 메소드를 확장하여 추가적인 사용자 정의 로직을 포함하는 방법을 보여줍니다. 이렇게 함으로써, 기본 모듈 기능에 사용자의 필요에 맞는 특수 기능을 추가할 수 있습니다.
