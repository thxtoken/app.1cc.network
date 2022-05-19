import { random } from 'lodash'

import web3 from './web3'

export async function fakeTransferSignature(address: string, amount: number) {
  const praviteKey = '41c58849cdf2a73456f962ab0161c13c25551da67fb1226b2f77b12c0eea759c'
  const tokens = web3.utils.toWei(amount.toString(), 'ether')
  const nonce = random(100000, 100000000).toString()

  const types = ['address', 'uint256', 'uint256']
  const values = [address, tokens, nonce]
  const data = web3.utils.keccak256(web3.eth.abi.encodeParameters(types, values))
  const signature = web3.eth.accounts.sign(data, praviteKey).signature

  return { address, tokens, nonce, signature }
}
