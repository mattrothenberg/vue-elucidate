<template>
  <vue-tabs>
    <v-tab title="Markup">
      <pre style="margin: 0;" class="language-markup"><code>{{ example.markup }}</code></pre>
    </v-tab>
    <v-tab title="Script">
      <pre style="margin: 0;" class="language-javascript"><code>{{ script }}</code></pre>
    </v-tab>
  </vue-tabs>
</template>

<script>
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import beautify from 'js-beautify'

  export default {
    name: 'code-snippet',
    components: {
      VueTabs,
      VTab
    },
    props: {
      example: {
        type: Object,
        required: true
      }
    },
    computed: {
      propsToString () {
        return JSON.stringify(this.example.props)
      },
      script () {
        const template = `export default {
  data () {
    return {
      ${this.propsToString}
    }
  }
}
`
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
</style>
