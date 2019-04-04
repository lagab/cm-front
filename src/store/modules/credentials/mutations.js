export const Types = {
  REMEMBER_ME: 'REMEMBER_ME',
  REQUEST_SIGNUP: 'REQUEST_SIGNUP',
  SUCCESS_SIGNUP: 'SUCCESS_SIGNUP',
  ERROR_SIGNUP: 'ERROR_SIGNUP',
  REQUEST_LOGIN: 'REQUEST_LOGIN',
  SUCCESS_LOGIN: 'SUCCESS_LOGIN',
  ERROR_LOGIN: 'ERROR_LOGIN',
  BEARER: 'BEARER'
}
export default {
  [Types.REQUEST_SIGNUP] (state) {
    Object.assign(state, {
      isSigningUp: true
    })
  },
  [Types.SUCCESS_SIGNUP] (state) {
    Object.assign(state, {
      isSigningUp: false,
      errorSigningUp: false
    })
  },
  [Types.ERROR_SIGNUP] (state) {
    Object.assign(state, {
      isSigningUp: false,
      errorSigningUp: true
    })
  },
  [Types.REQUEST_LOGIN] (state) {
    Object.assign(state, {
      isConnecting: true
    })
  },
  [Types.SUCCESS_LOGIN] (state, { username }) {
    Object.assign(state, {
      isConnecting: false,
      errorConnecting: false,
      username
    })
  },
  [Types.ERROR_LOGIN] (state) {
    Object.assign(state, {
      isConnecting: false,
      errorConnecting: true
    })
  },
  [Types.BEARER] (state, { bearer }) {
    Object.assign(state, { bearer })
  }
}
