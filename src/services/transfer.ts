import { Modal } from 'antd'

import { TransferStatus, TransferType } from '@/types/transfer'
import { ContractClaimTokensParams } from '@/types/contract'

import HTTP from './http'
import { me } from './auth'

import web3 from './web3'
import i18next from 'i18next'
import { floor } from 'lodash'
import { requestErrorHandlerAlert } from './error'

export async function fetchTransferSignature(address: string, amount: number) {
  try {
    const response = await HTTP.post('transfers', { address, tokens: amount })
    return getClaimTokensParamsFromTransfer(response.data.transfer)
  } catch (error: any) {
    throw new Error(error.response?.data?.message)
  }
}

export function getClaimTokensParamsFromTransfer(transfer: TransferType) {
  const { id, signature, tokens } = transfer
  const address = me()?.address
  const amount = web3.utils.toWei(tokens.toString(), 'ether')
  return { address, amount, nonce: id, signature } as ContractClaimTokensParams
}

export async function updateTransfer(id: number | string, transaction_hash: string) {
  await HTTP.put(`transfers/${id}`, {
    transfer: { id, transaction_hash }
  })
}

export async function getGasFee() {
  try {
    const gasPrice = await web3.eth.getGasPrice()
    const gwei = await web3.utils.fromWei(gasPrice, 'gwei')
    return floor(Number(gwei), 2)
  } catch (error) {
    console.error('[TransferService] getGasFee', error)
    return 0
  }
}

async function fetchUnclaimedTransfers() {
  const params = { statuses: TransferStatus.Unclaimed }
  const response = await HTTP.get('transfers', { params })
  return response.data.transfers as TransferType[]
}

export async function fetchUnclaimedTransfer() {
  try {
    const transfers = await fetchUnclaimedTransfers()

    if (transfers.length) {
      return transfers[0]
    }

    return null
  } catch (error) {
    requestErrorHandlerAlert(error, 'Fetch unclaimed transfer error', true)
    return null
  }
}

export async function confirmUnclaimedTransfer() {
  const t = i18next.t
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: t('confirm.open_transaction_confirm_title'),
      content: t('confirm.open_transaction_confirm_message'),
      centered: true,
      okText: t('confirm.open_transaction_confirm_ok'),
      onCancel: () => reject('Cancelled'),
      onOk: () => resolve('OK')
    })
  })
}

export async function confirmTransfer() {
  const t = i18next.t
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: t('confirm.transfer_cancle_confirm_title'),
      content: t('confirm.transfer_cancle_confirm_message'),
      centered: true,
      okText: t('confirm.transfer_cancle_confirm_ok'),
      onCancel: () => reject('Cancelled'),
      onOk: () => resolve('OK')
    })
  })
}
