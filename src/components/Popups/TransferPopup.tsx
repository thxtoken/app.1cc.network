import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { debounce, isNumber } from 'lodash'
import { Input, InputRef, message } from 'antd'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useGasPrice, useMe } from '@/libs/hooks'
import { addressSummary, delay } from '@/libs/utlis'
import { getEthereumAddress } from '@/services/ens'
import { syncUser } from '@/services/auth'

import Button from '../Button'
import CircleLoading from '../Loading/CircleLoading'
import TransferPreviewPopup from './TransferPreviewPopup'
import { Dialog, DialogInstance } from '../DialogProvider'

const TransferDialog: React.FC = () => {
  const { t } = useTranslation()
  const user = useMe()
  const gwei = useGasPrice()

  const [address, setAddress] = useState(user?.address || '')
  const [amount, setAmount] = useState(0)
  const [addressError, setAddressError] = useState(false)

  const addressInputRef = useRef<InputRef>(null)
  const amountInputRef = useRef<InputRef>(null)

  useEffect(() => {
    setAmount(0)
  }, [user?.tokens])

  useEffect(() => {
    syncUser()
  }, [])

  if (!user) {
    return null
  }

  const onClickNext = async () => {
    message.destroy()

    if (!user) {
      return null
    }

    const validAddress = await getEthereumAddress(address)

    if (!validAddress) {
      setAddressError(true)
      addressInputRef.current?.focus()
      return message.error(t('transfer.address_error'))
    }

    if (!isNumber(amount) || amount <= 0 || amount > user.tokens) {
      amountInputRef.current?.focus()
      return message.error(t('transfer.amount_error'))
    }

    TransferPreviewPopup.show({
      address: validAddress,
      amount,
      onClose: () => TransferPopup.close()
    })

    delay(500).then(() => setAmount(0))
  }

  const onClickNextDebounce = debounce(onClickNext, 2000, { leading: true, trailing: false })

  const onAddressChanged = (value: string) => {
    setAddress(value)
    addressError && setAddressError(false)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('transfer.title')}</h1>
      <section>
        <label style={styles.label}>
          {t('transfer.address_label')}
          <span style={styles.link} onClick={() => setAddress(user.address)}>
            {t('transfer.use')} {addressSummary(user.address)}
          </span>
        </label>
        <Input
          placeholder={t('transfer.address_placeholder')}
          style={styles.input}
          type="text"
          value={address}
          onChange={e => onAddressChanged(e.target.value)}
          maxLength={42}
          spellCheck={false}
          status={addressError ? 'error' : ''}
          ref={addressInputRef}
        />
      </section>
      <section>
        <label style={styles.label}>{t('transfer.amount_label')}</label>
        <Input
          type="number"
          placeholder={t('transfer.amount_placeholder')}
          style={styles.input}
          value={amount.toString()}
          onChange={e => setAmount(Number(e.target.value) - 0)}
          maxLength={30}
          min={0}
          max={user.tokens}
          suffix="1CC"
          ref={amountInputRef}
        />
        <div style={styles.amountPanel} onClick={() => setAmount(user.tokens)}>
          {t('transfer.available')}：{user.tokens} 1CC
        </div>
      </section>
      <section>
        <label style={styles.label}>{t('transfer.gas_label')}</label>
        <Input
          type="text"
          style={{ ...styles.input, ...styles.inputDisabled }}
          value={gwei + ' Gwei'}
          suffix={<CircleLoading loading={Number(gwei) === 0} />}
          readOnly
        />
      </section>
      <Button
        width={500}
        height={52}
        title={t('transfer.button_next')}
        borderRadius={10}
        style={styles.button}
        titleStyle={styles.buttonTitle}
        onClick={onClickNextDebounce}
      />
    </div>
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
  input: {
    width: '100%',
    height: scale(50),
    backgroundColor: 'transparent',
    marginTop: scale(12),
    padding: '0 ' + scale(15),
    outline: 'none',
    fontSize: scale(18),
    lineHeight: scale(22),
    color: '#FFF',
    WebkitAppearance: 'none'
  },
  inputDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  label: {
    fontSize: scale(16),
    lineHeight: scale(22),
    marginTop: scale(30),
    color: '#FFF',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    cursor: 'pointer',
    fontSize: scale(14),
    opacity: 0.7
  },
  button: {
    backgroundColor: '#212429',
    borderColor: '#212429',
    marginTop: scale(50)
  },
  buttonTitle: {
    fontSize: scale(16),
    lineHeight: scale(24),
    color: 'white',
    fontWeight: 'bold'
  },
  amountPanel: {
    width: '100%',
    borderRadius: scale(10),
    marginTop: scale(10),
    padding: `${scale(15)} ${scale(15)}`,
    background: '#1b2940',
    cursor: 'pointer',
    fontFamily: 'JDZhengHT',
    fontSize: scale(16)
  }
})

const TransferPopup = {
  dialog: {} as DialogInstance,
  show: () => {
    TransferPopup.dialog = Dialog.open({
      children: <TransferDialog />,
      width: scale(560),
      bodyStyle: styles.body
    })
  },
  close: () => TransferPopup.dialog.close()
}

export default TransferPopup
