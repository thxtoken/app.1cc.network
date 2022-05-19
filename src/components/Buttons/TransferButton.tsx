import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { confirmUnclaimedTransfer, fetchUnclaimedTransfer, getGasFee } from '@/services/transfer'
import { checkEthNetwork, connectWallet } from '@/services/wallet'

import Button from '../Button'
import TransferPopup from '../Popups/TransferPopup'
import TransferPreviewPopup from '../Popups/TransferPreviewPopup'

const TransferButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const onPress = async () => {
    if (loading) {
      return
    }

    await connectWallet()

    setLoading(true)

    try {
      await checkEthNetwork()
    } catch (error) {
      setLoading(false)
      return
    }

    const unclaimedTransfer = await fetchUnclaimedTransfer()

    if (unclaimedTransfer) {
      setLoading(false)

      try {
        await confirmUnclaimedTransfer()
      } catch (error) {
        return
      }

      setLoading(true)
      const gasFee = await getGasFee()
      const address = unclaimedTransfer.toAddress
      const amount = unclaimedTransfer.tokens
      setLoading(false)

      return TransferPreviewPopup.show({
        address,
        amount,
        gasFee,
        transfer: unclaimedTransfer
      })
    }

    setLoading(false)
    TransferPopup.show()
  }

  return (
    <Button
      width={120}
      height={45}
      borderRadius={40}
      loading={loading}
      disabled={loading}
      title={t('transaction.withdrawal')}
      onClick={onPress}
    />
  )
}

export default TransferButton
