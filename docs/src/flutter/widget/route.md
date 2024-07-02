# Route

`MaterialApp`에서 사용할 수 있는 중요한 속성 중 일부는 `initialRoute`, `routes`, `onGenerateRoute`, `onUnknownRoute` 등입니다.

## initialRoute

initialRoute는 앱이 처음 시작될 때 표시할 경로를 정의합니다. 앱이 시작될 때 기본적으로 표시될 화면을 설정하는 데 사용됩니다.

```dart
void main() {
  runApp(MaterialApp(
    initialRoute: '/home',
    routes: {
      '/': (context) => WelcomeScreen(),
      '/home': (context) => HomeScreen(),
      '/settings': (context) => SettingsScreen(),
    },
  ));
}
```

## routes

routes는 앱에서 사용될 명명된 경로와 해당하는 위젯을 정의하는 맵입니다. 명명된 경로를 통해 손쉽게 화면 전환을 할 수 있습니다.

```dart
void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': (context) => FirstScreen(),
      '/second': (context) => SecondScreen(),
      '/third': (context) => ThirdScreen(),
    },
  ));
}
```

## onGenerateRoute

onGenerateRoute는 동적으로 라우트를 생성할 때 사용됩니다. 주어진 경로 이름에 따라 적절한 화면을 반환하는 함수입니다.

```dart
void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    onGenerateRoute: (settings) {
      switch (settings.name) {
        case '/':
          return MaterialPageRoute(builder: (context) => FirstScreen());
        case '/second':
          return MaterialPageRoute(builder: (context) => SecondScreen());
        case '/third':
          return MaterialPageRoute(builder: (context) => ThirdScreen());
        default:
          return MaterialPageRoute(builder: (context) => UnknownScreen());
      }
    },
  ));
}

class UnknownScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Unknown Screen'),
      ),
      body: Center(
        child: Text('Unknown route!'),
      ),
    );
  }
}
```

## onUnknownRoute

onUnknownRoute는 정의되지 않은 경로를 탐색하려 할 때 호출됩니다. 이를 통해 오류 처리 화면을 표시할 수 있습니다.

```dart
void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': (context) => FirstScreen(),
      '/second': (context) => SecondScreen(),
    },
    onUnknownRoute: (settings) {
      return MaterialPageRoute(builder: (context) => UnknownScreen());
    },
  ));
}
```
