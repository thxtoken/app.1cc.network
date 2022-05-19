import StorageKeys from '@/libs/StorageKeys'

import { fetchContract } from './api'
import { MemoryStorage } from './storage'

import web3 from './web3'

export async function withdrawContract() {
  const cachedContract = MemoryStorage.get(StorageKeys.WITHDRAW_CONTRACT)

  if (cachedContract) {
    return cachedContract
  }

  try {
    const { abi, address } = await fetchContract('withdraw')
    const contract = new web3.eth.Contract(JSON.parse(abi), address)
    MemoryStorage.set(StorageKeys.WITHDRAW_CONTRACT, contract)
    return contract
  } catch (error) {
    console.log('[ContraceService] withdrawContract', error)
    throw new Error('Withdraw contract null')
  }
}
