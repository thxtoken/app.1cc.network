import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { message } from 'antd'

import { getAccounts } from '..'
import { registerProviderEvent } from './event'

import web3 from '@/services/web3'
import i18next from 'i18next'

export async function getCoinbaseProvider() {
  if (web3.currentProvider) {
    return web3.currentProvider
  }

  const { REACT_APP_NAME, REACT_APP_LOGO_URL, REACT_APP_DEFAULT_ETH_JSONRPC_URL } = process.env
  const DEFAULT_CHAIN_ID = 1

  // Initialize Coinbase Wallet SDK
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: REACT_APP_NAME as string,
    appLogoUrl: REACT_APP_LOGO_URL,
    darkMode: false
  })

  // Initialize a Web3 Provider object
  const provider = coinbaseWallet.makeWeb3Provider(
    REACT_APP_DEFAULT_ETH_JSONRPC_URL,
    DEFAULT_CHAIN_ID
  )

  registerProviderEvent(provider)

  return provider
}

export async function connectCoinbaseWallet() {
  const provider = await getCoinbaseProvider()
  web3.setProvider(provider)

  const accounts = await getAccounts()
  const account = accounts[0]

  if (!account) {
    const errorMsg = `Coinbase ${i18next.t('wallet.is_not_connected')}`
    message.error(errorMsg)
    return Promise.reject(errorMsg)
  }

  return account
}
