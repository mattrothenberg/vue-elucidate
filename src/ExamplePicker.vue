<template>
  <div class="elucidate-example-picker">
    <label>Example</label>
    <div class="elucidate-select">
      <select @change="handleChange">
        <option v-for="(name, index) in names" :key="index" :value="name">
          {{ name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'example-picker',
    props: {
      names: {
        type: Array
      }
    },
    methods: {
      handleChange (e) {
        this.$emit('example-change', e.target.value)
      }
    }
  }
</script>
