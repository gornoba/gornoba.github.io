# Markdown 문법 가이드

## 제목(Headers)

Markdown에서 제목은 `#` 기호를 사용하여 표현합니다. `#`의 개수가 많아질수록 하위 제목을 의미합니다.

```markdown
# 제목 1

## 제목 2

### 제목 3

#### 제목 4

##### 제목 5

###### 제목 6
```

## 강조(Emphasis)

이탤릭체는 `*` 또는 `_`로 감싸서, 볼드체는 `**` 또는 `__`로 감싸서 표현합니다.

```markdown
_이탤릭체_ 또는 _이탤릭체_
**볼드체** 또는 **볼드체**
**_이탤릭 + 볼드_**
~~취소선~~
```

## 목록(Lists)

### 순서 없는 목록(Unordered)

`*`, `+`, 또는 `-`를 사용합니다.

```markdown
- 항목 1
- 항목 2
  - 항목 2a
  - 항목 2b
```

### 순서 있는 목록(Ordered)

숫자를 사용합니다.

```markdown
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목
```

## 링크(Links)

`[링크 텍스트](URL)` 형식을 사용합니다.

```markdown
[Google](https://www.google.com)
```

## 이미지(Images)

`![대체 텍스트](이미지URL)` 형식을 사용합니다.

```markdown
![이미지](이미지URL)
```

## 코드(Code) 및 구문 강조(Syntax Highlighting)

한 줄 코드는 `로 감싸고, 코드 블록은 `로 감싹니다. 구문 강조를 위해서는 ` 뒤에 언어를 명시합니다.

````markdown
`코드`

```python
print("Hello, world!")
```
````

````

## 인용문(Blockquotes)

`>`를 사용합니다.

```markdown
> 이것은 인용문입니다.
````

## 표(Tables)

표는 다음과 같이 생성할 수 있습니다.

```markdown
| 헤더1 | 헤더2 | 헤더3 |
| ----- | ----- | ----- |
| 내용1 | 내용2 | 내용3 |
| 내용4 | 내용5 | 내용6 |
```

## 구분선(Horizontal Rules)

`---` 또는 `***`를 사용하여 구분선을 생성합니다.

```markdown
---
```

## HTML

Markdown 내에서 직접 HTML을 사용할 수도 있습니다.

```html
<div style="color: red;">HTML 코드 예시</div>
```

## 태스크 리스트(Task Lists)

작업 목록 항목 앞에 `[ ]` 또는 `[x]`를 사용하여 체크박스를 만듭니다. `[x]`는 선택된 항목을 나타냅니다.

```markdown
- [x] 이것은 완료된 항목입니다.
- [ ] 이것은 완료되지 않은 항목입니다.
```

## 자동 링크(Autolinks)

웹 주소와 이메일 주소를 자동으로 링크로 변환합니다. 꺾쇠괄호(`<`, `>`)를 사용합니다.

```markdown
<https://www.example.com>
<example@example.com>
```

## 줄바꿈(Line Breaks)

줄의 끝에 스페이스를 두 번 입력하거나, `<br/ >`을 사용하여 줄바꿈을 할 수 있습니다.

```markdown
이것은 첫 번째 줄입니다.  
그리고 이것은 두 번째 줄입니다.
```
