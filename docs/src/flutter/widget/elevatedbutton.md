# ElevatedButton

ElevatedButton 위젯은 사용자가 누를 수 있는 버튼을 생성합니다. 일반적으로 버튼을 사용하여 사용자 상호작용을 처리할 때 사용됩니다. 주요 옵션은 다음과 같습니다

- onPressed: 버튼이 눌렸을 때 실행할 콜백 함수.
- child: 버튼 안에 표시될 위젯.
- style: 버튼의 스타일을 지정하는 ButtonStyle.

ButtonStyle의 주요 옵션

- backgroundColor: 버튼의 배경색.
- foregroundColor: 버튼의 텍스트 및 아이콘 색상.
- shadowColor: 버튼의 그림자 색상.
- elevation: 버튼의 그림자 높이.
- padding: 버튼의 내부 여백.
- shape: 버튼의 모양 (예: 둥근 모서리).
- minimumSize: 버튼의 최소 크기.
- maximumSize: 버튼의 최대 크기.
- side: 버튼의 경계선.
- textStyle: 버튼의 텍스트 스타일.
- alignment: 버튼 안의 내용 정렬.

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
          title: Text('ElevatedButton Example with All Options'),
        ),
        body: Center(
          child: ElevatedButton(
            // 버튼이 눌렸을 때 실행할 콜백 함수
            onPressed: () {
              print('Button Pressed');
            },
            // 버튼 안에 표시될 위젯
            child: Text('Press Me'),
            // 버튼의 스타일을 지정하는 ButtonStyle
            style: ElevatedButton.styleFrom(
              // 버튼의 배경색
              primary: Colors.blue,
              // 버튼의 텍스트 및 아이콘 색상
              onPrimary: Colors.white,
              // 버튼의 그림자 색상
              shadowColor: Colors.black,
              // 버튼의 그림자 높이
              elevation: 5.0,
              // 버튼의 내부 여백
              padding: EdgeInsets.symmetric(horizontal: 30.0, vertical: 15.0),
              // 버튼의 모양 (둥근 모서리)
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              ),
              // 버튼의 최소 크기
              minimumSize: Size(150, 50),
              // 버튼의 최대 크기
              maximumSize: Size(200, 100),
              // 버튼의 경계선
              side: BorderSide(color: Colors.red, width: 2.0),
              // 버튼의 텍스트 스타일
              textStyle: TextStyle(fontSize: 20),
              // 버튼 안의 내용 정렬
              alignment: Alignment.center,
            ),
          ),
        ),
      ),
    );
  }
}
```
