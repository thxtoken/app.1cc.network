import { isString } from 'lodash'

import Web3 from 'web3'

export function isValidAddress(address: string) {
  if (!isString(address)) {
    return false
  }

  if (!address.startsWith('0x')) {
    return isValidENS(address)
  }

  return Web3.utils.isAddress(address)
}

export function isValidENS(address: string) {
  const ensNames = ['.eth', '.bit']

  if (!isString(address)) {
    return false
  }

  return ensNames.findIndex(i => address.endsWith(i)) > -1
}
