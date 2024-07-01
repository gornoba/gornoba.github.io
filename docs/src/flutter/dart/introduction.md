# Dart의 특징

## 개요

Dart는 구글이 개발한 오픈 소스 프로그래밍 언어로, 주로 모바일, 웹, 서버 및 데스크톱 애플리케이션 개발에 사용됩니다. Flutter 프레임워크와 함께 사용되어 크로스 플랫폼 모바일 애플리케이션 개발에 많이 활용됩니다.

## 주요 특징

### 1. 간결하고 명확한 문법

Dart는 간결하고 명확한 문법을 제공합니다. JavaScript, Java, C# 등의 문법과 유사하여 배우기 쉽습니다.

### 2. 정적 및 동적 타입 지정

Dart는 정적 타입 지정 언어이지만, 동적 타입 지정도 지원합니다. `var` 키워드를 사용하여 변수를 선언하면, 컴파일러가 타입을 추론합니다.

```dart
var name = 'John';  // String 타입으로 추론됨
```

### 3. JIT 및 AOT 컴파일

Dart는 JIT(Just-In-Time) 컴파일과 AOT(Ahead-Of-Time) 컴파일을 모두 지원합니다. JIT 컴파일은 개발 중 빠른 피드백을 제공하고, AOT 컴파일은 성능 최적화를 통해 애플리케이션 실행 속도를 향상시킵니다.

### 4. 풍부한 라이브러리

Dart는 많은 내장 라이브러리와 패키지를 제공하여 다양한 기능을 쉽게 구현할 수 있습니다. 또한, Pub 패키지 매니저를 통해 외부 패키지를 쉽게 추가할 수 있습니다.

### 5. 객체 지향 프로그래밍 지원

Dart는 클래스와 객체를 사용한 객체 지향 프로그래밍(OOP)을 지원합니다. 클래스, 상속, 인터페이스, 추상 클래스 등을 사용하여 재사용 가능한 코드를 작성할 수 있습니다.

```dart
class Animal {
  String name;

  Animal(this.name);

  void makeSound() {
    print('$name makes a sound');
  }
}

class Dog extends Animal {
  Dog(String name) : super(name);

  @override
  void makeSound() {
    print('$name barks');
  }
}

void main() {
  Dog dog = Dog('Buddy');
  dog.makeSound();  // Buddy barks
}
```

### 6. 비동기 프로그래밍

Dart는 비동기 프로그래밍을 위한 `async`와 `await` 키워드를 제공합니다. 이를 통해 비동기 작업을 간단하게 처리할 수 있습니다.

```dart
Future<void> fetchData() async {
  var data = await fetchFromServer();
  print('Data: $data');
}
```

### 7. 안전한 null 처리

Dart는 null safety를 지원하여 null 참조 오류를 방지합니다. 변수에 null이 할당될 수 있는지 여부를 명확하게 지정할 수 있습니다.

```dart
String? nullableString;
nullableString = null;  // 허용됨

String nonNullableString;
nonNullableString = null;  // 오류 발생
```

## 결론

Dart는 간결한 문법, 정적 및 동적 타입 지정, JIT 및 AOT 컴파일, 풍부한 라이브러리 지원, 객체 지향 프로그래밍, 비동기 프로그래밍, 안전한 null 처리 등 다양한 특징을 갖춘 강력한 언어입니다. 특히 Flutter와의 조합을 통해 크로스 플랫폼 애플리케이션 개발에 매우 적합합니다.

## 테스트

[dartpad.dev](https://dartpad.dev/)
