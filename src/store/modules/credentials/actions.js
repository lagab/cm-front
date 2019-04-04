import { Types } from './mutations'
import api from '@/api'

export default {
  async login ({ dispatch, commit }, { username, password }) {
    commit({
      type: Types.REQUEST_LOGIN,
      message: 'Attempt login'
    })

    return api.post(`/authenticate`, { username, password }).then(res => {
      commit({
        type: Types.SUCCESS_LOGIN,
        message: 'Login success',
        username
      })
      return dispatch('setBearer', res.headers['authorization'])
    }).catch(err => {
      commit({
        type: Types.ERROR_LOGIN,
        message: 'Failed to login'
      })
      return Promise.reject(err)
    })
  },
  async setBearer ({ commit }, bearer) {
    commit({
      type: Types.BEARER,
      message: 'Set bearer',
      bearer
    })
  },
  async removeBearer ({ commit }) {
    commit({
      type: Types.BEARER,
      message: 'Remove bearer',
      bearer: null
    })
  }
}
