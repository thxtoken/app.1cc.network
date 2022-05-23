import { message, Modal } from 'antd'

import ConnectWalletPopup from '@/components/Popups/ConnectWalletPopup'
import StorageKeys from '@/libs/StorageKeys'
import store from '@/store'
import { PostLoginResponse } from '@/types/api'
import { UserType } from '@/types/user'
import { disconnectWallet } from '@/services/wallet'

import EventEmitter from './event'
import HTTP, { resetHttpClient } from './http'
import Storage, { MemoryStorage } from './storage'
import { fetchUser } from './api'
import { requestErrorHandlerAlert } from './error'

import web3 from './web3'
import i18next from 'i18next'
const { confirm } = Modal

export async function walletLogin() {
  if (store.user) {
    return store.user
  }

  const { wallet, account } = await ConnectWalletPopup.show()

  try {
    message.loading({ content: i18next.t('message.waiting_for_signature'), key: 'login' })
    const msg = await fetchSignatureMessage(account)
    const signature = await getSignature(account, msg)
    message.loading({ content: i18next.t('message.verifying_signature'), key: 'login' })
    const user = await signatureAuth(account, signature, msg)
    Storage.set(StorageKeys.WEB3_PROVIDER, wallet)
    message.success({ content: i18next.t('message.login_success'), key: 'login', duration: 1 })
    return user
  } catch (error: any) {
    message.destroy()
    console.error('[AuthService] walletLogin', error, error.message)
    if (error?.code !== 4001) {
      requestErrorHandlerAlert(error, i18next.t('errors.wallet_login_error'))
    }
    return Promise.reject(error)
  }
}

export async function signatureAuth(address: string, signature: string, message: string) {
  const { data } = await HTTP.post<PostLoginResponse>('login', {
    signature,
    address,
    message
  })

  const { user, token } = data

  Storage.set('token', token)
  Storage.set('user', user)

  HTTP.defaults.headers.common['Authorization'] = `bearer ${token}`

  store.user = user

  EventEmitter.emit('AUTH_LOGIN', user)

  return user
}

async function fetchSignatureMessage(account: string) {
  const response = await HTTP.get('message', { params: { address: account } })
  return response.data.message
}

async function getSignature(account: string, message: string) {
  return await web3.eth.personal.sign(message, account, '')
}

export function isLogin() {
  return Storage.exists('token')
}

export function me() {
  return Storage.get('user')
}

export function isMe(user: UserType | string) {
  if (typeof user === 'object') {
    return user.id === store?.user?.id
  }

  return user === store?.user?.id
}

export async function syncUser() {
  const user = me()
  if (user) {
    const self = await fetchUser(user.id)
    store.user = { ...self }
    Storage.set('user', user)
  }
}

export async function addressLogin(address: string) {
  const message = await fetchSignatureMessage(address)

  const { data } = await HTTP.post<PostLoginResponse>('login', {
    signature: '123456',
    address,
    message
  })

  const { user, token } = data

  Storage.set('token', token)
  Storage.set('user', user)

  HTTP.defaults.headers.common['Authorization'] = `bearer ${token}`

  store.user = user

  EventEmitter.emit('AUTH_LOGIN', user)
}

export function logout() {
  disconnectWallet()
  Storage.clearAll()
  MemoryStorage.clearAll()
  store.user = undefined
  resetHttpClient()
  Modal.destroyAll()
  EventEmitter.emit('AUTH_LOGOUT')
  message.info(i18next.t('message.logout_success'))
}

export function logoutConfirm() {
  return new Promise((resolve, reject) => {
    confirm({
      title: i18next.t('wallet.confirm_disconnect'),
      centered: true,
      onOk: () => {
        logout()
        resolve(true)
      },
      onCancel: () => {
        reject()
      }
    })
  })
}
