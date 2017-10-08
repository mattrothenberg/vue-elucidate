# Elucidate

A library that makes it a breeze to "shed light" on  your Vue component.

# Installation (Yarn)
```
yarn add vue-elucidate
```
# Installation (in a Vue project)
```js
import Elucidate from 'vue-elucidate'
Vue.use(Elucidate)
```
# Usage
```html
<elucidate :component="button" :example="example"></elucidate>
```

The `<elucidate>` component takes two props, `component` and `example`. 

The former is, quite literally, a Vue component (either imported into your current app, or defined inline).

The latter is an object shaped thusly:

| Key | Value |
| --- | --- |
| `markup` | An HTML code snippet that you would like to document |
| `props` | An object defining the props referenced by your HTML code snippet |
| `methods` | An object defining the methods referenced by your HTML code snippet |
