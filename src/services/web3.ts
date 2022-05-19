import Web3 from 'web3'

const web3 = new Web3()

export function openInEtherscan(address: string) {
  window.open(`https://etherscan.io/address/${address}`)
}

export default web3
