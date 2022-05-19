import { Modal } from 'antd'

import StorageKeys from '@/libs/StorageKeys'
import { WEB3_PROVIDERS } from '@/types/web3'

import Storage from './storage'
import { fetchContract } from './api'

import i18next from 'i18next'

interface TokenType {
  address: string // 0xd00981105e61274c8a5cd5a88fe7e037d935b513
  symbol: string // 1CC
  decimals: number // 18
  image: string // http://placekitten.com/200/300
}

export async function addTokenToWallet(token: TokenType) {
  return new Promise(async resolve => {
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: token
        }
      })

      resolve(wasAdded)
      wasAdded && console.log('[1CC Token] Thanks for your interest!')
    } catch (error) {
      console.error('[TokenService] addTokenToWallet error: ', error)
      resolve(false)
    }
  })
}

export async function addOneCCTokenToWallet() {
  const contract = await fetchContract('onecc')
  addTokenToWallet({
    address: contract.address,
    symbol: '1CC',
    decimals: 18,
    image: process.env.REACT_APP_LOGO_URL || ''
  })
}

export async function confirmAddTokenToWallet() {
  const t = i18next.t
  const wallet = Storage.get(StorageKeys.WEB3_PROVIDER)

  if (wallet === WEB3_PROVIDERS.WALLETCONNECT) {
    return true
  }

  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: t('confirm.add_token_confirm_title'),
      content: t('confirm.add_token_confirm_message'),
      centered: true,
      okText: t('confirm.add_token_confirm_ok'),
      onCancel: () => resolve(true),
      onOk: async () => {
        await addOneCCTokenToWallet()
        resolve('OK')
      }
    })
  })
}
