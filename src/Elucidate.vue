<template>
  <div>
    <example-picker @example-change="handleExampleChange" :names="names" v-if="hasManyExamples"></example-picker> 
    <rendered-example :key="activeCompName" :component="activeComp"></rendered-example>
    <code-snippet :key="activeCompName" :example="activeExample"></code-snippet>
    <div v-if="hasManyComponents">
      <props-table v-for="(c, index) in component" :key="index" :component="c"></props-table>
    </div>
    <props-table v-else :component="component"></props-table>
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
        if (this.hasManyComponents) {
          this.component.forEach(c => {
            comp[c.name] = c
          })
        } else {
          comp[this.component.name] = this.component
        }

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
      hasManyComponents () {
        return Array.isArray(this.component)
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
      if (this.hasManyComponents) {
        this.component.forEach(c => {
          Vue.use(c.name, c)
        })
      } else {
        Vue.use(this.component.name, this.component)
      }

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