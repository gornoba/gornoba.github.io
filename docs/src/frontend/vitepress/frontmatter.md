# 프론트매터 (Frontmatter)

## Frontmatter Config

[Frontmatter Config Link](https://vitepress.dev/reference/frontmatter-config)

## 사용법

VitePress는 모든 마크다운 파일에서 YAML 프론트매터를 지원하며, `gray-matter`를 사용해 파싱합니다. 프론트매터는 마크다운 파일의 최상단(스크립트 태그를 포함한 모든 요소들 이전)에 위치해야 하며, 세 개의 대시(`---`) 사이에 유효한 YAML 형식으로 작성되어야 합니다.

예시:

```markdown
---
title: VitePress로 문서 작성하기
editLink: true
---
```

사이트 또는 기본 테마 구성 옵션 중 많은 것들이 프론트매터와 해당 옵션을 가지고 있습니다. 현재 페이지에 대한 특정 동작을 재정의하기 위해 프론트매터를 사용할 수 있습니다. 자세한 내용은 프론트매터 구성 참조를 확인하세요.

또한, 페이지의 동적 Vue 표현식에서 사용될 사용자 정의 프론트매터 데이터를 정의할 수 있습니다.

## 프론트매터 데이터 접근

프론트매터 데이터는 특별한 `$frontmatter` 글로벌 변수를 통해 접근할 수 있습니다:

마크다운 파일에서 이를 사용하는 예시:

```markdown
---
title: VitePress로 문서 작성하기
editLink: true
---

# {{ $frontmatter.title }}

가이드 컨텐츠
```

`<script setup>`에서 현재 페이지의 프론트매터 데이터에 접근하기 위해 `useData()` 헬퍼를 사용할 수도 있습니다.

## 대안 프론트매터 형식

VitePress는 중괄호(`{}`)로 시작하고 끝나는 JSON 프론트매터 구문도 지원합니다:

```json
---
{
  "title": "해커처럼 블로깅하기",
  "editLink": true
}
---
```

이 설명은 VitePress에서 프론트매터를 사용하는 방법, 그리고 이를 통해 페이지별로 특정 설정을 재정의하거나 사용자 정의 데이터를 추가하는 방법에 대해 다룹니다.
