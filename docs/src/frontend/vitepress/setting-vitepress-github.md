# 검색엔진 노출을 위한 setting

## 참조

[Vitepress deploy](/frontend/vitepress/deploy)

## github repository

- repository를 다음과 같은 이름으로 생성
- `[id].github.io`
  ![alt](/setting-expose.png)

## 현재구조

- `.vitepress/config.mts`
  ```typescript {2-5}
  export default defineConfig({
    srcDir: "src",
    sitemap: {
      hostname: "https://[id].github.io/",
    },
  });
  ```
  srcDir에 src를 기준으로 되어 있습니다.
- `src/public` 폴더 생성
  - `public` 폴더에 `image`, `robots.txt`, 소유권 인증을 위한 html이 위차하게 됩니다.
  - `build를` 하면 `public의` 파일이 root에 위치하게 됩니다.

## `robots.txt`

- `robots.txt` 파일을 `public` 폴더에 생성

```
User-agent: *
Allow: /
Sitemap: https://[id].github.io/
```
