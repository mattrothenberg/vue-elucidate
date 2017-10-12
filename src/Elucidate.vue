<template>
  <div>
    <rendered-example :examples="exampleList" :component="activeComp"></rendered-example>
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
        exampleList: [],
        activeComp: {}
      }
    },
    methods: {
      slugify
    },
    computed: {
      hasExamples () {
        return Array.isArray(this.example)
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
    created () {
      Vue.use(this.component.name, this.component)
      let comp = {}
      comp[this.component.name] = this.component
      if (this.hasExamples) {
        this.example.forEach((ex) => {
          let c = {
            template: ex.markup,
            data () {
              return ex.props
            },
            methods: ex.methods,
            components: comp
          }
          this.exampleList.push(c)
        })
      }
      this.activeComp = this.exampleList[1]
    }
  }
</script>