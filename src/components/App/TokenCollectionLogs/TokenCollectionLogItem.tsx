import React from 'react'
import { floor } from 'lodash'
import { useTranslation } from 'react-i18next'

import MetaMaskAvatar from '@/components/MetaMaskAvatar'
import StyleSheet, { scale } from '@/libs/StyleSheet'
import { addressSummary, friendlytime } from '@/libs/utlis'
import { BubbleCollectionType } from '@/types/bubble'
import { UserType } from '@/types/user'

interface Props {
  data: BubbleCollectionType
  style?: React.CSSProperties
}

const TokenCollectionLogItem: React.FC<Props> = ({ data, style }) => {
  const user = data.user as UserType
  const to = `/user/${user.address}`

  const { t } = useTranslation()

  const navigate = () => window.app.navigate(to, { state: { user } })

  return (
    <div style={StyleSheet.flatten([styles.container, style])}>
      <MetaMaskAvatar
        account={user.address}
        size={Number(scale(24, ''))}
        style={styles.avatar}
        onClick={() => navigate()}
      />
      <span style={styles.username} onClick={() => navigate()}>
        {user.ens || addressSummary(user.address, true)}
      </span>
      <span style={styles.summary}>
        {t('bubble.collect_log', { count: floor(data.tokens, 4) })}
      </span>
      <span style={styles.time}>{friendlytime(data.createdAt)}</span>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: scale(16),
    lineHeight: scale(24),
    color: '#FFF',
    marginBottom: scale(8),
    width: '100%'
  },
  avatar: {
    marginRight: scale(8),
    cursor: 'pointer'
  },
  username: {
    fontSize: scale(16),
    lineHeight: scale(24),
    marginRight: scale(8),
    color: '#FFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    cursor: 'pointer'
  },
  summary: {
    marginRight: scale(8),
    opacity: '0.7'
  },
  time: {
    opacity: '0.3'
  }
})

export default TokenCollectionLogItem
