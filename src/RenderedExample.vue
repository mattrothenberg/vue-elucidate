<template>
  <div class="preview">
    <div ref="rendered"></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'rendered-example',
    props: {
      example: {
        type: Object,
        required: true
      },
      component: {
        required: true
      }
    },
    created () {
      Vue.component(this.component.name, this.component)
    },
    mounted () {
      let MarkedUp = Vue.extend({
        template: this.example.markup,
        props: this.example.props
      })
      new MarkedUp({ el: this.$refs.rendered })
    }
  }
</script>

<style scoped>
  .preview {
    background: #f4f5fa;
    border-radius: .5rem;
    padding: 1rem;
  }
</style>
