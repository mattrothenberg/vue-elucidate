<template>
  <div>
    <!-- <select v-model="selectedComponent">
      <option v-for="(ex, index) in examples" :key="index" :value="ex.name">
        {{ ex }}
      </option>
    </select> -->
    <div class="preview">
      <component :is="component"></component>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'rendered-example',
    props: {
      examples: {
        type: null,
        required: true
      },
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
