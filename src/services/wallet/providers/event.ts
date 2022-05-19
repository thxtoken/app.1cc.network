import { message } from 'antd'

import StorageKeys from '@/libs/StorageKeys'
import Storage from '@/services/storage'
import { ProviderConnectInfo, ProviderMessage, ProviderRpcError } from '@/types/provider'

import i18next from 'i18next'

// Subscribe to accounts change
function onAccountsChanged(accounts: string[]) {
  console.log('[WalletConnectProvider] onAccountsChanged', accounts)
}

// Subscribe to chainId change
function onChainChanged(chainId: number) {
  console.log('[WalletConnectProvider] onChainChanged', chainId)
  message.info(i18next.t('message.wallet_chain_changed'))
}

// Subscribe to session connection
function onConnect(connectInfo: ProviderConnectInfo) {
  console.log('[WalletConnectProvider] onConnect', connectInfo)
}

// Subscribe to session disconnection
function onDisconnect(error: ProviderRpcError) {
  console.log('[WalletConnectProvider] onDisconnect', error)
  Storage.remove(StorageKeys.WEB3_PROVIDER)
  message.info(i18next.t('message.wallet_chain_changed'))
}

// Subscribe to session disconnection
function onMessage(message: ProviderMessage) {
  console.log('[WalletConnectProvider] onMessage', message)
}

export function registerProviderEvent(provider: any) {
  if (provider) {
    provider.on('accountsChanged', onAccountsChanged)
    provider.on('chainChanged', onChainChanged)
    provider.on('connect', onConnect)
    provider.on('disconnect', onDisconnect)
    provider.on('message', onMessage)
  }
}
