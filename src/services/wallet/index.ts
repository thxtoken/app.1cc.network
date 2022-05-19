import { toLower } from 'lodash'
import { Modal } from 'antd'

import ConnectWalletPopup from '@/components/Popups/ConnectWalletPopup'
import StorageKeys from '@/libs/StorageKeys'
import { isLogin, me } from '@/services/auth'

import Storage from '../storage'

import web3 from '@/services/web3'
import i18next from 'i18next'

export async function getAccounts() {
  const connectedAccounts = await web3.eth.getAccounts()

  if (connectedAccounts.length) {
    console.log('[WalletService] getAccounts connectedAccounts', connectedAccounts)
    return connectedAccounts
  }

  const accounts = await web3.eth.requestAccounts()
  console.log('[WalletService] getAccounts requestAccounts', accounts)

  return accounts
}

export async function isWalletConnected() {
  const user = me()

  if (!user) {
    return false
  }

  try {
    let connectedAccounts = await web3.eth.getAccounts()
    connectedAccounts = connectedAccounts.map(toLower)
    if (connectedAccounts.includes(toLower(user.address))) {
      return true
    }
  } catch (error) {
    return false
  }

  return false
}

export async function connectWallet() {
  const connected = await isWalletConnected()
  if (!connected) {
    const { wallet, account } = await ConnectWalletPopup.show()
    isLogin() && Storage.set(StorageKeys.WEB3_PROVIDER, wallet)
    return { wallet, account }
  }
}

export async function disconnectWallet() {
  const provider: any = web3.currentProvider

  if (provider && provider.disconnect) {
    provider.disconnect()
  }

  web3.setProvider(null)

  Storage.remove(StorageKeys.WEB3_PROVIDER)
}

export async function checkEthNetwork() {
  const t = i18next.t
  const supportedNetworks = ['main', 'ropsten']
  const network = await web3.eth.net.getNetworkType()
  if (!supportedNetworks.includes(network)) {
    Modal.warning({
      title: t('warning.network_type_switch_warning_title'),
      content: t('warning.network_type_switch_warning_message'),
      centered: true
    })
    return Promise.reject(new Error('Network not supported'))
  }
}
