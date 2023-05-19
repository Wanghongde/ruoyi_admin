import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import RightToolBar from '@/components/RightToolBar'
import { resetForm, addDateRange } from '@/utlis/tools'
import '@/assets/icons'
import '@/permission'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('RightToolBar', RightToolBar)

Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
