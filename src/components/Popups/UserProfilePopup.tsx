import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { message } from 'antd'

import StorageKeys from '@/libs/StorageKeys'
import Storage from '@/services/storage'
import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useForceUpdate, useMe } from '@/libs/hooks'
import { addressSummary } from '@/libs/utlis'
import { logoutConfirm, syncUser } from '@/services/auth'
import { connectWallet, disconnectWallet } from '@/services/wallet'

import Button from '../Button'
import ExternalLink from '../Icons/ExternalLink'
import MetaMaskAvatar from '../MetaMaskAvatar'
import { Dialog } from '../DialogProvider'

const UserProfilePopup = {
  show: () => {
    Dialog.open({
      children: <UserProfileDialog />,
      width: scale(500)
    })
  }
}

const UserProfileDialog: React.FC = () => {
  const user = useMe()
  const forceUpdate = useForceUpdate()
  const { t } = useTranslation()

  const wallet = Storage.get(StorageKeys.WEB3_PROVIDER)

  const onDisconnectWallet = async () => {
    await logoutConfirm()
    Dialog.close()
  }

  const onConnectWallet = async () => {
    await disconnectWallet()
    await connectWallet()
    message.info(t('message.wallet_connected'))
    forceUpdate()
  }

  useEffect(() => {
    syncUser()
  }, [])

  if (!user) {
    return null
  }

  return (
    <div style={styles.container}>
      <div style={{ ...styles.group, ...styles.avatarGroup }}>
        <div style={styles.avatar}>
          <MetaMaskAvatar account={user.address} size={100} style={{ borderRadius: '50%' }} />
        </div>
        <div style={styles.hr} />
        <div style={styles.title}>{t('wallet.account_address')}</div>
        <span style={styles.content}>
          <a
            href={`https://etherscan.io/address/${user?.address}`}
            target="_blank"
            rel="noreferrer">
            {user.ens || addressSummary(user.address, false, 12, 4)}
          </a>
          <ExternalLink size={20} />
        </span>
      </div>
      <div style={styles.group}>
        <div style={styles.title}>{t('wallet.connected_to')}</div>
        <div style={styles.row}>
          <span style={styles.content}>{wallet ? wallet : t('wallet.not_connected')}</span>
          <Button
            width={170}
            height={40}
            borderRadius={30}
            title={wallet ? t('wallet.disconnect_wallet') : t('wallet.connect_wallet')}
            danger={Boolean(user)}
            onClick={wallet ? onDisconnectWallet : onConnectWallet}></Button>
        </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: `${scale(10)} ${scale(10)} ${scale(40)}`
  },
  headerTitle: {
    fontSize: scale(28)
  },
  account: {},
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  hr: {
    height: 0,
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginTop: scale(30),
    marginBottom: scale(30)
  },
  title: {
    marginBottom: scale(5),
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#FFF',
    opacity: 0.6
  },
  content: {
    color: '#FFF',
    fontSize: scale(20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  address: {
    cursor: 'pointer'
  },
  group: {
    marginTop: scale(20),
    position: 'relative'
  },
  avatarGroup: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default UserProfilePopup
