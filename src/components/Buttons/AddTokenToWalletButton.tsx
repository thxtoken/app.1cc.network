import React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'

import StorageKeys from '@/libs/StorageKeys'
import StyleSheet from '@/libs/StyleSheet'
import Storage from '@/services/storage'
import store from '@/store'
import { addOneCCTokenToWallet } from '@/services/token'
import { WEB3_PROVIDERS } from '@/types/web3'

const AddTokenToWalletButton: React.FC = () => {
  const wallet = Storage.get(StorageKeys.WEB3_PROVIDER)

  const { t } = useTranslation()

  if (wallet === WEB3_PROVIDERS.WALLETCONNECT) {
    return null
  }

  if (!wallet) {
    return null
  }

  const onPress = async () => {
    store.loading = true

    try {
      await addOneCCTokenToWallet()
    } catch (error) {
      //
    }

    store.loading = false
  }

  const onClick = debounce(onPress, 5000, { leading: true, trailing: false })

  return (
    <Button type="link" style={styles.addTokenButton} onClick={onClick}>
      {t('button.add_token', { wallet })}
    </Button>
  )
}

const styles = StyleSheet.create({
  addTokenButton: {
    padding: 0
  }
})

export default AddTokenToWalletButton
