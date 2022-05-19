import React from 'react'
import { useTranslation } from 'react-i18next'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useMe } from '@/libs/hooks'
import { walletLogin } from '@/services/auth'

import Button from '../Button'

const ConnectWallet: React.FC = () => {
  const user = useMe()
  const { t } = useTranslation()

  if (user) {
    return null
  }

  return (
    <Button
      width={180}
      height={48}
      title={t('wallet.connect_wallet')}
      borderRadius={40}
      style={styles.connectBtn}
      titleStyle={styles.connectBtnTitle}
      onClick={walletLogin}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
  connectBtn: {
    backgroundColor: 'transparent',
    borderColor: '#1ADEED',
    marginLeft: scale(20),
    borderWidth: scale(2)
  },
  connectBtnTitle: {
    fontSize: scale(16),
    color: '#1ADEED',
    fontWeight: 'bold'
  }
})

export default ConnectWallet
