import { UserType } from './user'

export type BubbleType = {
  id: string
  userId: string
  address: string
  transactionHash: string
  remainingTokens: number
  gasFees: string
  latestBubbleCollection: number | null
  ripenedAt: string
  createdAt: string
  updatedAt: string
  stealable: boolean
  disappearedCountdown: string
  ripenedCountdown: string
  ttl: number
  show: boolean
  xy: string
  x: string
  y: string
}

export type BubbleRankingItemType = {
  id: string
  userId: string
  address: string
  ranking: number
  stealable: false
  transactionsCount: number
  user?: UserType
  targetDate: string
  createdAt: string
  updatedAt: string
}

export type BubbleCollectionType = {
  id: number
  userId: number
  bubbleId: number
  bubbleUserId: number
  tokens: number
  type: number // 1 = 收取（自己）, 2 = 偷取（他人）
  createdAt: string
  updatedAt: string
  user: UserType | null
}

export type BubbleRecordType = {
  id: string
  userId: string
  intentId: string
  intentType: number
  status: number
  tokens: number
  createdAt: string
  updatedAt: string
}
