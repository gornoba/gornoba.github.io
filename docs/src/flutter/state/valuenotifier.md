# ValueNotifier

ValueNotifier는 Flutter에서 상태 관리를 위해 사용되는 간단하고 효율적인 방법입니다. ValueNotifier는 값을 저장하고, 그 값이 변경될 때마다 리스너들에게 알리는 기능을 제공합니다. 이는 ChangeNotifier를 확장한 것으로, 주로 단일 값의 상태를 관리할 때 사용됩니다.

## ValueNotifier의 주요 구성 요소

1. ValueNotifier 클래스: 값의 변경을 통지하는 클래스.
2. ValueListenableBuilder: ValueNotifier의 값이 변경될 때마다 UI를 업데이트하는 빌더 위젯.

## ValueNotifier 사용 방법

### ValueNotifier 생성 및 사용

ValueNotifier는 값의 초기값을 가지며, .value 속성을 통해 접근하고 변경할 수 있습니다. 값이 변경되면 자동으로 리스너들에게 알립니다.

### ValueListenableBuilder 사용

ValueListenableBuilder는 ValueNotifier의 값이 변경될 때마다 UI를 업데이트하는 빌더 위젯입니다. builder 함수는 새로운 값을 받아서 UI를 다시 빌드합니다.

## ValueNotifier 예제

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ValueNotifierExample(),
    );
  }
}

class ValueNotifierExample extends StatelessWidget {
  // ValueNotifier 생성 및 초기값 설정
  final ValueNotifier<int> _counter = ValueNotifier<int>(0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ValueNotifier Example'),
      ),
      body: Center(
        child: ValueListenableBuilder<int>(
          // ValueNotifier를 리스너로 사용
          valueListenable: _counter,
          // builder 함수로 UI 업데이트
          builder: (context, value, child) {
            return Text(
              'Counter: $value',
              style: TextStyle(fontSize: 24),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // 버튼을 눌렀을 때 ValueNotifier의 값을 업데이트
        onPressed: () {
          _counter.value += 1;
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

1. ValueNotifier 생성

- `final ValueNotifier<int> _counter = ValueNotifier<int>(0);`를 통해 `ValueNotifier`를 생성하고 초기값을 설정합니다.

2. ValueListenableBuilder 사용

- `ValueListenableBuilder<int>`는 `ValueNotifier의` 값을 리스너로 사용합니다.
- builder 함수는 새로운 값을 받아서 UI를 업데이트합니다.

3. 값 업데이트

- `FloatingActionButton`의 `onPressed` 콜백에서 `_counter.value += 1;`로 `ValueNotifier`의 값을 업데이트합니다.
- 값이 변경되면 `V alueListenableBuilder`는 자동으로 UI를 다시 빌드합니다.

## 주의사항

ValueNotifier는 단일 값의 상태 관리를 위해 사용되며, 더 복잡한 상태 관리를 위해서는 ChangeNotifier나 다른 상태 관리 솔루션을 고려해야 합니다.
ValueListenableBuilder는 ValueNotifier의 값이 변경될 때마다 UI를 다시 빌드하므로, 성능에 영향을 미칠 수 있는 복잡한 작업을 피해야 합니다.
