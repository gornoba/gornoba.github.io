# Widget

Flutter의 Widget은 Flutter 애플리케이션의 기본 구성 요소입니다. Flutter에서는 모든 것이 Widget으로 표현되며, 이는 Flutter 애플리케이션을 구성하고 UI를 설계하는 데 사용됩니다. Widget은 두 가지 유형으로 나뉩니다: Stateful Widget과 Stateless Widget입니다.

## Stateless Widget

상태가 없는 위젯으로, 한 번 생성되면 변하지 않습니다.  
데이터나 UI가 변하지 않는 경우에 주로 사용됩니다.  
UI를 그리기 위한 정보만을 가집니다.

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
          title: Text('Stateless Widget Example'),
        ),
        body: Center(
          child: Text('Hello, world!'),
        ),
      ),
    );
  }
}

```

## Stateful Widget

특징: 상태가 있는 위젯으로, 내부 상태를 가질 수 있으며, 이 상태가 변경될 때마다 UI를 다시 그립니다. 사용자와의 상호작용이나 동적인 데이터 처리 시 주로 사용됩니다.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Stateful Widget Example'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'You have pushed the button this many times:',
              ),
              Text(
                '$_counter',
                style: Theme.of(context).textTheme.headline4,
              ),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _incrementCounter,
          tooltip: 'Increment',
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```

### 주요 위젯

- Container: 레이아웃, 패딩, 여백, 경계 등을 설정할 수 있는 위젯.
- Row: 수평으로 위젯을 배열하는 레이아웃 위젯.
- Column: 수직으로 위젯을 배열하는 레이아웃 위젯.
- Stack: 위젯을 겹쳐서 배치하는 레이아웃 위젯.
- Center: 자식 위젯을 부모 위젯의 중앙에 배치하는 위젯.
- Scaffold: 기본적인 화면 구조를 제공하는 위젯으로, 앱바, 드로어 등을 포함할 수 있습니다.
- ListView: 스크롤 가능한 목록을 만드는 위젯.

## 위젯 트리

Flutter에서 UI는 위젯 트리로 구성됩니다. 부모 위젯이 자식 위젯을 포함하고, 자식 위젯이 또 다른 자식을 포함하는 방식으로 트리를 형성합니다. 이 구조를 통해 UI를 선언적이고 계층적으로 구성할 수 있습니다.

```dart
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times:'),
            Text(
              '0',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```
