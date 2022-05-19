import detectEthereumProvider from '@metamask/detect-provider'
import { message } from 'antd'

import { getAccounts } from '..'
import { registerProviderEvent } from './event'

import web3 from '@/services/web3'
import i18next from 'i18next'

export const isMetaMaskInstalled = () => {
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

export async function getMetaMaskProvider() {
  if (web3.currentProvider) {
    return web3.currentProvider
  }

  const provider: any = await detectEthereumProvider()

  registerProviderEvent(provider)

  return provider
}

export async function connectMetaMask() {
  const provider: any = await getMetaMaskProvider()
  web3.setProvider(provider)

  if (!isMetaMaskInstalled()) {
    const errorMsg = i18next.t('wallet.wallet_not_installed', { wallet: 'MetaMask' })
    message.error(errorMsg)
    return Promise.reject(errorMsg)
  }

  const accounts = await getAccounts()
  const account = accounts[0]

  if (!account) {
    const errorMsg = `MetaMask ${i18next.t('wallet.is_not_connected')}`
    message.error(errorMsg)
    return Promise.reject(errorMsg)
  }

  return account
}
