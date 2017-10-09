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

# How does it work?

Let's assume you have a component named `custom-button`. It's defined in `custom-button.vue` thusly:

```
<template>
  <button :class="classList">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'custom-button',
    props: {
      variant: {
        type: String,
        default: 'primary'
      },
      size: {
        type: String,
        default: 'medium'
      }
    },
    computed: {
      classList () {
        return `btn-${this.variant} btn-${this.size}`
      }
    }
  }
</script>

<style>
  .btn-primary {
    background: blue;
    color: white;
  }

  .btn-small {
    font-size: 12px;
  }
</style>
```

Elucidate works by:
- Rendering an example code snippet, e.g., `<custom-button size="small">Hello</custom-button>`
- Documenting that snippet, as well as any props/functions that were passed to it
- Documenting all of the props exposed by `<custom-button>`, in this case `variant` and `size`.
