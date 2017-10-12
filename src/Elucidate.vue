<template>
  <div>
    <rendered-example
      @example-change="handleExampleChange"
      :names="names"
      :component="activeComp">
    </rendered-example>
    <!-- <code-snippet :example="example"></code-snippet>
    <props-table :component="component"></props-table> -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import CodeSnippet from './CodeSnippet.vue'
  import RenderedExample from './RenderedExample.vue'
  import PropsTable from './PropsTable.vue'
  import VuePrism from 'vue-prism'
  Vue.use(VuePrism)

  const slugify = (str) => {
    return str.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  export default {
    name: 'elucidate',
    components: {
      CodeSnippet,
      RenderedExample,
      PropsTable
    },
    data () {
      return {
        exampleList: {},
        activeCompName: '',
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
      slugify,
      handleExampleChange (name) {
        this.activeCompName = name
      },
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
      }
    },
    computed: {
      hasExamples () {
        return Array.isArray(this.example)
      },
      names () {
        return Object.keys(this.exampleList)
      },
      activeComp () {
        return this.exampleList[this.activeCompName]
      }
    },
    created () {
      Vue.use(this.component.name, this.component)

      if (this.hasExamples) {
        this.example.forEach((ex) => {
          this.exampleList[slugify(ex.name)] = this.buildComponent(ex)
        })
        this.activeCompName = slugify(this.example[0].name)
      }
    }
  }
</script>