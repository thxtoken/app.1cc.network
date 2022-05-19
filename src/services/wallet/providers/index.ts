import StorageKeys from '@/libs/StorageKeys'
import Storage from '@/services/storage'
import { WEB3_PROVIDERS } from '@/types/web3'

import { getCoinbaseProvider } from './coinbase'
import { getMetaMaskProvider } from './metamask'
import { getWalletConnectProvider } from './walletconnect'

import web3 from '@/services/web3'

export async function getWeb3Provider(): Promise<any> {
  const provider = Storage.get(StorageKeys.WEB3_PROVIDER)

  if (provider === WEB3_PROVIDERS.METAMASK) {
    return await getMetaMaskProvider()
  }

  if (provider === WEB3_PROVIDERS.WALLETCONNECT) {
    return await getWalletConnectProvider()
  }

  if (provider === WEB3_PROVIDERS.COINBASE) {
    return await getCoinbaseProvider()
  }

  return null
}

export async function getConnectedWeb3Provider(): Promise<any> {
  return null
}

export function isWeb3ProviderConnected() {
  return Boolean(web3?.givenProvider?.isConnected())
}
