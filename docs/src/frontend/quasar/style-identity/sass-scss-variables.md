# Sass/SCSS Variables

## 사용법

`/src/css/quasar.variables.sass`에서 설정되었거나 [변수목록](https://quasar.dev/style/sass-scss-variables#variables-list)에 있는 경우 `$`를 붙여 사용하면 변수를 가져와 적용합니다.

```sass
<!-- Notice lang="sass" -->
<style lang="sass">
div
  color: $red-1
  background-color: $grey-5
</style>

<!-- Notice lang="scss" -->
<style lang="scss">
div {
  color: $red-1;
  background-color: $grey-5;
}
</style>
```
