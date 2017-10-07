<template>
  <pre><code class="language-markup" v-html="highlightedCode"></code></pre>
</template>

<script>
  import Prism from 'prismjs'

  export default {
    name: 'code-snippet',
    props: {
      code: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        highlightedCode: ''
      }
    },
    mounted () {
      this.highlightedCode = Prism.highlight(this.code, Prism.languages.markup)
    }
  }
</script>