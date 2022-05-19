import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SyncOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { connectMetaMask } from '@/services/wallet/providers/metamask'
import { connectWalletConnect } from '@/services/wallet/providers/walletconnect'
import { connectCoinbaseWallet } from '@/services/wallet/providers/coinbase'
import { WEB3_PROVIDERS } from '@/types/web3'

import css from './ConnectWalletPopup.module.less'
import { Dialog } from '../DialogProvider'

import web3 from '@/services/web3'

interface ConnectedWallet {
  wallet: WEB3_PROVIDERS
  account: string
}

const ConnectWalletPopup = {
  show: (): Promise<ConnectedWallet> => {
    return new Promise((resolve, reject) => {
      web3.setProvider(null)
      Dialog.open({
        children: <ConnectWalletDialog resolve={resolve} reject={reject} />,
        width: scale(440),
        bodyStyle: styles.body,
        onClose: () => reject('User canceled wallet connect'),
        onExited: reject
      })
    })
  }
}

interface ConnectWalletDialogInterface {
  resolve: (wallet: ConnectedWallet) => void
  reject: (reason?: any) => void
}

const ConnectWalletDialog: React.FC<ConnectWalletDialogInterface> = ({ resolve, reject }) => {
  const [wallet, setWallet] = useState('')
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation()

  const connect = async (wallet: string) => {
    setWallet(wallet)
    setLoading(true)

    try {
      if (wallet === WEB3_PROVIDERS.METAMASK) {
        const account = await connectMetaMask()
        resolve({ wallet, account })
      }
      if (wallet === WEB3_PROVIDERS.WALLETCONNECT) {
        const account = await connectWalletConnect()
        resolve({ wallet, account })
      }
      if (wallet === WEB3_PROVIDERS.COINBASE) {
        const account = await connectCoinbaseWallet()
        resolve({ wallet, account })
      }
    } catch (error: any) {
      reject('[Wallet] connect error: ' + error?.message)
    }

    setLoading(false)
    Dialog.close()
  }

  const isLoading = (walletName: string) => loading && wallet === walletName

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('wallet.connect_wallet')}</h1>
      <div style={styles.wallets}>
        <WalletItem
          text={WEB3_PROVIDERS.METAMASK}
          icon={require('@/assets/images/metamask_logo.png')}
          loading={isLoading(WEB3_PROVIDERS.METAMASK)}
          onClick={connect}
        />
        <WalletItem
          text={WEB3_PROVIDERS.WALLETCONNECT}
          icon={require('@/assets/images/wallet_connnect_logo.png')}
          loading={isLoading(WEB3_PROVIDERS.WALLETCONNECT)}
          onClick={connect}
        />
        <WalletItem
          text={WEB3_PROVIDERS.COINBASE}
          icon={require('@/assets/images/coinbase_logo.png')}
          loading={isLoading(WEB3_PROVIDERS.COINBASE)}
          iconStyle={{ borderRadius: scale(5) }}
          onClick={connect}
        />
      </div>
    </div>
  )
}

interface WalletItemProps {
  text: string
  icon?: string
  loading: boolean
  style?: React.CSSProperties
  iconStyle?: React.CSSProperties
  onClick: (wallet: string) => void
}

const WalletItem: React.FC<WalletItemProps> = ({ text, icon, loading, iconStyle, onClick }) => {
  return (
    <div style={styles.walletItem} className={css.walletItem} onClick={() => onClick(text)}>
      <span style={styles.walletItemText} className={css.walletItemText}>
        {text}
      </span>
      <div style={styles.walletItemFooter}>
        {loading && (
          <Spin
            style={styles.walletItemLoadingIcon}
            indicator={<SyncOutlined style={{ fontSize: scale(20) }} spin />}
          />
        )}
        <img
          src={icon || require('@/assets/images/wallet_icon.png')}
          style={StyleSheet.flatten([styles.walletItemIcon, iconStyle])}
          alt="wallet"
        />
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: scale(30)
  },
  body: {
    backgroundColor: '#1B1E26',
    padding: `${scale(30)} ${scale(30)} ${scale(20)}`
  },
  title: {
    fontSize: scale(22),
    textAlign: 'center'
  },
  wallets: {
    marginTop: scale(40),
    marginBottom: scale(30)
  },
  walletItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(66),
    borderRadius: scale(15),
    padding: `0 ${scale(24)}`,
    marginBottom: scale(20),
    cursor: 'pointer'
  },
  walletItemText: {
    fontSize: scale(18),
    lineHeight: scale(34),
    fontWeight: '600'
  },
  walletItemIcon: {
    width: scale(32),
    height: scale(32)
  },
  walletItemFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  walletItemLoadingIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(16)
  }
})

export default ConnectWalletPopup
