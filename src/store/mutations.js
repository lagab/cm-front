export const Types = {
  FETCHING: 'FETCHING',
  LOCALE: 'LOCALE',
  DRAWER: 'DRAWER',
  NOTIFY: 'NOTIFY',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION'
}

export default {
  initializeStore (state) {
    const storedState = localStorage.getItem('state')
    if (storedState) {
      this.replaceState(Object.assign(state, JSON.parse(storedState), { message: '' }))
    }
  },
  [Types.LOCALE] (state, locale) {
    state.locale = locale
  },
  [Types.DRAWER] (state, enable) {
    state.drawer = enable
  },
  [Types.NOTIFY] (state, notification) {
    state.notification = notification
  },
  [Types.CLEAR_NOTIFICATION] (state) {
    state.notification = ''
  }
}
