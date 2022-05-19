import { notification } from 'antd'
import { TransactionReceipt } from 'web3-core'

import { syncUser } from './auth'

import i18next from 'i18next'

export async function onTransactionHash(hash: string) {
  console.log('[TransactionService] onTransactionHash', hash)
}

export async function onTransactionReceipt(receipt: TransactionReceipt) {
  console.log('[TransactionService] onTransactionReceipt', receipt)

  notification.success({
    message: i18next.t('transaction.transaction_success_title'),
    description: i18next.t('transaction.transaction_success_message'),
    duration: 0
  })

  syncUser()
}

export async function onTransactionError(error: Error) {
  console.log('[TransactionService] onTransactionError', error)

  notification.error({
    message: i18next.t('transaction.transaction_failed_title'),
    description: error.message,
    duration: 0
  })
}
