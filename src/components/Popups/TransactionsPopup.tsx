import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { floor } from 'lodash'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useMe } from '@/libs/hooks'
import { BubbleRecordType } from '@/types/bubble'

import AddTokenToWalletButton from '../Buttons/AddTokenToWalletButton'
import TransferButton from '../Buttons/TransferButton'
import SingleList from '../SingleList'
import { Dialog } from '../DialogProvider'

const TransactionsPopup = {
  show: () => {
    Dialog.open({
      children: <TransactionsDialog />,
      width: scale(560)
    })
  }
}

const TransactionsDialog: React.FC = () => {
  const user = useMe()
  const { t } = useTranslation()

  if (!user) {
    return null
  }

  return (
    <div style={styles.container}>
      <section style={styles.account}>
        <div style={styles.group}>
          <div style={styles.title}>{t('transaction.tokens')}</div>
          <div style={styles.row}>
            <div style={styles.tokens}>
              <span style={styles.amount}>{user?.tokens}</span>
              <span style={styles.onecc}>1CC</span>
            </div>
            <TransferButton />
          </div>
          <div className="row">
            <AddTokenToWalletButton />
          </div>
        </div>
      </section>
      <section style={{ ...styles.transactions, minHeight: scale(user.tokens ? 480 : 200) }}>
        <div style={styles.title}>{t('transaction.rencent_transactions')}</div>
        <SingleList
          api="token-records"
          itemView={TransactionItem}
          formatMethod={data => data.tokenRecords}
          perPage={20}
          style={styles.transactionsList}
          emptyView={() => <div style={styles.content}>{t('transaction.no_transactions')}</div>}
        />
      </section>
    </div>
  )
}

interface TransactionItemProps {
  data: BubbleRecordType
}

const TransactionItem: React.FC<TransactionItemProps> = ({ data }) => {
  const { t } = useTranslation()
  const tokens = floor(data.tokens, 8)

  return (
    <div style={styles.transactionItem}>
      <div style={styles.transactionItemHeader}>
        <img
          src={
            [1, 3].includes(data.intentType)
              ? require('@/assets/images/income_icon.png')
              : require('@/assets/images/outgo_icon.png')
          }
          style={styles.transactionItemIcon}
          alt="icon"
        />
        <span style={styles.transactionItemTitle}>
          {data.intentType === 1 && t('transaction.collected_token', { count: tokens })}
          {data.intentType === 2 && t('transaction.transfer_out_token', { count: tokens })}
          {data.intentType === 3 && `${t('transaction.initially_token', { count: tokens })}`}
        </span>
      </div>
      <div style={styles.transactionItemFooter}>
        <span style={styles.transactionItemTime}>{dayjs(data.createdAt).format('YYYY-MM-DD')}</span>
        <span style={styles.transactionItemTime}>{dayjs(data.createdAt).format('HH:mm')}</span>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: '-16px'
  },
  account: {
    padding: `${scale(20)} ${scale(30)}`
  },
  title: {
    marginBottom: scale(5),
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#FFF',
    opacity: 0.6
  },
  amount: {
    color: '#FFF',
    fontSize: scale(26),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'JDZhengHT',
    fontWeight: '600'
  },
  content: {
    color: '#FFF',
    fontSize: scale(18)
  },
  address: {
    cursor: 'pointer'
  },
  group: {
    marginTop: scale(20)
  },
  transactions: {
    backgroundColor: '#1B1E26',
    minHeight: scale(200),
    paddingLeft: 0,
    padding: `${scale(20)} ${scale(30)}`,
    marginTop: scale(-20)
  },
  transactionsList: {
    marginTop: scale(20),
    maxHeight: scale(375),
    overflowY: 'scroll'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tokens: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  onecc: {
    fontSize: scale(18),
    lineHeight: scale(38),
    marginLeft: scale(6),
    opacity: 0.5,
    fontFamily: 'JDZhengHT'
  },
  transactionItem: {
    width: '100%',
    backgroundColor: '#22252D',
    minHeight: scale(80),
    borderRadius: scale(18),
    marginBottom: scale(16),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(24),
    justifyContent: 'space-between'
  },
  transactionItemHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  transactionItemFooter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  transactionItemIcon: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(10)
  },
  transactionItemTitle: {
    fontSize: scale(18),
    lineHeight: scale(24),
    fontWeight: '500'
  },
  transactionItemTime: {
    opacity: '0.4',
    fontSize: scale(15),
    lineHeight: scale(20)
  }
})

export default TransactionsPopup
