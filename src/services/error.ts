import { message, Modal } from 'antd'

import { capitalizeFirstLetter } from '@/libs/utlis'

const confirm = (content: string, alert = true) => {
  const text = capitalizeFirstLetter(content)

  if (alert) {
    return Modal.error({
      content: text,
      cancelText: null
    })
  }

  message.destroy()
  message.error(text)
}

function requestErrorHandler(error: any, message: string) {
  if (error?.response) {
    const msg = error.response?.data?.message || message
    throw new Error(msg)
  } else if (error?.request) {
    throw new Error('网络异常，请重试')
  } else {
    throw new Error('[未知错误]' + message)
  }
}

function requestErrorHandlerPromise(error: any, message: string) {
  if (error?.response) {
    const msg = error.response?.data?.message || message
    return Promise.reject(msg)
  } else if (error?.request) {
    return Promise.reject('网络异常，请重试')
  } else {
    return Promise.reject('[未知错误]' + message)
  }
}

function requestErrorHandlerAlert(error: any, message: string, alert = true) {
  if (error?.response) {
    const msg = error.response?.data?.message || message
    return confirm(msg, alert)
  } else if (error?.request) {
    return confirm('网络异常，请重试', alert)
  } else {
    return confirm('[未知错误]' + message, alert)
  }
}

export { requestErrorHandler, requestErrorHandlerPromise, requestErrorHandlerAlert }
