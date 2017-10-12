<template>
  <div>
    <select @change="handleChange">
      <option v-for="(name, index) in names" :key="index" :value="name">
        {{ name }}
      </option>
    </select>
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
      names: {
        type: Array
      },
      component: {
        type: null,
        required: true
      }
    },
    methods: {
      handleChange (e) {
        this.$emit('example-change', e.target.value)
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
