import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: {
    isConnecting: false,
    errorConnecting: false,
    isSigningUp: false,
    errorSigningUp: false,
    username: '',
    bearer: null
  },
  mutations,
  getters,
  actions
}
