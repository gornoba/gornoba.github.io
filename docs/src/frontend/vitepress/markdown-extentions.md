# VitePress 마크다운 확장 기능 요약 및 번역

## 헤더 앵커(Header Anchors)

- 헤더에는 자동으로 앵커 링크가 적용됩니다.
- `markdown.anchor` 옵션을 사용하여 앵커의 렌더링을 구성할 수 있습니다.

### 커스텀 앵커(Custom Anchors)

- 자동 생성된 앵커 대신 헤딩에 커스텀 앵커 태그를 지정하려면 헤딩에 접미사를 추가합니다.

  ```markdown
  # 사용자 정의 앵커 사용하기 {#my-anchor}
  ```

## 링크(Links)

- 내부 및 외부 링크 모두 특별한 처리를 받습니다.

### 내부 링크(Internal Links)

- 내부 링크는 SPA 내비게이션을 위해 라우터 링크로 변환됩니다.
- 각 하위 디렉토리에 있는 `index.md`는 자동으로 `index.html`로 변환되며, 해당 URL은 `/`로 변환됩니다.

### 외부 링크(External Links)

- 외부 링크는 자동으로 `target="_blank" rel="noreferrer"`가 적용됩니다.

## 프론트매터(Frontmatter)

- YAML 프론트매터는 기본적으로 지원됩니다.

  ```yaml
  ---
  title: 블로깅처럼 해커처럼
  lang: ko-KR
  ---
  ```

## GitHub 스타일 테이블(GitHub-Style Tables)

- 테이블은 다음과 같이 생성할 수 있습니다.

  ```markdown
  | 테이블 |    좋다     | 멋있다 |
  | ------ | :---------: | -----: |
  | col 3  | 오른쪽 정렬 |  $1600 |
  | col 2  | 가운데 정렬 |    $12 |
  | 줄무늬 |  깔끔하다   |     $1 |
  ```

  | 테이블 |    좋다     | 멋있다 |
  | ------ | :---------: | -----: |
  | col 3  | 오른쪽 정렬 |  $1600 |
  | col 2  | 가운데 정렬 |    $12 |
  | 줄무늬 |  깔끔하다   |     $1 |

## 이모지(Emoji) 🎉

- 이모지는 다음과 같이 사용할 수 있습니다.

  ```markdown
  :tada: :100:
  ```

  :tada: :100:

## 목차(Table of Contents)

- 목차는 다음과 같이 생성할 수 있습니다.

  ```markdown
  [[toc]]
  ```

  [[toc]]

## 커스텀 컨테이너(Custom Containers)

- 커스텀 컨테이너는 타입, 제목, 내용을 정의하여 사용할 수 있습니다.

### 기본 제목(Default Title)

```markdown
::: info
이것은 정보 상자입니다.
:::

::: tip
이것은 팁입니다.
:::

::: warning
이것은 경고입니다.
:::

::: danger
이것은 위험한 경고입니다.
:::

::: details
이것은 세부 정보 블록입니다.
:::
```

::: info
이것은 정보 상자입니다.
:::

::: tip
이것은 팁입니다.
:::

::: warning
이것은 경고입니다.
:::

::: danger
이것은 위험한 경고입니다.
:::

::: details
이것은 세부 정보 블록입니다.
:::

### 커스텀 제목(Custom Title)

커스텀 제목은 컨테이너 타입 바로 뒤에 텍스트를 추가하여 설정할 수 있습니다. 또한, 사이트 설정에서 전역적으로 커스텀 제목을 설정하여 비영어권 사용자를 위한 편의성을 제공할 수 있습니다.

````markdown
::: danger STOP
위험 구역입니다. 진행하지 마세요.
:::

::: details 코드 보기를 클릭하세요

```js
console.log("Hello, VitePress!");
```

:::
````

::: danger STOP
위험 구역입니다. 진행하지 마세요.
:::
::: details 코드 보기를 클릭하세요

```js
console.log("Hello, VitePress!");
```

:::

## GitHub-flavored Alerts

```markdown
> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

## 코드 블록 내 강조 표시(Syntax Highlighting in Code Blocks)

- VitePress는 코드 블록 내에서 언어 구문을 하이라이팅합니다.

````
  ```js
  export default {
    name: "MyComponent",
    // ...
  };
  ```
````

```js
export default {
  name: "MyComponent",
  // ...
};
```

## 코드 블록 내 줄 하이라이팅(Line Highlighting in Code Blocks)

- 특정 줄을 하이라이팅하려면, 줄 번호를 중괄호와 함께 추가합니다.

````
  ```js{2,4}
  export default {
    data () {
      return {
        msg: '하이라이트!'
      }
    }
  }
  ```
````

```js{2,4}
export default {
  data () {
    return {
      msg: '하이라이트!'
    }
  }
}
```

````
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' //[!code highlight]
    }
  }
}
```
````

```js
export default {
  data() {
    return {
      msg: "Highlighted!", // [!code highlight]
    };
  },
};
```

## 코드 블럭내 focus (Focus in Code Blocks)

````
```js
export default {
  data() {
    return {
      msg: "Focused!", //[!code focus]
    };
  },
};
```
````

```js
export default {
  data() {
    return {
      msg: "Focused!", // [!code focus]
    };
  },
};
```

## 컬러를 다르게 표현하기 (Colored Diffs in Code Blocks)

````
```js
export default {
  data () {
    return {
      msg: 'Removed' //[!code --]
      msg: 'Added' //[!code ++]
    }
  }
}
```
````

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## 에러와 경고표시 (Errors and Warnings in Code Blocks)

````
```js
export default {
  data () {
    return {
      msg: 'Error', //[!code error]
      msg: 'Warning' //[!code warning]
    }
  }
}
```
````

```js
export default {
  data() {
    return {
      msg: "Error", // [!code error]
      msg: "Warning", // [!code warning]
    };
  },
};
```

## 줄번호 표시(Line Numbers)

- 전역설정

  ```javascript
  export default {
    markdown: {
      lineNumbers: true,
    },
  };
  ```

- 부분설정

````
```ts {1}
// line-numbers is disabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// line-numbers is enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```
````

```ts {1}
// line-numbers is disabled by default
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// line-numbers is enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

## 고급 설정(Advanced Configuration)

- VitePress는 `markdown-it`을 마크다운 렌더러로 사용합니다. 여러 커스텀 플러그인을 통해 구현된 확장 기능들을 추가로 커스터마이징할 수 있습니다.

  ```js
  import { defineConfig } from "vitepress";
  import markdownItAnchor from "markdown-it-anchor";
  import markdownItFoo from "markdown-it-foo";

  export default defineConfig({
    markdown: {
      anchor: {
        permalink: markdownItAnchor.permalink.headerLink(),
      },
      toc: { level: [1, 2] },
      config: (md) => {
        md.use(markdownItFoo);
      },
    },
  });
  ```

## 코드 스니펫 가져오기 (Import Code Snippets)

VitePress에서는 외부 파일로부터 코드 스니펫을 가져와 마크다운 문서 내에 직접 삽입할 수 있는 기능을 제공합니다. 이를 통해 코드의 중복을 줄이고, 유지보수를 용이하게 할 수 있습니다.

### 기본 사용법

- 특정 파일에서 코드 스니펫을 가져오려면, `<<<` 연산자와 파일 경로를 사용합니다.

  ```markdown
  <<< @/path/to/code.js
  ```

### 특정 줄 하이라이팅

- 가져온 코드 스니펫 내에서 특정 줄을 하이라이팅하려면, 파일 경로 뒤에 중괄호 `{}`를 사용하고, 그 안에 하이라이트할 줄 번호를 지정합니다.

  ```markdown
  <<< @/path/to/code.js{2,4-6}
  ```

### 상대 경로 사용

- `@` 기호는 프로젝트의 소스 디렉토리를 나타냅니다. 상대 경로를 사용하려면, `@` 대신 `..`을 사용할 수 있습니다.

  ```markdown
  <<< ../relative/path/to/code.js
  ```

### 코드 스니펫의 VS Code 영역

- 코드 파일 내에서 `#region`과 `#endregion` 주석을 사용하여 영역을 정의하고, 해당 영역만을 가져올 수 있습니다. 영역 이름을 파일 경로 뒤에 `#` 기호와 함께 추가합니다.

  ```markdown
  <<< @/path/to/code.js#region-name
  ```

이 기능을 활용함으로써, 문서화 과정에서 실제 코드 파일을 참조하여 항상 최신 상태의 코드 예시를 제공할 수 있습니다. 또한, 코드 변경 시 자동으로 문서 내의 코드 스니펫도 업데이트되어 문서의 정확성을 유지할 수 있습니다.

## 코드 그룹(Code Groups)

- 여러 코드 블록을 그룹화하여 하나의 단위로 표시할 수 있습니다. 이 기능은 여러 언어 또는 여러 설정 옵션을 한 번에 보여주고 싶을 때 유용합니다.

````markdown
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
};

export default config;
```

```ts [config.ts]
import type { UserConfig } from "vitepress";

const config: UserConfig = {
  // ...
};

export default config;
```

:::
````

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
};

export default config;
```

```ts [config.ts]
import type { UserConfig } from "vitepress";

const config: UserConfig = {
  // ...
};

export default config;
```

:::

## 마크다운 파일 포함(Markdown File Inclusion)

- 하나의 마크다운 파일을 다른 마크다운 파일에 포함시킬 수 있으며, 심지어 중첩해서 사용할 수도 있습니다.

**Input**

```markdown
# Docs

## Basics

<!--@include: ./parts/basics.md-->
```

**Part file (`parts/basics.md`)**

```markdown
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**Equivalent code**

```markdown
# Docs

## Basics

Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

- 원하는 줄만 가져오려면
  **Input**

```markdown
# Docs

## Basics

<!--@include: ./parts/basics.md{3,}-->
```

**Part file (`parts/basics.md`)**

```markdown
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**Equivalent code**

```markdown
# Docs

## Basics

### Configuration

Can be created using `.foorc.json`.
```

## 이미지 지연 로딩(Image Lazy Loading)

- 모든 이미지에 대해 마크다운을 통해 추가된 이미지의 지연 로딩을 활성화할 수 있습니다.

  ```js
  export default {
    markdown: {
      image: {
        lazyLoading: true,
      },
    },
  };
  ```
