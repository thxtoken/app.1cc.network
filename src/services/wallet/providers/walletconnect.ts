import WalletConnectProvider from '@walletconnect/web3-provider'
import { message } from 'antd'

import { getAccounts } from '..'
import { registerProviderEvent } from './event'

import web3 from '@/services/web3'
import i18next from 'i18next'

export async function getWalletConnectProvider(): Promise<WalletConnectProvider> {
  if (web3.currentProvider) {
    return web3.currentProvider as any
  }

  const provider = new WalletConnectProvider({
    infuraId: process.env.REACT_APP_INFURA_ID,
    pollingInterval: 1000000000
  })

  const accounts = await provider.enable()

  console.log('[WalletConnectProvider] ProviderEnable', accounts)

  registerProviderEvent(provider)

  return provider
}

export async function connectWalletConnect() {
  const provider = await getWalletConnectProvider()
  web3.setProvider(provider as any)

  const accounts = await getAccounts()
  const account = accounts[0]

  if (!account) {
    const errorMsg = `WalletConnect ${i18next.t('wallet.is_not_connected')}`
    message.error(errorMsg)
    return Promise.reject(errorMsg)
  }

  return account
}
