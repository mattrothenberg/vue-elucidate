<template>
  <vue-tabs ref="tabs">
    <v-tab title="Markup">
      <pre style="margin: 0;"><code :key="example.markup" v-prism class="language-markup">{{ example.markup }}</code></pre>
    </v-tab>
    <v-tab title="Script" v-if="shouldShowScriptTab">
      <pre style="margin: 0;"><code :key="example.markup" v-prism class="language-javascript">{{ script }}</code></pre>
    </v-tab>
  </vue-tabs>
</template>

<script>
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import beautify from 'js-beautify'
  import { prism } from './prism.js'

  export default {
    name: 'code-snippet',
    components: {
      VueTabs,
      VTab
    },
    directives: {
      prism: prism
    },
    props: {
      example: {
        type: Object,
        required: true
      }
    },
    methods: {
      objectEmpty (obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
      },
      beautifyMethod (method) {
        return beautify(method.toString().replace('function', ''))
      },
      handleTabChange (tabIndex, newTab, oldTab) {
        console.log(tabIndex, newTab, oldTab)
      }
    },
    computed: {
      shouldShowScriptTab () {
        return this.hasProps || this.hasMethods
      },
      hasProps () {
        if (!this.example.props) return false
        return !this.objectEmpty(this.example.props)
      },
      hasMethods () {
        if (!this.example.methods) return false
        return !this.objectEmpty(this.example.methods)
      },
      renderProps () {
        if (this.hasProps) {
          return `data () { return ${JSON.stringify(this.example.props)}}`
        } else {
          return ''
        }
      },
      renderMethods () {
        if (this.hasMethods) {
          let methodNames = Object.keys(this.example.methods)
          let formattedMethods = methodNames.map((name) => {
            return this.beautifyMethod(this.example.methods[name])
          }).join(',')
          return `methods: {${formattedMethods}}`
        } else {
          return ''
        }
      },
      script () {
        const optionalComma = this.hasProps && this.hasMethods
          ? ','
          : ''

        const template = `export default {${this.renderProps}${optionalComma}${this.renderMethods}`
        return beautify(template, {indent_size: 2, end_with_newline: true})
      }
    }
  }
</script>

<style>
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
</style>
