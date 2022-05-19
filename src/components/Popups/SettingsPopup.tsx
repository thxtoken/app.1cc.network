import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'

import packageInfo from '@/../package.json'
import StyleSheet, { scale } from '@/libs/StyleSheet'
import { getLanguageName } from '@/i18n'
import { disconnectWallet } from '@/services/wallet'

import ListItem from '../List/ListItem'
import ListItemLink from '../List/ListItemLink'
import ChangelogPopup from './ChangelogPopup'
import { Dialog } from '../DialogProvider'

const SettingsPopup = {
  show: () => {
    Dialog.open({
      children: <SettingsDialog />,
      width: scale(560),
      bodyStyle: styles.body
    })
  }
}

const SettingsDialog: React.FC = () => {
  const { t } = useTranslation()

  const buildVersion = process.env.REACT_APP_BUILD_VERSION || ''

  return (
    <div className="settings-popup" style={styles.container}>
      <h1 style={styles.title}>{t('settings.settings')}</h1>
      <ListItem title={t('settings.version')} value={packageInfo.version} />
      <ListItem title={t('settings.build')} value={'v' + buildVersion} />
      <ListItem title={t('settings.language')} value={getLanguageName()} />
      <ListItem title={t('settings.changelog')} value="changelog" onClick={ChangelogPopup.show} />
      <ListItem
        title={t('settings.open_source')}
        value={<ListItemLink text="Github" url="https://github.com/thxtoken/app.1cc.network" />}
      />
      <ListItem
        title={t('settings.technical_support')}
        value={<ListItemLink text="Chainbase" url="https://chainbase.online/" />}
      />
      <ListItem title={t('settings.clear_storage')} value={<ClearStorage />} />
    </div>
  )
}

const ClearStorage: React.FC = () => {
  const { t } = useTranslation()

  const confirmClearStorage = () => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: t('confirm.clear_storage_title'),
        content: t('confirm.clear_storage_message'),
        centered: true,
        onCancel: () => reject('Cancelled'),
        onOk: () => {
          disconnectWallet()
          localStorage.clear()
          resolve(true)
          window.location.reload()
        }
      })
    })
  }

  return (
    <span style={styles.clear} onClick={confirmClearStorage}>
      {t('settings.clear')}
    </span>
  )
}

const styles = StyleSheet.create({
  container: {
    height: scale(500)
  },
  body: {
    backgroundColor: '#1B1E26',
    padding: scale(30)
  },
  title: {
    fontSize: scale(28)
  },
  clear: {
    color: '#f95a5a',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
})

export default SettingsPopup
