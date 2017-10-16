<template>
  <div class="elucidate-example-picker">
    <label>API</label>
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
    name: 'props-table-picker',
    props: {
      names: Array
    },
    methods: {
      handleChange (e) {
        this.$emit('props-change', e.target.value)
      }
    }
  }
</script>
