<template>
  <div>
    <example-picker @example-change="handleExampleChange" :names="names" v-if="hasManyExamples"></example-picker> 
    <rendered-example :key="activeExampleName" :component="activeExample"></rendered-example>
    <code-snippet :key="activeExampleName" :example="activeExampleData"></code-snippet>
    <props-table-picker @props-change="handlePropsChange" :names="componentNames" v-if="hasManyComponents"></props-table-picker>
    <props-table :key="activeProps" :component="activePropTableSpecimen"></props-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ExamplePicker from './ExamplePicker.vue'
  import RenderedExample from './RenderedExample.vue'
  import CodeSnippet from './CodeSnippet.vue'
  import PropsTablePicker from './PropsTablePicker.vue'
  import PropsTable from './PropsTable.vue'

  export default {
    name: 'elucidate',
    components: {
      ExamplePicker,
      RenderedExample,
      CodeSnippet,
      PropsTable,
      PropsTablePicker
    },
    data () {
      return {
        exampleList: {},
        activeExampleName: '',
        activeProps: ''
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
      handleExampleChange (name) {
        this.activeExampleName = name
      },
      handlePropsChange (props) {
        this.activeProps = props 
      },
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
      componentNames () {
        return this.component.map(c => c.name)
      },  
      activeExample () {
        return this.exampleList[this.activeExampleName]
      },
      activePropTableSpecimen () {
        if (this.hasManyComponents) {
          return this.component.find((c) => c.name === this.activeProps)
        } else {
          return this.component
        }       
      },
      activeExampleData () {
        if (this.hasManyExamples) {
          return this.example.find((ex) => ex.name === this.activeExampleName)
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
        this.activeProps = this.component[0].name
      } else {
        Vue.use(this.component.name, this.component)
      }

      if (this.hasManyExamples) {
        this.example.forEach((ex) => {
          this.exampleList[ex.name] = this.buildComponent(ex)
        })
        this.activeExampleName = this.example[0].name
      } else {
        this.exampleList[this.example.name] = this.buildComponent(this.example)
        this.activeExampleName = this.example.name
      }
    }
  }
</script>