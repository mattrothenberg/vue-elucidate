<template>
  <div>
    <rendered-example :example="example" :component="component"></rendered-example>
    <code-snippet :code="example.markup"></code-snippet>
    <props-table :component="component"></props-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CodeSnippet from './CodeSnippet.vue'
  import RenderedExample from './RenderedExample.vue'
  import PropsTable from './PropsTable.vue'
  import VuePrism from 'vue-prism'
  Vue.use(VuePrism)

  export default {
    name: 'elucidate',
    components: {
      CodeSnippet,
      RenderedExample,
      PropsTable
    },
    props: {
      example: {
        type: Object,
        required: true
      },
      component: {
        required: true,
        type: null
      }
    }
  }
</script>