import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import MetaMaskAvatar from '@/components/MetaMaskAvatar'
import EventEmitter from '@/services/event'
import StyleSheet, { scale, SCALE } from '@/libs/StyleSheet'
import { BubbleRankingItemType } from '@/types/bubble'
import { addressSummary } from '@/libs/utlis'

interface Props {
  data: BubbleRankingItemType
}

const TokenRankingListItem: React.FC<Props> = ({ data }) => {
  const [stealable, setStealable] = useState(data.stealable)

  const { address, user } = data
  const { t } = useTranslation()

  useEffect(() => {
    setStealable(data.stealable)
  }, [data])

  useEffect(() => {
    const listeners = [
      EventEmitter.addListener(`BUBBLE_COLLECT_ERROR:ADDRESS:${data.address}`, () =>
        setStealable(false)
      )
    ]
    return () => listeners.forEach(e => e.remove())
  }, [data.address])

  return (
    <Link to={`/user/${address}`} state={{ user }} style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}>
          <MetaMaskAvatar size={48 * SCALE} account={address} />
        </div>
        <span style={styles.username}>{user?.ens || addressSummary(address, false, 18)}</span>
      </div>
      <span style={StyleSheet.flatten([styles.collect, stealable && styles.collectable])}>
        {stealable ? t('ranking.collectible') : t('ranking.uncollectible')}
      </span>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    width: scale(479),
    minHeight: scale(88),
    borderRadius: scale(18),
    backgroundColor: '#22252D',
    marginBottom: scale(16),
    padding: scale(20) + ' ' + scale(24),
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden'
  },
  avatar: {
    marginRight: scale(24),
    borderRadius: scale(24)
  },
  username: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: 500
  },
  collect: {
    display: 'block',
    color: '#64666C',
    fontSize: scale(14),
    lineHeight: scale(40),
    cursor: 'pointer',
    userSelect: 'none'
  },
  collectable: {
    color: '#1ADEED'
  }
})

export default TokenRankingListItem
