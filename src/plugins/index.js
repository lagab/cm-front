import api from '@/api'
import store from '@/store'

export default {
  install: (Vue, options) => {
    Vue.prototype.$api = api
    Vue.prototype.$notify = (notification) => store.dispatch('notify', notification)
  }
}
