import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './store/mutations'
import actions from './store/actions'

// Modules
import credentials from './store/modules/credentials'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locale: 'fr',
    drawer: false,
    notification: ''
  },
  modules: {
    credentials
  },
  mutations,
  actions
})
