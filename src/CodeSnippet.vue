<template>
  <pre class="language-markup"><code>{{code}}</code></pre>
</template>

<script>
  export default {
    name: 'code-snippet',
    props: {
      code: {
        type: String,
        required: true
      }
    }
  }
</script>