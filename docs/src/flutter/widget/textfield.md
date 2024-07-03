# TextField

TextField 위젯은 사용자가 텍스트를 입력할 수 있는 입력 상자를 제공합니다. 주로 사용자 입력을 받기 위해 사용됩니다. 주요 옵션은 다음과 같습니다

- controller: 텍스트 필드의 내용을 제어하는 TextEditingController.
- focusNode: 텍스트 필드의 포커스를 제어하는 FocusNode.
- decoration: 텍스트 필드의 외관을 장식하는 InputDecoration.
- keyboardType: 텍스트 필드의 키보드 타입.
- textInputAction: 키보드의 작업 버튼 타입.
- style: 입력된 텍스트의 스타일.
- textAlign: 텍스트 정렬 방식.
- maxLines: 텍스트 필드의 최대 줄 수.
- maxLength: 입력 가능한 최대 문자 수.
- obscureText: 비밀번호 입력 등 텍스트를 숨김.
- autocorrect: 자동 수정 여부.
- enabled: 텍스트 필드 활성화 여부.
- onChanged: 텍스트가 변경될 때 호출되는 콜백.
- onSubmitted: 텍스트 입력이 완료될 때 호출되는 콜백.
- inputFormatters: 입력을 필터링하는 포맷터

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('TextField Example with All Options'),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: TextField(
            // 텍스트 필드의 내용을 제어하는 TextEditingController
            controller: TextEditingController(),
            // 텍스트 필드의 포커스를 제어하는 FocusNode
            focusNode: FocusNode(),
            // 텍스트 필드의 외관을 장식하는 InputDecoration
            decoration: InputDecoration(
              labelText: 'Enter your name',
              hintText: 'John Doe',
              helperText: 'Name should be at least 3 characters',
              icon: Icon(Icons.person),
              prefixIcon: Icon(Icons.account_circle),
              suffixIcon: Icon(Icons.check_circle),
              border: OutlineInputBorder(),
            ),
            // 텍스트 필드의 키보드 타입
            keyboardType: TextInputType.text,
            // 키보드의 작업 버튼 타입
            textInputAction: TextInputAction.done,
            // 입력된 텍스트의 스타일
            style: TextStyle(fontSize: 18.0, color: Colors.blue),
            // 텍스트 정렬 방식
            textAlign: TextAlign.left,
            // 텍스트 필드의 최대 줄 수
            maxLines: 1,
            // 입력 가능한 최대 문자 수
            maxLength: 20,
            // 비밀번호 입력 등 텍스트를 숨김
            obscureText: false,
            // 자동 수정 여부
            autocorrect: true,
            // 텍스트 필드 활성화 여부
            enabled: true,
            // 텍스트가 변경될 때 호출되는 콜백
            onChanged: (text) {
              print('Text changed: $text');
            },
            // 텍스트 입력이 완료될 때 호출되는 콜백
            onSubmitted: (text) {
              print('Text submitted: $text');
            },
            // 입력을 필터링하는 포맷터
            inputFormatters: <TextInputFormatter>[
              FilteringTextInputFormatter.allow(RegExp(r'[a-zA-Z]')),
            ],
          ),
        ),
      ),
    );
  }
}
```
