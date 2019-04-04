import axios from 'axios'
import store from '@/store'
import config from '@/config'
import i18n from '@/i18n'

const messageStatus = {
  400: (method, resourceUrl) => i18n.t('httpStatus.400'),
  401: (method, resourceUrl) => i18n.t('httpStatus.401'),
  403: (method, resourceUrl) => i18n.t('httpStatus.403', [method, resourceUrl]),
  404: (method, resourceUrl) => i18n.t('httpStatus.404', [resourceUrl]),
  409: (method, resourceUrl) => i18n.t('httpStatus.409'),
  500: (method, resourceUrl) => i18n.t('httpStatus.500')
}

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 5000
})

api.interceptors.request.use(req => {
  if (req.baseURL === config.apiBaseUrl && store.getters['credentials/isAuthenticated']) {
    req.headers['Authorization'] = store.state.credentials.bearer
  }
  return Promise.resolve(req)
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use(res => {
  if (res.config.baseURL === config.apiBaseUrl && store.getters['credentials/isAuthenticated'] && !!res.headers['authorization']) {
    store.dispatch('credentials/setBearer', res.headers['authorization'])
  }
  return Promise.resolve(res)
}, (error) => {
  const response = error.response
  console.log(response)

  if (response) {
    const status = response.status
    if (status === 401) {
      store.dispatch('credentials/removeBearer')
    }
    if (response.data.message) {
      store.dispatch('notify', response.data.message)
    } else {
      const resourceUrl = response.config.url.substr(response.config.baseURL.length)
      if (messageStatus[status]) {
        store.dispatch('notify', messageStatus[status](response.config.method.toUpperCase(), resourceUrl))
      } else {
        // store.dispatch ('notify', `${status} ${resourceUrl}`)
      }
    }
  } else if (error.code === 'ECONNABORTED') {
    // store.dispatch('notify', i18n.t('request-timeout'))
  }

  return Promise.reject(error)
})

api.sse = function (url) {
  return new Promise((resolve, reject) => {
    try {
      resolve(new EventSource(url.startsWith(config.apiBaseUrl) ? url : config.apiBaseUrl + url, {
        headers: {
          Authorization: store.state.credentials.bearer
        }
      }))
    } catch (e) {
      reject(e)
    }
  })
}

export default api
