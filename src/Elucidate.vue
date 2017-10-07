<template>
  <div>
    <rendered-markup :markup="markup" :component="component"></rendered-markup>
    <code-snippet :code="markup"></code-snippet>
    <props-table :component="component"></props-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CodeSnippet from './CodeSnippet.vue'
  import RenderedMarkup from './RenderedMarkup.vue'
  import PropsTable from './PropsTable.vue'

  export default {
    name: 'elucidate',
    components: {
      CodeSnippet,
      RenderedMarkup,
      PropsTable
    },
    props: {
      markup: {
        type: String,
        required: true
      },
      component: {
        required: true,
        type: null
      }
    }
  }
</script>
