# Navigator

## 화면 간 이동 및 오브젝트 전달

### Navigator를 사용한 화면 이동

Navigator는 Flutter에서 화면 간의 이동을 관리하는 데 사용됩니다. push와 pop 메서드를 사용하여 새로운 화면을 추가하거나 제거할 수 있습니다.

#### 기본적인 화면 이동

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: FirstScreen(),
    );
  }
}

class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Screen'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SecondScreen(data: 'Hello from First Screen')),
            );
          },
          child: Text('Go to Second Screen'),
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  final String data;

  SecondScreen({required this.data});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Screen'),
      ),
      body: Center(
        child: Text(data),
      ),
    );
  }
}
```

- Navigator.push를 사용하여 SecondScreen으로 이동하며, 생성자 인자로 데이터를 전달합니다.
- SecondScreen에서는 전달된 데이터를 받아 화면에 표시합니다.

## 네비게이션 바 (BottomNavigationBar)

BottomNavigationBar는 화면 하단에 위치하며, 탭을 통해 다른 화면으로 전환할 수 있습니다.

### BottomNavigationBar 사용

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
  int _selectedIndex = 0;
  static List<Widget> _widgetOptions = <Widget>[
    Text('Home Screen'),
    Text('Search Screen'),
    Text('Profile Screen'),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('BottomNavigationBar Example'),
        ),
        body: Center(
          child: _widgetOptions.elementAt(_selectedIndex),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.search),
              label: 'Search',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'Profile',
            ),
          ],
          currentIndex: _selectedIndex,
          selectedItemColor: Colors.amber[800],
          onTap: _onItemTapped,
        ),
      ),
    );
  }
}
```

- BottomNavigationBar를 사용하여 세 개의 탭을 정의합니다.
- onTap 콜백에서 선택된 인덱스를 업데이트하고, \_widgetOptions 배열에서 해당하는 화면을 표시합니다.

## 탭 바 (TabBar)

TabBar는 일반적으로 TabBarView와 함께 사용되어 탭을 통해 화면을 전환할 수 있습니다.

### TabBar와 TabBarView 사용

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: DefaultTabController(
        length: 3,
        child: Scaffold(
          appBar: AppBar(
            title: Text('TabBar Example'),
            bottom: TabBar(
              tabs: [
                Tab(icon: Icon(Icons.home), text: 'Home'),
                Tab(icon: Icon(Icons.search), text: 'Search'),
                Tab(icon: Icon(Icons.person), text: 'Profile'),
              ],
            ),
          ),
          body: TabBarView(
            children: [
              Center(child: Text('Home Screen')),
              Center(child: Text('Search Screen')),
              Center(child: Text('Profile Screen')),
            ],
          ),
        ),
      ),
    );
  }
}
```

- DefaultTabController를 사용하여 탭의 수를 정의합니다.
- AppBar의 bottom 속성에 TabBar를 추가하고, TabBarView에서 각 탭에 대한 화면을 정의합니다.

## 드로어 (Drawer)

Drawer는 화면의 왼쪽이나 오른쪽에서 슬라이드로 열 수 있는 메뉴입니다.

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
          title: Text('Drawer Example'),
        ),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: <Widget>[
              DrawerHeader(
                decoration: BoxDecoration(
                  color: Colors.blue,
                ),
                child: Text(
                  'Drawer Header',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
              ),
              ListTile(
                leading: Icon(Icons.home),
                title: Text('Home'),
                onTap: () {
                  Navigator.pop(context);
                },
              ),
              ListTile(
                leading: Icon(Icons.search),
                title: Text('Search'),
                onTap: () {
                  Navigator.pop(context);
                },
              ),
              ListTile(
                leading: Icon(Icons.person),
                title: Text('Profile'),
                onTap: () {
                  Navigator.pop(context);
                },
              ),
            ],
          ),
        ),
        body: Center(
          child: Text('Drawer Example Home Screen'),
        ),
      ),
    );
  }
}
```

- drawer 속성에 Drawer 위젯을 추가합니다.
- Drawer 위젯 안에 ListView를 사용하여 메뉴 항목을 정의합니다.
- ListTile 위젯을 사용하여 각 메뉴 항목을 정의하고, onTap 콜백을 통해 네비게이션을 처리합니다.
