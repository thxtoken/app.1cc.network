export enum TransferTextStatus {
  Waiting = 'status_waiting',
  WaitingSign = 'status_waiting_sign',
  Tranferring = 'status_tranferring',
  Cancel = 'status_cancel',
  Sent = 'status_sent',
  Success = 'status_success',
  Failed = 'status_failed'
}

export enum TransferStatus {
  Unclaimed = 1,
  Success = 2,
  Failed = 3
}

export type TransferType = {
  id: string
  userId: string
  toAddress: string
  tokens: number
  status: TransferStatus
  transactionHash: string
  createdAt: string
  updatedAt: string
  signature: string
}
