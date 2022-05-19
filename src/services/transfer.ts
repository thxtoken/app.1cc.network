import { Contract } from 'web3-eth-contract'
import { floor, toArray } from 'lodash'
import { Modal } from 'antd'

import { TransferStatus, TransferType } from '@/types/transfer'
import { ContractClaimTokensParams } from '@/types/contract'

import HTTP from './http'
import { me } from './auth'
import { withdrawContract } from './contract'

import web3 from './web3'
import i18next from 'i18next'

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

export async function estimateGas(contract: Contract) {
  const address = me()?.address as string
  const params = await fetchTransferSignature(address, 0)

  try {
    return await contract.methods.claimTokens(...toArray(params)).estimateGas()
  } catch (error) {
    console.log('[ContractService] estimateGas', error)
    return 0
  }
}

export async function getEstimateGas() {
  const contract = await withdrawContract()
  const gas = await estimateGas(contract)
  return gas
}

export async function getGas() {
  const block = await web3.eth.getBlock('latest')
  return floor(block.gasLimit / block.transactions.length)
}

export async function getGasFee() {
  try {
    const gas = await getGas()
    const gasPrice = await web3.eth.getGasPrice()
    const fee = web3.utils.fromWei(web3.utils.toBN(gas).mul(web3.utils.toBN(gasPrice)))
    return fee
  } catch (error) {
    console.error('[TransferService] getGasFee', error)
    return '0'
  }
}

async function fetchUnclaimedTransfers() {
  const params = { statuses: TransferStatus.Unclaimed }
  const response = await HTTP.get('transfers', { params })
  return response.data.transfers as TransferType[]
}

export async function fetchUnclaimedTransfer() {
  const transfers = await fetchUnclaimedTransfers()

  if (transfers.length) {
    return transfers[0]
  }

  return null
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
