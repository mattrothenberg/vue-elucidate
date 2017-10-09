# Elucidate
[![npm version](https://badge.fury.io/js/vue-elucidate.svg)](https://badge.fury.io/js/vue-elucidate)

A library that makes it a breeze to "shed light" on  your Vue component.

Demo URL: https://broker-pool-45468.netlify.com/#/

Demo Video: https://streamable.com/eir1u

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

```vue
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

So, the following code:

```html
<elucidate :component="button" :example="example"></elucidate>
```

```js
import CustomButton from '@/components/CustomButton'
import '@/darcula.css'

export default {
  data () {
    return {
      button: CustomButton,
      example: {
        markup: `<custom-button size="small">Hello</custom-button>`
      }
    }
  }
}
```
...would produce the following result:

![Sample Screenshot](https://user-images.githubusercontent.com/5148596/31322500-ba7257e8-ac66-11e7-8e1c-1c05d006482c.png)

# Customization
Elucidate is very customizable. I've included some light CSS here and there to make things look half-way decent. Here are a few guidelines for customization.

## BYOCSS
Elucidate uses [Prism JS](http://prismjs.com/) for syntax highlighting. Elucidate doesn't ship out-of-the-box with a particular syntax highlighting theme, so feel free to pick one from [Prism Themes](https://github.com/PrismJS/prism-themes/)

## Default CSS

```css
/* The element that houses the rendered code sample */ 
.preview {
  background: #f4f5fa;
  border-radius: .5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

/* The tabbed UI for toggling between markup / script */
.nav-tabs-wrapper .nav-tabs {
  margin: 0;
  padding: 0;
}

.nav-tabs-wrapper .tab {
  display: inline-block;
  color: darkgrey;
}

.nav-tabs-wrapper .tab:hover {
  color: grey;
}

.nav-tabs-wrapper .tab.active {
  color: #222;
  font-weight: 600;
}

.nav-tabs-wrapper .tab:not(:last-of-type) {
  margin-right: 1em;
}

.nav-tabs-wrapper .tab a {
  display: block;
  padding: .5em 0;
  text-decoration: none;
  color: inherit;
}

.vue-tabs {
  margin-bottom: 1rem;
}

/* Props Table */
.props-table {
  border-collapse: collapse;
  border-spacing: 0;
  overflow: auto;
}

.props-table th {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: .5rem 0;
  text-align: left;
}

.props-table td {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: .5rem 0;
}

.props-table td pre,
.props-table td code {
  margin: 0;
  overflow-x: auto; overflow-y: hidden; overflow: scroll;
}

.code-snippet-wrap {
  border: 1px solid rgba(0, 0, 0, .1);
  padding: .5rem;
  position: relative;
}

.code-snippet-wrap pre {
  margin: 0;
}

.code-snippet-toggle-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: .5rem 0;
  pointer-events: none;
  text-align: center;
}

.code-snippet-toggle {
  background: #222;
  color: white;
  border: 0;
  font-weight: 500;
  border-radius: .5rem;
  pointer-events: all;
}

.collapsed {
  height: 100px;
  overflow-y: hidden;
}

```
