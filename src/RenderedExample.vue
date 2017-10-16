<template>
  <div class="elucidate-preview">
    <keep-alive>
      <component :is="component"></component>
    </keep-alive>
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
