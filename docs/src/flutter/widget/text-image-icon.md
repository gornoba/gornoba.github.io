# Text, Image, Icon

## Text

Text 위젯은 화면에 텍스트를 표시하는 데 사용됩니다. 주요 옵션은 다음과 같습니다

- data: 표시할 텍스트 문자열.
- style: 텍스트의 스타일을 지정하는 TextStyle.
- textAlign: 텍스트의 정렬 방식.
- textDirection: 텍스트 방향.
- softWrap: 텍스트가 영역을 벗어날 때 줄바꿈 여부.
- overflow: 텍스트가 영역을 벗어날 때 처리 방법.
- textScaleFactor: 텍스트 크기 비율.
- maxLines: 텍스트의 최대 줄 수.

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
          title: Text('Text Example with All Options'),
        ),
        body: Center(
          child: Text(
            'Hello, Flutter!',
            // 텍스트의 스타일을 지정
            style: TextStyle(
              fontSize: 24.0,
              fontWeight: FontWeight.bold,
              color: Colors.blue,
              backgroundColor: Colors.yellow,
              letterSpacing: 2.0,
              wordSpacing: 4.0,
              height: 1.5,
              fontFamily: 'Arial',
              decoration: TextDecoration.underline,
              decorationColor: Colors.red,
              decorationStyle: TextDecorationStyle.dashed,
            ),
            // 텍스트의 정렬 방식
            textAlign: TextAlign.center,
            // 텍스트 방향
            textDirection: TextDirection.ltr,
            // 텍스트가 영역을 벗어날 때 줄바꿈 여부
            softWrap: true,
            // 텍스트가 영역을 벗어날 때 처리 방법
            overflow: TextOverflow.ellipsis,
            // 텍스트 크기 비율
            textScaleFactor: 1.2,
            // 텍스트의 최대 줄 수
            maxLines: 2,
          ),
        ),
      ),
    );
  }
}
```

## Image

https://www.flaticon.com<br/>
Image 위젯은 화면에 이미지를 표시하는 데 사용됩니다. 주요 옵션은 다음과 같습니다

- image: 표시할 이미지.
- width: 이미지의 너비.
- height: 이미지의 높이.
- fit: 이미지의 적합성 방식.
- alignment: 이미지의 정렬.
- repeat: 이미지 반복 방식.
- color: 이미지 색상.
- colorBlendMode: 색상 혼합 모드.
- semanticLabel: 접근성 라벨.
- excludeFromSemantics: 접근성 제외 여부.

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
          title: Text('Image Example with All Options'),
        ),
        body: Center(
          child: Image.network(
            'https://flutter.dev/assets/homepage/carousel/slide_1-bg-2e1b7c8c7b1a933fb4dc85e87e525b65cddb1f917be21f1d6ceaa70d2b87f2e8.jpg',
            // 이미지의 너비
            width: 300.0,
            // 이미지의 높이
            height: 200.0,
            // 이미지의 적합성 방식
            fit: BoxFit.cover,
            // 이미지의 정렬
            alignment: Alignment.center,
            // 이미지 반복 방식
            repeat: ImageRepeat.noRepeat,
            // 이미지 색상
            color: Colors.red,
            // 색상 혼합 모드
            colorBlendMode: BlendMode.colorBurn,
            // 접근성 라벨
            semanticLabel: 'Flutter Logo',
            // 접근성 제외 여부
            excludeFromSemantics: false,
          ),
        ),
      ),
    );
  }
}
```

### Network Image

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
          title: Text('Network Image Example'),
        ),
        body: Center(
          child: Image.network(
            'https://flutter.dev/assets/homepage/carousel/slide_1-bg-2e1b7c8c7b1a933fb4dc85e87e525b65cddb1f917be21f1d6ceaa70d2b87f2e8.jpg',
            width: 300.0,
            height: 200.0,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
```

### Asset Image

```yaml
# pubspec.yaml
flutter:
  assets:
    - assets
```

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
          title: Text('Asset Image Example'),
        ),
        body: Center(
          child: Image.asset(
            'assets/images/flutter_logo.png',
            width: 300.0,
            height: 200.0,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
```

### File Image

```yaml
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  image_picker: ^0.8.4+4
```

```dart
import 'package:flutter/material.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  File? _image; // 선택된 이미지를 저장할 변수

  // 이미지를 선택하는 비동기 함수
  Future<void> _pickImage() async {
    // 갤러리에서 이미지를 선택
    final pickedFile = await ImagePicker().pickImage(source: ImageSource.gallery);

    setState(() {
      if (pickedFile != null) {
        // 선택된 이미지 파일을 _image 변수에 저장
        _image = File(pickedFile.path);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('File Image Example'), // 앱바에 타이틀 설정
        ),
        body: Center(
          child: _image == null
              ? Text('No image selected.') // 이미지가 선택되지 않았을 때 표시할 텍스트
              : Image.file(
                  _image!, // 선택된 이미지 파일을 표시
                  width: 300.0, // 이미지의 너비 설정
                  height: 200.0, // 이미지의 높이 설정
                  fit: BoxFit.cover, // 이미지를 컨테이너에 맞추기 위해 크기 조정
                ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _pickImage, // 버튼을 누르면 _pickImage 함수 호출
          tooltip: 'Pick Image', // 툴팁 텍스트 설정
          child: Icon(Icons.add_a_photo), // 버튼 아이콘 설정
        ),
      ),
    );
  }
}
```

## Icon

Icon 위젯은 화면에 아이콘을 표시하는 데 사용됩니다. 주요 옵션은 다음과 같습니다:

- icon: 표시할 아이콘.
- size: 아이콘의 크기.
- color: 아이콘의 색상.
- semanticLabel: 접근성 라벨.
- textDirection: 텍스트 방향.

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
          title: Text('Icon Example with All Options'),
        ),
        body: Center(
          child: Icon(
            Icons.star,
            // 아이콘의 크기
            size: 50.0,
            // 아이콘의 색상
            color: Colors.purple,
            // 접근성 라벨
            semanticLabel: 'Star Icon',
            // 텍스트 방향
            textDirection: TextDirection.ltr,
          ),
        ),
      ),
    );
  }
}
```

### 기본 제공 아이콘

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
          title: Text('Default Icon Example'),
        ),
        body: Center(
          child: Icon(
            Icons.star,
            size: 50.0,
            color: Colors.purple,
          ),
        ),
      ),
    );
  }
}
```

### Asset 아이콘

```yaml
# pubspec.yaml 설정:
flutter:
  assets:
    - assets
```

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
          title: Text('Asset Icon Example'),
        ),
        body: Center(
          child: Image.asset(
            'assets/icons/custom_icon.png',
            width: 50.0,
            height: 50.0,
          ),
        ),
      ),
    );
  }
}
```

### FontAwesome Icons

```yaml
# pubspec.yaml 설정:
dependencies:
  flutter:
    sdk: flutter
  font_awesome_flutter: ^10.1.0
```

```dart
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('FontAwesome Icon Example'),
        ),
        body: Center(
          child: FaIcon(
            FontAwesomeIcons.thumbsUp,
            size: 50.0,
            color: Colors.blue,
          ),
        ),
      ),
    );
  }
}
```
