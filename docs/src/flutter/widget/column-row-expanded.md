# Column, Row, Expanded

## Column

Column 위젯은 자식 위젯들을 세로로 나열합니다. 주로 여러 위젯을 수직으로 배치할 때 사용됩니다.

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
          title: Text('Column Example'),
        ),
        body: Column(
          // Column의 세로 크기를 자식의 크기에 맞춤
          mainAxisSize: MainAxisSize.min,
          // Column 내의 자식 위젯들을 수직 방향으로 정렬
          mainAxisAlignment: MainAxisAlignment.center,
          // Column 내의 자식 위젯들을 가로 방향으로 정렬
          crossAxisAlignment: CrossAxisAlignment.end,
          // Column 내의 텍스트 방향을 설정 (오른쪽에서 왼쪽으로)
          textDirection: TextDirection.rtl,
          // Column 내의 자식 위젯들을 수직 방향으로 반전 (아래에서 위로)
          verticalDirection: VerticalDirection.up,
          // 기본적인 텍스트 방향을 설정 (왼쪽에서 오른쪽으로)
          textBaseline: TextBaseline.alphabetic,
          children: <Widget>[
            Container(
              color: Colors.red,
              child: Text('First Item'),
            ),
            Container(
              color: Colors.green,
              child: Text('Second Item'),
            ),
            Container(
              color: Colors.blue,
              child: Text('Third Item'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## Row

Row 위젯에 mainAxisAlignment, crossAxisAlignment 옵션을 추가하여 사용해 보겠습니다.

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
          title: Text('Row Example'),
        ),
        body: Row(
          // Row의 가로 크기를 자식의 크기에 맞춤
          mainAxisSize: MainAxisSize.min,
          // Row 내의 자식 위젯들을 수평 방향으로 정렬
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          // Row 내의 자식 위젯들을 세로 방향으로 정렬
          crossAxisAlignment: CrossAxisAlignment.start,
          // Row 내의 텍스트 방향을 설정 (오른쪽에서 왼쪽으로)
          textDirection: TextDirection.rtl,
          // Row 내의 자식 위젯들을 수직 방향으로 반전 (아래에서 위로)
          verticalDirection: VerticalDirection.up,
          // 기본적인 텍스트 방향을 설정 (왼쪽에서 오른쪽으로)
          textBaseline: TextBaseline.alphabetic,
          children: <Widget>[
            Container(
              color: Colors.red,
              child: Text('First Item'),
            ),
            Container(
              color: Colors.green,
              child: Text('Second Item'),
            ),
            Container(
              color: Colors.blue,
              child: Text('Third Item'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## Expanded

Row 위젯 내에서 Expanded 위젯을 사용하여 자식 위젯들이 동일한 공간을 차지하도록 해보겠습니다.

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
          title: Text('Expanded Example'),
        ),
        body: Row(
          children: <Widget>[
            Expanded(
              // flex: 2 -> 두 배의 공간을 차지함
              flex: 2,
              child: Container(
                color: Colors.red,
                child: Text('First Item'),
              ),
            ),
            Expanded(
              // flex: 1 -> 한 배의 공간을 차지함
              flex: 1,
              child: Container(
                color: Colors.blue,
                child: Text('Second Item'),
              ),
            ),
            Expanded(
              // flex: 1 -> 한 배의 공간을 차지함
              flex: 1,
              child: Container(
                color: Colors.green,
                child: Text('Third Item'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```
