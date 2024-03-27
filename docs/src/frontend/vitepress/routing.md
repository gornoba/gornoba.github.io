# VitePress Routing

## 파일 기반 라우팅

VitePress는 마크다운 파일의 디렉토리 구조를 기반으로 HTML 페이지를 생성합니다.

```
.
├─ guide
│  ├─ getting-started.md
│  └─ index.md
├─ index.md
└─ prologue.md
```

위 구조는 다음과 같이 변환됩니다:

- `index.md` -> `/index.html` (접근 경로: `/`)
- `prologue.md` -> `/prologue.html`
- `guide/index.md` -> `/guide/index.html` (접근 경로: `/guide/`)
- `guide/getting-started.md` -> `/guide/getting-started.html`

## 프로젝트 루트와 소스 디렉토리

- **프로젝트 루트**는 `.vitepress` 디렉토리가 있는 위치입니다. 이곳은 구성 파일, 개발 서버 캐시, 빌드 출력 등을 포함합니다.
- **소스 디렉토리**는 마크다운 소스 파일이 위치하는 곳입니다. `srcDir` 구성 옵션을 통해 변경할 수 있습니다.

## 페이지 간 링크

절대 경로와 상대 경로 모두 사용 가능하며, 확장자는 생략하는 것이 좋습니다.

```markdown
[홈으로](/)
[시작하기](./guide/getting-started)
```

## Clean URLs

`.html` 확장자 없이 URL을 사용하려면 config에 cleanUrls를 true

## 동적 라우트와 경로 로더 파일

동적 라우트를 사용하여 여러 페이지를 생성할 수 있습니다. 예시:

```javascript
// packages/[pkg].paths.js
export default {
  paths() {
    return [{ params: { pkg: "foo" } }, { params: { pkg: "bar" } }];
  },
};
```

마크다운 파일에서 동적 파라미터 사용 예시:

```markdown
- 패키지 이름: {{ $params.pkg }}
- 버전: {{ $params.version }}
```
