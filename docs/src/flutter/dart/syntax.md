# Syntax

## Hello World (Main 함수)

```dart
// Main 함수 - 프로그램의 시작 지점을 갖고 있는 함수
// function
void main() {
  // print 함수 - 프로그램 실행 도중에 콘솔 창에 출력할 떄
  print('hello world');
}
```

## 변수와 자료형

```dart
void main() {
  // 변수란 - 변할 수 있는 값
  String name = 'im';
  print(name);

  int age = 30;
  print(age);

  var name2 = 'hyun'; // dart 지원 문법이며 타입을 추론하게 됨
  print(name2);

  var age2 = 35;
  print(age2);

  bool isChecked = false;
  print(isChecked);

  double tall = 164.4;
  print(tall);
}
```

## dynamic 타입 활용

```dart
void main() {
  // dynamic type - 모든 데이터 타입을 포함 할 수 있음
  dynamic car = 'benz';
  car = 10;
  print(car);
}
```

## Null Safety

```dart
void main() {
  String name = 'im'; // not null

  String? name2 = null; // null
  name2 = 'hyun';
  print(name2);

  String? name3 = null;
  print(name3?.length);

  // null 합류 연산자 (??)
  String? name4 = null;
  String result = name3 ?? 'hoo';
  print(result);
}
```

## late 키워드의 활용

```dart
// late 키워드
late String name; // null, 초기화 되지않음.

void main() {
  name = 'im'; // 늦은 초기화
}
```

## final vs const

```dart
// 상수 - 항상 같은 수

void main() {
  // final - 최초에 값이 할당되면 다시 할당할 수 없음
  final int textVal = 30;
  textVal = 10; // 오류

  final int testVal2;
  testVal2 = 10;

  // const - 최초에 값이 할당되면 다시 할당할 수 없음 + 선언과 동시에 값을 할당해야 함 (해당 값은 컴파일 시점에 결정되어야 한다.)
  const int testValue3;
  testValue3 = 10; // 오류

  const int testValue4 = 10;
}
```

## 연산자와 표현식

```dart
void main() {
  // 산술 연산자
  int a = 10;
  int b = 3;

  int sum = a + b;
  int minus = a - b;
  int product = a * b;
  double divided = a / b;
  int remain = a % b;
  int mok = a ~/ b;

  // 비교 연산자
  bool isResult = (a == b);
  bool isResult2 = (a > b);

  // 논리 연산자
  bool result = (true || false); // 논리 합 (OR)
  bool result2 = (true && false); // 논리 곱 (AND)
  bool result3 = !result2; // 논리 부정 (NOT)

  // 할당 연산자
  int c = 10;
  c += 30;
  c -= 10;
  c *= 10;
  c /= 10;

  // 조건 연상자
  int age = 30;
  String ageStatus = age >= 18 ? '성인' : '미성년자'; // 3항 연산자
}
```

## 조건문과 반복문 (제어문)

```dart
void main() {
  // if - else
  int age = 3;
  if (age == 0) {
    print("신생아");
  } else if (age <= 19) {
    print("미성년자");
  } else {
    print("성인");
  }

  // switch
  String grade = 'A';
  switch (grade) {
    case 'A':
      print('우수');
      break;

    case 'B':
      print('보통');
      break;

    case 'C':
      print('부족');
      break;

    case 'D':
      print('매우 부족');
      break;

    default:
      print('미평가');
      break;
  }

  // for 반복문
  for (int i = 0; i < 5; i++) {
    print('반복 $i');
  }

  // while 반복문
  int count = 0;
  while(count < 3) {
    print('while 반복 $count');
    count++;
    break;
  }
}
```

## List와 Map

```dart
// List - 순서가 있는 데이터 컬렉션, 인덱스라는 개념
List<int> numbers = [];
List<int> numbers2 = [
  1,
  2,
  3,
  4,
  5,
];

// Map - key, value의 한쌍
Map<String, int> scoreMap = {};
Map<String, int> scoreMap2 = {
  'a': 100,
  'b': 200,
  'c': 300,
};

void main() {
  // list
  print(numbers2[2]);

  numbers.add(6);
  print(numbers);

  for (int i = 0; i < numbers2.length; i++) {
    print('$i ${numbers2[i]}');
  }

  numbers.removeAt(0);

  numbers.add(7);
  numbers[0] = 8;

  // map
  print(scoreMap2['a']);

  scoreMap['d'] = 400;
  print(scoreMap['d']);

  scoreMap2.forEach((key, value) {
    print('$key의 점수는 $value 입니다.');
  });
}
```

## 함수와 메서드

```dart
// 함수와 메서드

// 함수 (Function)
// 함수 이름, 매개 변수 (parameter) 반환 유형 (return type) 으로 구성.
void main() { // void 리턴타입일 경우 아무런 값을 반환하지 않고 오로지 실행한다.
  // 프로그램의 출발지점인 main 함수

  print(add(1, 2));
  setStart();
}

int add(int a, int b) {
  return a + b;
}

void setStart() {
  print('시작 합니다.');
}

// 매서드 (Method) - 클래스 내부에서 정의된 함수
class UserInfo {
  String? name;
  int? age;
  String? hobby;

  void setStart() {

  }
}
```

## positional parameter vs named parameter

```dart
// positional parameter
void setStart(String name, int age) {
  print('called set started, $name, $age');
}

// named parameter
void setStart2({String name = 'b', int age = 14}) {
  print('called set started, $name, $age');
}

// named parameter with required
void setStart3({required String name }) {
  print('called set started, $name');
}


void main() {
  setStart('a', 30);
  setStart2(age: 50, name: 'd');
  setStart3(name: 'e');
}
```

## 클래스와 상속

```dart
// 클래스 (class) - 객체를 생성하기 위한 템플릿 또는 청사진 또는 설계도

class Person {
  // 상태 - 멤버 변수
  String name;
  int age;

  // 생성자 (Constructor) - 함수
  Person(this.name, this.age);

  // 행동 - 메서드 (함수)
  void sayHello() {
    print('나는 $name이고 $age살 입니다.');
  }
}

// 상속
// 부모 클래스 (super class)와 자식 클래스 (sub class) 간의 상송 관계가 형성
class Man extends Person {
  Man(String name, int age) : super(name, age);

  @override
  void sayHello() {
    super.sayHello(); // 부모 클래스의 정의되어 있는 함수 호출
    print('제 성별은 남자 입니다.');
  }
}

void main() {
  Person personHuman = Person('낫닝겐', 3500); // 클래스 인스턴스 생성
  Person personHuman2 = Person('너닝겐', 30); // 클래스 인스턴스 생성
  Person personHuman3 = Person('나닝겐', 10); // 클래스 인스턴스 생성

  personHuman.sayHello();
  personHuman2.sayHello();
  personHuman3.sayHello();

  var personMan = Man('카카로트', 25);
  personMan.sayHello();
}
```

## 생성자와 선택적 매개변수

```dart
// 생성자 (constructor) - 클래스의 인스턴스를 초기화하는 특별한 메서드
// 클래스를 생성할 때 가장 먼저 호출

class Person {
  // 기본 생성자 (default contructor), 생략가능
  Person();
}

class Person2 {
  String name;
  int age;

  // 매개변수가 존재하는 생성자
  Person2(this.name, this.age);
}

class Person3 {
  String name;
  int age;

  // 선택적 매개변수
  Person3({this.name = 'a', this.age = 20});
}

class Person4 {
  String name;
  int age;

  Person4({required this.name, required this.age});
}

void main() {
  var person = Person(); // 클래스 인스턴스 생성 (메모리 올림)
  var person2 = Person2('a', 30);
  var person3 = Person3(name: 'b');
  var person4 = Person4(name: 'c', age: 40);
}
```

## enum 타입

```dart
// enum types
// enum (열거형) - 타입 정의 보통 많이 사용. 상수들의 그룹을 정의할 때 유용
// 왜 필요? - 협업 개발자들 간에 코드를 읽고 이해하기 쉽게 만들기 위해

enum Color {
  RED,
  GREEN,
  BLUE,
  YELLOW,
}

void main() {
  // enum 값을 변수에 할당
  Color myColor = Color.BLUE;

  if (myColor == Color.RED) {
    print('빨간색');
  } else if (myColor == Color.BLUE) {
    print('파란색');
  } else if (myColor == Color.GREEN) {
    print('초록색');
  } else if (myColor == Color.YELLOW) {
    print('노란색');
  }

  print(Color.RED.index);
  for (int i = 0; i < Color.values.length; i++) {
    print(Color.values[i]);
  }
}
```

## Future와 await를 활용한 비동기 프로그래밍

```dart
// Future와 await을 활용한 비동기 프로그래밍

// future - 비동기 작업의 결과 또는 완료 상태를 나타내는 객체
// 동기 - 작업이 순차적으로 실행
// 비동기 - 작업이 순차적으로 실행되지 않으며, 동시에 여러 작업을 처리할 수 있음

void main() {
  playComputerGame();
}

Future<void>  playComputerGame() async {
  startBoot();
  await startInternet();
  startGame();
}

void startBoot() {
  print('1. boot completed');
}

Future<void> startInternet() async {
  // await - 비동기 함수 내에서 사용되며, await 뒤에 나오는 결과값이 완료될때까지 기다림
  await Future.delayed(Duration(seconds: 3), () {
    print('2. internet completed');
  });
  print('delay completed');
}

void startGame() {
  print('3. game completed');
}
```
