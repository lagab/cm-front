import Vue from 'vue'
import './plugins/vuetify'
import Plugins from './plugins'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(Plugins)

// Subscribe to store updates
store.subscribe((mutation, state) => {
  const { drawer, locale, credentials, dashboard } = { ...state }

  localStorage.setItem('state', JSON.stringify({
    drawer,
    locale,
    credentials,
    dashboard
  }))
})

new Vue({
  router,
  store,
  i18n,
  beforeCreate () {
    this.$store.commit('initializeStore')
  },
  render: h => h(App)
}).$mount('#app')
