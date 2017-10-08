<template>
  <div>
    <!-- <elucidate :markup="buttonMarkup" :component="comp"></elucidate>
    <elucidate :markup="bootstrapBtn" :component="bsComp"></elucidate> -->
    <elucidate :example="datePickerExample" :component="dpComp"></elucidate>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CustomButton from './CustomButton.vue'
  import 'keen-ui/src/bootstrap'
  import UiButton from 'keen-ui/lib/UiButton'
  import UiDatepicker from 'keen-ui/lib/UiDatepicker'

  export default {
    name: 'app',
    data () {
      return {
        comp: CustomButton,
        buttonMarkup: `<custom-button variant="primary" size="small">Press Me!</custom-button>`,
        bootstrapBtn: `<ui-button size="small">Normal</ui-button>`,
        bsComp: UiButton,
        datePickerExample: {
          markup: `<ui-datepicker placeholder="Select a date" v-model="picker1">Your Birthday</ui-datepicker>`,
          props: {
            picker1: null
          }
        },
        dpComp: UiDatepicker
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
