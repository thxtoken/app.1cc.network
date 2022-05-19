import React, { useEffect, useState } from 'react'
import { ReloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { SyncOutlined } from '@ant-design/icons'

import SingleList from '@/components/SingleList'
import EventEmitter from '@/services/event'
import HTTP from '@/services/http'
import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useDigitalClock, useMe } from '@/libs/hooks'
import { walletLogin } from '@/services/auth'

import TokenRankingListItem from './TokenRankingListItem'

import i18next from 'i18next'

const TokenRankingListRandom: React.FC = () => {
  const [ttl, setTTL] = useState(0)
  const [refreshCount, setRefreshCount] = useState(0)

  return (
    <div style={styles.container}>
      <SingleList
        api="users"
        params={{ type: 1 }}
        itemView={TokenRankingListItem}
        formatMethod={data => {
          setTTL(Number(data.timeToLive.replace('s', '')))
          setRefreshCount(data.remainingRefreshCount)
          return data.users
        }}
        perPage={20}
        style={styles.singleList}
        footerView={(props: any) => (
          <RandomListFooter {...props} ttl={ttl} refreshCount={refreshCount} />
        )}
      />
    </div>
  )
}

const RandomListFooter: React.FC<any> = ({ loading, refresh, refreshCount, ttl }) => {
  const [clock, setCountdown] = useDigitalClock(ttl)
  const [refreshing, setRefreshing] = useState(false)
  const time = [clock.hours, clock.minutes, clock.seconds].join(':')
  const me = useMe()

  const { t } = useTranslation()

  useEffect(() => {
    setCountdown(ttl)
  }, [setCountdown, ttl])

  useEffect(() => {
    const timeout = clock.countdown === 0
    ttl > 0 && timeout && refresh()
  }, [clock, refresh, ttl])

  useEffect(() => {
    const listeners = [EventEmitter.addListener('AUTH_LOGIN', () => refresh())]
    return () => listeners.forEach(e => e.remove())
  }, [refresh])

  if (!me) {
    return null
  }

  const preRefresh = async () => {
    await HTTP.get('users?type=1&refresh=1&per_page=1')
  }

  const getRefreshTimesText = () => {
    if (i18next.language === 'en') {
      if (refreshCount === 1) return 'once'
      if (refreshCount === 2) return 'twice'
      return `${refreshCount} times`
    }
    return refreshCount
  }

  const onReload = async (e: any) => {
    await walletLogin()

    if (refreshing) {
      return
    }

    try {
      setRefreshing(true)
      await preRefresh()
      await refresh()
      setRefreshing(false)
    } catch (error) {
      setRefreshing(false)
    }
  }

  if (loading) {
    return null
  }

  if (refreshing) {
    return (
      <div style={styles.footer}>
        <SyncOutlined style={styles.syncIcon} spin={refreshing} />
      </div>
    )
  }

  if (refreshCount > 0) {
    return (
      <div style={styles.footer} onClick={onReload}>
        <span style={styles.reloadText}>
          {t('ranking.free_refresh_count', { count: getRefreshTimesText() })}
        </span>
        <ReloadOutlined style={styles.reloadIcon} />
      </div>
    )
  }

  return (
    <div style={{ ...styles.footer, cursor: 'not-allowed' }}>
      <span style={styles.reloadText}>{t('ranking.free_refresh', { time })}</span>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    overflowY: 'scroll',
    width: '100%',
    position: 'relative'
  },
  loading: {
    paddingTop: scale(15)
  },
  singleList: {
    paddingBottom: scale(80),
    overflowY: 'scroll'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: scale(479),
    margin: '0 auto',
    height: scale(70),
    borderRadius: scale(18),
    backgroundColor: '#22252D',
    padding: scale(20) + ' ' + scale(24),
    cursor: 'pointer'
  },
  reloadText: {
    fontSize: scale(18),
    lineHeight: scale(28),
    fontWeight: '500'
  },
  reloadIcon: {
    marginLeft: scale(10)
  },
  syncIcon: {
    fontSize: scale(20),
    color: '#BBB'
  }
})

export default TokenRankingListRandom
