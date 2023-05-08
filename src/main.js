import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'

Vue.config.productionTip = false

console.log(123123, process.env)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
