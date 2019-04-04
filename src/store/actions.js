import { Types } from './mutations'

export default {
  async setLocale ({ commit }, locale) {
    commit(Types.LOCALE, locale)
  },
  async toggleNavigation ({ commit, state }) {
    commit(Types.DRAWER, !state.drawer)
  },
  async notify ({ dispatch, commit }, message) {
    return dispatch('clearNotification').then(() => {
      commit(Types.NOTIFY, message)
    })
  },
  async clearNotification ({ commit }) {
    commit(Types.CLEAR_NOTIFICATION)
  }
}
