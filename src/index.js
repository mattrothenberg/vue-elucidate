import Vue from 'vue'
import Elucidate from './Elucidate.vue'

const Plugin = {
  install(Vue, options) {
    Vue.component('Elucidate', Elucidate)
  }
}

export default Plugin