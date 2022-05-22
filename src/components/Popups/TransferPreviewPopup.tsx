import React from 'react'
import { useTranslation } from 'react-i18next'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { toArray } from 'lodash'
import { ContractSendMethod } from 'web3-eth-contract'
import { useStateIfMounted } from 'use-state-if-mounted'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useGasPrice, useMe } from '@/libs/hooks'
import { TransferTextStatus, TransferType } from '@/types/transfer'
import {
  confirmTransfer,
  fetchTransferSignature,
  getClaimTokensParamsFromTransfer,
  updateTransfer
} from '@/services/transfer'
import { withdrawContract } from '@/services/contract'
import { onTransactionError, onTransactionHash, onTransactionReceipt } from '@/services/transaction'
import { syncUser } from '@/services/auth'
import { confirmAddTokenToWallet } from '@/services/token'
import { checkEthNetwork } from '@/services/wallet'

import Button from '../Button'
import { Dialog } from '../DialogProvider'

interface TransferPreviewProps {
  address: string
  amount: number
  transfer?: TransferType
  onClose?: () => void
}

const TransferPreviewDialog: React.FC<TransferPreviewProps> = ({
  address,
  amount,
  transfer,
  onClose = Dialog.close
}) => {
  const { t } = useTranslation()
  const user = useMe()
  const gwei = useGasPrice()
  const [status, setStatus] = useStateIfMounted(TransferTextStatus.Waiting)
  const [loading, setLoading] = useStateIfMounted(false)
  const [transactionHash, setTransactionHash] = useStateIfMounted('')
  const waiting = status === TransferTextStatus.Waiting

  if (!user) {
    return null
  }

  const onTransactionHashEvent = async (hash: string, transferId: string) => {
    onTransactionHash(hash)

    try {
      await updateTransfer(transferId, hash)
    } catch (error) {
      console.error('[TransferPreviewPopup] onTransactionHashEvent', error)
      setStatus(TransferTextStatus.Failed)
      setLoading(false)
      return
    }

    setStatus(TransferTextStatus.Sent)
    setTransactionHash(hash)
    setLoading(false)
    syncUser()
    confirmAddTokenToWallet()
  }

  const onTransfer = async () => {
    if (!user) {
      return null
    }

    if (!transfer) {
      try {
        await confirmTransfer()
      } catch (error) {
        return
      }
    }

    setLoading(true)

    try {
      await checkEthNetwork()
    } catch (error) {
      setLoading(false)
      return
    }

    setStatus(TransferTextStatus.WaitingSign)

    try {
      const claimTokensParams = transfer
        ? getClaimTokensParamsFromTransfer(transfer)
        : await fetchTransferSignature(address, amount)

      const transferId = claimTokensParams.nonce

      setStatus(TransferTextStatus.Tranferring)

      const contract = await withdrawContract()
      const claimTokens = contract.methods.claimTokens(
        ...toArray(claimTokensParams)
      ) as ContractSendMethod

      await claimTokens
        .send({ from: user.address })
        .on('transactionHash', (hash: string) => onTransactionHashEvent(hash, transferId))
        .on('receipt', onTransactionReceipt)

      setStatus(TransferTextStatus.Success)
    } catch (error: any) {
      onTransactionError(error)
      setLoading(false)
      if (error?.code === 4001) {
        setStatus(TransferTextStatus.Cancel)
      } else {
        setStatus(TransferTextStatus.Failed)
      }
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('transfer.title_preview')}</h1>
      <section>
        <label style={styles.label}>{t('transfer.address_label')}</label>
        <div style={{ ...styles.value, fontSize: scale(17) }}>{address}</div>
      </section>
      <section>
        <label style={styles.label}>{t('transfer.amount_label')}</label>
        <div style={styles.value}>
          <span style={styles.valueText}>{amount}</span>
          <span style={styles.currencySymbol}>1CC</span>
        </div>
      </section>
      <section>
        <label style={styles.label}>{t('transfer.gas_label')}</label>
        <div className="row">
          <div style={styles.value}>
            {gwei === 0 && <Loading />}
            {gwei !== 0 && (
              <a
                href="https://etherchain.org/tools/gasnow"
                target="_blank"
                rel="noreferrer"
                style={styles.link}>
                <span style={styles.valueText}>{gwei}</span>
                <span style={styles.currencySymbol}>Gwei</span>
              </a>
            )}
          </div>
        </div>
      </section>
      <section>
        <label style={styles.label}>{t('transfer.status_label')}</label>
        <div style={{ ...styles.value, justifyContent: 'space-between' }}>
          <span
            style={StyleSheet.flatten([
              styles.valueText,
              status === TransferTextStatus.Failed && styles.success,
              status === TransferTextStatus.Failed && styles.error
            ])}>
            {t(`transfer.${status}`)}
          </span>
          {transactionHash && (
            <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noreferrer">
              {t('transfer.view_on_etherscan')}
            </a>
          )}
          {loading && <Loading />}
        </div>
      </section>
      <Button
        width={500}
        height={52}
        title={waiting ? t('transfer.button_transfer') : t('transfer.button_close')}
        borderRadius={10}
        style={styles.button}
        titleStyle={styles.buttonTitle}
        onClick={waiting ? onTransfer : onClose}
        disabled={loading}
      />
    </div>
  )
}

const Loading = () => {
  return (
    <Spin style={styles.loading} indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: scale(580)
  },
  body: {
    backgroundColor: '#1B1E26',
    padding: scale(30)
  },
  title: {
    fontSize: scale(28)
  },
  label: {
    fontSize: scale(18),
    lineHeight: scale(22),
    marginTop: scale(30),
    color: '#FFF',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#212429',
    borderColor: '#212429',
    marginTop: scale(40)
  },
  buttonTitle: {
    fontSize: scale(16),
    lineHeight: scale(24),
    color: 'white',
    fontWeight: 'bold'
  },
  value: {
    fontSize: scale(20),
    lineHeight: scale(30),
    marginTop: scale(20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  valueText: {
    marginRight: scale(5)
  },
  currencySymbol: {
    color: '#1ADEED',
    fontWeight: 'bold'
  },
  loading: {
    marginLeft: scale(10)
  },
  success: {
    color: '#52c41a'
  },
  error: {
    color: '#ff4d4f'
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white'
  }
})

const TransferPreviewPopup = {
  show: (props: TransferPreviewProps) => {
    return Dialog.open({
      children: <TransferPreviewDialog {...props} />,
      width: scale(560),
      bodyStyle: styles.body
    })
  }
}

export default TransferPreviewPopup
