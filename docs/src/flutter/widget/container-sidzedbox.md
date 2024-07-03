# Container와 SizedBox

## Container

Container 위젯은 레이아웃을 구성할 때 매우 유용한 위젯으로, 자식 위젯을 포함하며 여백(padding), 경계(border), 배경색(background color), 그림자(box shadow) 등을 설정할 수 있습니다. Container 위젯의 주요 옵션은 다음과 같습니다:

- alignment: 자식 위젯의 정렬을 설정.
- padding: 자식 위젯 주위에 패딩(여백)을 설정.
- color: 배경색을 설정.
- decoration: 더 복잡한 배경이나 경계 등을 설정.
- foregroundDecoration: 자식 위젯 위에 그려질 장식.
- width 및 height: Container의 너비와 높이를 설정.
- constraints: 너비와 높이에 대한 추가 제약을 설정.
- margin: 외부 여백을 설정.
- transform: 변환(회전, 크기 변경 등)을 설정.
- child: 포함할 자식 위젯.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Container Example with All Options'),
        ),
        body: Center(
          child: Container(
            // 자식 위젯의 정렬을 설정 (중앙 정렬)
            alignment: Alignment.center,
            // 자식 위젯 주위에 패딩(여백)을 설정
            padding: EdgeInsets.all(20.0),
            // 배경색을 설정
            color: Colors.amber,
            // 더 복잡한 배경이나 경계 등을 설정
            decoration: BoxDecoration(
              color: Colors.blue,
              border: Border.all(color: Colors.black, width: 2.0),
              borderRadius: BorderRadius.circular(10.0),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey,
                  offset: Offset(2.0, 2.0),
                  blurRadius: 5.0,
                ),
              ],
            ),
            // 자식 위젯 위에 그려질 장식
            foregroundDecoration: BoxDecoration(
              border: Border.all(color: Colors.red, width: 1.0),
            ),
            // Container의 너비를 설정
            width: 200.0,
            // Container의 높이를 설정
            height: 200.0,
            // 너비와 높이에 대한 추가 제약을 설정
            constraints: BoxConstraints(
              maxWidth: 300.0,
              maxHeight: 300.0,
            ),
            // 외부 여백을 설정
            margin: EdgeInsets.all(10.0),
            // 변환(회전, 크기 변경 등)을 설정
            transform: Matrix4.rotationZ(0.1),
            // 포함할 자식 위젯
            child: Text(
              'Hello, Container!',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ),
      ),
    );
  }
}
```

## SizedBox

SizedBox 위젯은 고정된 크기를 가진 빈 상자를 생성하거나 특정 크기로 자식 위젯을 감쌀 때 사용됩니다. 주로 레이아웃에서 간격을 만들거나 특정 크기를 강제할 때 유용합니다.

- width: SizedBox의 너비를 설정.
- height: SizedBox의 높이를 설정.
- child: 포함할 자식 위젯 (옵션).

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('SizedBox Example with All Options'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text('Above SizedBox'),
              // 고정된 크기의 빈 상자를 생성
              SizedBox(
                width: 100.0,
                height: 50.0,
              ),
              Text('Below SizedBox'),
              // 특정 크기로 자식 위젯을 감쌈
              SizedBox(
                width: 200.0,
                height: 100.0,
                child: Container(
                  color: Colors.green,
                  child: Center(
                    child: Text(
                      'Inside SizedBox',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```
