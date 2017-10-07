import Vue from 'vue'
import App from './App.vue'
import Elucidate from 'plugin'
// import CustomButton from './CustomButton.vue'
// Vue.component(CustomButton.name, CustomButton)
Vue.use(Elucidate)

new Vue({
  el: '#app',
  render: h => h(App)
})
