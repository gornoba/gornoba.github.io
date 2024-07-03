# Set State

setState는 Flutter에서 위젯의 상태를 업데이트하는 방법입니다. 상태가 변경되면, Flutter는 setState가 호출된 위젯을 다시 빌드하여 UI를 업데이트합니다. 이는 Flutter의 상태 관리에서 가장 기본적이고 중요한 개념 중 하나입니다.

## setState 사용 방법

setState는 StatefulWidget의 상태 클래스에서 사용됩니다. StatefulWidget은 상태를 가지고 있으며, 상태가 변경될 때 UI를 다시 렌더링할 수 있습니다.

## StatefulWidget의 기본 구조

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: CounterWidget(),
    );
  }
}

class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  // 상태 변수
  int _counter = 0;

  // 상태를 업데이트하고 UI를 다시 빌드하는 메서드
  void _incrementCounter() {
    setState(() {
      // 상태 변수 업데이트
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('SetState Example'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter', // 상태 변수를 사용하여 텍스트 표시
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter, // 버튼을 누를 때 상태 업데이트
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

1. StatefulWidget 생성
   CounterWidget 클래스는 StatefulWidget을 확장합니다.
   createState 메서드는 상태를 반환합니다.
2. 상태 클래스 생성
   \_CounterWidgetState 클래스는 State<CounterWidget>을 확장합니다.
   상태 변수 \_counter를 정의합니다.
3. 상태 업데이트
   \_incrementCounter 메서드에서 setState를 호출하여 \_counter 변수를 업데이트합니다.
   setState는 내부적으로 호출된 후 build 메서드를 다시 실행하여 UI를 업데이트합니다.
4. UI 빌드
   build 메서드에서 현재 상태를 기반으로 UI를 구성합니다.
   \_counter 변수를 사용하여 텍스트를 업데이트합니다.

## 주의사항

- setState는 반드시 State 클래스 내에서 호출되어야 합니다.
- setState를 호출할 때는 상태 업데이트 외에 다른 작업을 하지 않도록 주의해야 합니다. 상태 업데이트와 관련 없는 작업은 setState 외부에서 수행해야 합니다.
- setState는 자주 호출될 수 있으므로, 성능에 영향을 미칠 수 있는 복잡한 작업을 피해야 합니다
