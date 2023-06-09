import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import permission from './modules/permission'
import tagsview from './modules/tagsview'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    permission,
    app,
    tagsview
  }
})
