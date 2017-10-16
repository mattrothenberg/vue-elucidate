import Vue from 'vue'
import Elucidate from './Elucidate.vue'
import './style.css'

const plugin = {
  install(Vue, options) {
    Vue.component('Elucidate', Elucidate)
  }
}

export default plugin