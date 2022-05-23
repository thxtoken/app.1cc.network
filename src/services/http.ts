import axios from 'axios'
import { message } from 'antd'

import Storage from './storage'
import { isLogin, logout } from './auth'

export const getHttpClient = () => {
  const client = axios.create()

  client.defaults.baseURL = process.env.REACT_APP_API_URL
  client.defaults.headers.post['Content-Type'] = 'application/json'

  client.defaults.headers.common = {
    Accept: 'application/json',
    Language: Storage.get('language') || 'en_us'
  }

  if (isLogin()) {
    client.defaults.headers.common['Authorization'] = `bearer ${Storage.get('token')}`
  }

  // Add a response interceptor
  client.interceptors.response.use(
    response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data, status, headers } = error.response

        // Request error
        if (status === 422) {
          const errors = data.errors
          if (errors) {
            const firstError = errors[Object.keys(errors)[0]][0]
            message.error(firstError)
          }
        }

        // Unauthenticated
        if (status === 401) {
          logout()
        }

        // Server error
        if (status >= 500) {
          message.error(status + ' Internal Server Error')
        }

        console.log(status, data, headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        message.error('服务器无响应')
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }

      return Promise.reject(error)
    }
  )

  return client
}

let HTTP = getHttpClient()

export function resetHttpClient() {
  HTTP = getHttpClient()
}

export default HTTP
