# Quasar Components Transitions

## 사용가능 컴포넌트와 attr

<ul><li><p><code class="doc-token">transition-show</code> / <code class="doc-token">transition-hide</code></p><ul><li><a href="/vue-components/button-dropdown" class="doc-link">QBtnDropdown</a></li><li><a href="/vue-components/inner-loading" class="doc-link">QInnerLoading</a></li><li><a href="/vue-components/tooltip" class="doc-link">QTooltip</a></li><li><a href="/vue-components/menu" class="doc-link">QMenu</a></li><li><a href="/vue-components/dialog" class="doc-link">QDialog</a></li><li><a href="/vue-components/select" class="doc-link">QSelect</a> (through QMenu and QDialog)</li><li><a href="/vue-components/popup-proxy" class="doc-link">QPopupProxy</a> (through QMenu and QDialog)</li></ul></li><li><p><code class="doc-token">transition-prev</code> / <code class="doc-token">transition-next</code></p><ul><li><a href="/vue-components/carousel" class="doc-link">QCarousel</a></li><li><a href="/vue-components/tab-panels" class="doc-link">QTabPanels</a></li><li><a href="/vue-components/stepper" class="doc-link">QStepper</a></li></ul></li><li><p><code class="doc-token">transition</code></p><ul><li><a href="/vue-components/intersection" class="doc-link">QIntersection</a></li></ul></li></ul>

## 사용가능 transition

`slide-right`<br/>
`slide-left`<br/>
`slide-up`<br/>
`slide-down`<br/>
`fade`<br/>
`scale`<br/>
`rotate`<br/>
`flip-right`<br/>
`flip-left`<br/>
`flip-up`<br/>
`flip-down`<br/>
`jump-right`<br/>
`jump-left`<br/>
`jump-up`<br/>
`jump-down`<br/>

## 사용

```html
<q-menu transition-show="jump-down" transition-hide="jump-up" />
```
