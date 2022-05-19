import { Resolution } from 'denames'

import { isValidAddress, isValidENS } from '@/services/validate'

import web3 from './web3'

const EnsResolution = new Resolution({
  sourceConfig: {
    das: {
      url: process.env.REACT_APP_DAS_INDEXER_URL as string,
      network: 'mainnet'
    }
  }
})

async function resolveDomain(domain: string, currency: string = 'ETH') {
  try {
    const records = await EnsResolution.addrList(domain, currency)
    console.log('[ENS] resolveDomain', domain, records)
    if (records.length > 0) {
      return records[0].value
    }
    return null
  } catch (error) {
    console.error('[ENS] resolveDomain', error)
  }
}

export async function getEnsAddress(address: string) {
  const result = await web3.eth.ens.getAddress(address)
  return result
}

export async function getEthereumAddress(address: string) {
  if (!isValidAddress(address)) {
    return null
  }

  if (isValidENS(address)) {
    return await resolveDomain(address)
  }

  return address
}
