<template>
  <div>
    <h1>Hello</h1>
    <elucidate :markup="buttonMarkup" :component="comp"></elucidate>
  </div>
</template>

<script>
  import CustomButton from './CustomButton.vue'
  export default {
    name: 'app',
    data () {
      return {
        comp: CustomButton,
        buttonMarkup: `<custom-button variant="primary" size="small">Press Me!</custom-button>`,
        button: '<button>Press Me</button>'
      }
    }
  }
</script>

<style>
  @import './theme.css';

  body {
    font-family: 'Helvetica'
  }

</style>
