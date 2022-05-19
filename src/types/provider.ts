/**
 * https://eips.ethereum.org/EIPS/eip-1193
 */

export interface ProviderConnectInfo {
  readonly chainId: string
}

export interface ProviderRpcError extends Error {
  code: number
  data?: unknown
}

export interface ProviderConnectInfo {
  readonly chainId: string
}

export interface ProviderMessage {
  readonly type: string
  readonly data: unknown
}
