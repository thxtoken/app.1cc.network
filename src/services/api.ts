import { BubbleType } from '@/types/bubble'
import { ContractType } from '@/types/contract'

import HTTP from './http'
import { formatBubble } from './format'

export async function fetchBubbles(address?: string, params: any = {}): Promise<BubbleType[]> {
  if (!address) {
    return []
  }

  try {
    const response = await HTTP.get('bubbles', {
      params: {
        address,
        page: 1,
        per_page: 10,
        ...params
      }
    })
    return response.data.bubbles.map(formatBubble)
  } catch (error) {
    return []
  }
}

export async function fetchUser(id: string | number) {
  const isHashAddress = id.toString().startsWith('0x')
  const api = isHashAddress ? `users/address/${id}` : `users/${id}`
  const response = await HTTP.get(api)
  return response.data.user
}

export async function fetchContract(name: string) {
  const response = await HTTP.get(`/contracts/${name}`)
  return response.data.contract as ContractType
}
