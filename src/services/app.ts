import packageInfo from '@/../package.json'
import store from '@/store'
import { getWeb3Provider } from '@/services/wallet/providers'

import Storage from './storage'
import storage from './storage'
import { addressLogin, logout, syncUser } from './auth'

import web3 from './web3'

export function init() {
  document.getElementById('preload')?.remove()

  // Sync user
  const user = Storage.get('user')
  user && (store.user = user)
  syncUser()

  // Web3 provider
  getWeb3Provider().then(web3.setProvider)

  window.app = {
    debug: false,
    version: packageInfo.version,
    web3,
    storage: storage,
    store: store,
    login: addressLogin,
    logout: logout,
    navigate: () => {}
  }
}
