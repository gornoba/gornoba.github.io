# ListView

## ListView의 생성 방법

- ListView(): 기본 생성자, 직접 자식 위젯을 추가.
- ListView.builder(): 필요한 만큼의 위젯을 동적으로 생성.
- ListView.separated(): 항목 사이에 분리자를 추가.
- ListView.custom(): 사용자 정의된 목록을 생성.

## ListView의 주요 옵션

- scrollDirection: 스크롤 방향.
- reverse: 목록의 순서를 반대로.
- controller: 스크롤 동작을 제어하는 컨트롤러.
- primary: 기본 스크롤 뷰 여부.
- physics: 스크롤 물리학.
- shrinkWrap: 내용에 맞게 크기 조정.
- padding: 내부 여백.
- itemExtent: 각 항목의 고정된 높이.
- cacheExtent: 화면 외부에 있는 항목을 미리 로드하는 거리.

## ListView 예시

### 기본 ListView

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
          title: Text('Basic ListView Example'),
        ),
        body: ListView(
          // 스크롤 방향 설정 (수직)
          scrollDirection: Axis.vertical,
          // 목록의 순서를 반대로 설정
          reverse: false,
          // 내용에 맞게 크기 조정
          shrinkWrap: true,
          // 내부 여백 설정
          padding: EdgeInsets.all(8.0),
          children: <Widget>[
            ListTile(
              title: Text('Item 1'),
            ),
            ListTile(
              title: Text('Item 2'),
            ),
            ListTile(
              title: Text('Item 3'),
            ),
          ],
        ),
      ),
    );
  }
}
```

### ListView.builder()

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
          title: Text('ListView.builder Example'),
        ),
        body: ListView.builder(
          // 스크롤 방향 설정 (수직)
          scrollDirection: Axis.vertical,
          // 목록의 순서를 반대로 설정
          reverse: false,
          // 내용에 맞게 크기 조정
          shrinkWrap: true,
          // 내부 여백 설정
          padding: EdgeInsets.all(8.0),
          // 항목 수 설정
          itemCount: 20,
          // 항목 생성 함수
          itemBuilder: (context, index) {
            return ListTile(
              title: Text('Item $index'),
            );
          },
        ),
      ),
    );
  }
}
```

### ListView.separated()

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
          title: Text('ListView.separated Example'),
        ),
        body: ListView.separated(
          // 스크롤 방향 설정 (수직)
          scrollDirection: Axis.vertical,
          // 목록의 순서를 반대로 설정
          reverse: false,
          // 내용에 맞게 크기 조정
          shrinkWrap: true,
          // 내부 여백 설정
          padding: EdgeInsets.all(8.0),
          // 항목 수 설정
          itemCount: 20,
          // 항목 생성 함수
          itemBuilder: (context, index) {
            return ListTile(
              title: Text('Item $index'),
            );
          },
          // 분리자 생성 함수
          separatorBuilder: (context, index) {
            return Divider(
              color: Colors.grey,
            );
          },
        ),
      ),
    );
  }
}
```

### ListView.custom()

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
          title: Text('ListView.custom Example'),
        ),
        body: ListView.custom(
          // 스크롤 방향 설정 (수직)
          scrollDirection: Axis.vertical,
          // 목록의 순서를 반대로 설정
          reverse: false,
          // 내용에 맞게 크기 조정
          shrinkWrap: true,
          // 내부 여백 설정
          padding: EdgeInsets.all(8.0),
          // 항목 생성 Delegate
          childrenDelegate: SliverChildBuilderDelegate(
            (context, index) {
              return ListTile(
                title: Text('Item $index'),
              );
            },
            // 항목 수 설정
            childCount: 20,
          ),
        ),
      ),
    );
  }
}
```
