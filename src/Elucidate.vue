<template>
  <div>
    <example-picker @example-change="handleExampleChange" :names="names" v-if="hasManyExamples"></example-picker> 
    <rendered-example :key="activeCompName" :component="activeComp"></rendered-example>
    <code-snippet :key="activeCompName" :example="activeExample"></code-snippet>
    <props-table :component="component"></props-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ExamplePicker from './ExamplePicker.vue'
  import RenderedExample from './RenderedExample.vue'
  import CodeSnippet from './CodeSnippet.vue'
  import PropsTable from './PropsTable.vue'

  export default {
    name: 'elucidate',
    components: {
      ExamplePicker,
      RenderedExample,
      CodeSnippet,
      PropsTable
    },
    data () {
      return {
        exampleList: {},
        activeCompName: ''
      }
    },
    props: {
      example: {
        type: null,
        required: true
      },
      component: {
        required: true,
        type: null
      }
    },
    methods: {
      buildComponent (ex) {
        let comp = {}
        comp[this.component.name] = this.component

        return {
          template: ex.markup,
          data () {
            return ex.props || {}
          },
          methods: ex.methods,
          components: comp
        }
      },
      handleExampleChange (example) {
        this.activeCompName = example
      }
    },
    computed: {
      hasManyExamples () {
        return Array.isArray(this.example)
      },
      names () {
        return Object.keys(this.exampleList)
      },
      activeComp () {
        return this.exampleList[this.activeCompName]
      },
      activeExample () {
        if (this.hasManyExamples) {
          return this.example.find((ex) => ex.name === this.activeCompName)
        } else {
          return this.example
        }
      }
    },
    created () {
      Vue.use(this.component.name, this.component)

      if (this.hasManyExamples) {
        this.example.forEach((ex) => {
          this.exampleList[ex.name] = this.buildComponent(ex)
        })
        this.activeCompName = this.example[0].name
      } else {
        this.exampleList[this.example.name] = this.buildComponent(this.example)
        this.activeCompName = this.example.name
      }
    }
  }
</script>