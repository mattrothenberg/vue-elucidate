<template>
  <div>
    {{ markup }}
  </div>
</template>

<script>
  export default {
    name: 'elucidate',
    props: {
      markup: {
        type: String,
        required: true
      }
    }
  }
</script>