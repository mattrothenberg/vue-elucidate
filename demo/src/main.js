import Vue from 'vue'
import App from './App.vue'
import Elucidate from 'plugin'
Vue.use(Elucidate)

new Vue({
  el: '#app',
  render: h => h(App)
})
