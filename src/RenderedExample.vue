<template>
  <div>
    <div class="preview">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'rendered-example',
    props: {
      component: {
        type: null,
        required: true
      }
    }
  }
</script>

<style>
  .preview {
    background: #f4f5fa;
    border-radius: .5rem;
    padding: 1rem;
    margin-bottom: 1rem;
  }
</style>
