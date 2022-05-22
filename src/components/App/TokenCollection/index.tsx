import React, { useCallback, useEffect, useState } from 'react'
import { Spin } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { last, uniqBy } from 'lodash'
import { SyncOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import EventEmitter from '@/services/event'
import StyleSheet, { scale } from '@/libs/StyleSheet'
import { BubbleType } from '@/types/bubble'
import { fetchBubbles } from '@/services/api'
import { useMe, useSubsequentBubbles } from '@/libs/hooks'
import { locateBubbles } from '@/services/bubble'

import Bubble from '../Bubble'
import TokenCollectionLogs from '../TokenCollectionLogs'
import css from './index.module.css'
import TokenCollectionEmpty from './TokenCollectionEmpty'
import TokenCollectionUser from './TokenCollectionUser'

const TokenCollection: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleType[]>([])
  const [loading, setLoading] = useState(true)
  const { collectedCount, lastBubble, fetchSubsequentBubbles } = useSubsequentBubbles()
  const { t } = useTranslation()
  const { address } = useParams()

  const me = useMe()
  const account = address || me?.address
  const empty = !loading && bubbles.length === 0

  const fetchData = useCallback(
    async (params = {}) => {
      const bubblesList = await fetchBubbles(account, params)
      setBubbles(locateBubbles(bubblesList))
      lastBubble.current = last(bubblesList)
      setLoading(false)
    },
    [account, lastBubble]
  )

  const onCollect = async (bubble: BubbleType) => {
    collectedCount.current = collectedCount.current + 1

    const data = bubbles.map(item => {
      item.show = item.id !== bubble.id
      return item
    })

    setBubbles(locateBubbles(data))
    fetchSubsequentBubbles(account)
  }

  const resetState = useCallback(() => {
    setBubbles([])
    setLoading(true)
    collectedCount.current = 0
    lastBubble.current = undefined
  }, [collectedCount, lastBubble])

  const onRefresh = (e: any) => {
    const params = { after: lastBubble.current?.id }
    resetState()
    fetchData(params)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    resetState()
  }, [resetState])

  useEffect(() => {
    setBubbles([])
    setLoading(true)
  }, [account])

  useEffect(() => {
    const listeners = [
      EventEmitter.addListener('AUTH_LOGIN', () => fetchData()),
      EventEmitter.addListener('AUTH_LOGOUT', () => setBubbles([])),
      EventEmitter.addListener(`FETCH_BUBBLES:${account}`, (data: BubbleType[]) => {
        const uniqBubbles = uniqBy(bubbles.filter(i => i.show).concat(data), 'id')
        setBubbles(locateBubbles(uniqBubbles))
      })
    ]
    return () => listeners.forEach(e => e.remove())
  }, [account, bubbles, fetchData])

  return (
    <div className={css.container} style={styles.container}>
      <div style={styles.bubblesContainer}>
        {bubbles.map(bubble => (
          <Bubble bubble={bubble} key={bubble.id} onCollect={onCollect} />
        ))}
      </div>
      {loading && <Spin size="default" />}
      {empty && <TokenCollectionEmpty address={account} />}
      {address && <TokenCollectionUser address={address} />}
      {!address && <TokenCollectionLogs />}
      <div style={styles.menus}>
        {address && (
          <Link to="/" style={styles.home}>
            <img
              src={require('@/assets/images/home_icon.png')}
              style={styles.homeIcon}
              alt="home"
            />
          </Link>
        )}
        <div style={styles.refresh} className={css.refresh} onClick={onRefresh}>
          <SyncOutlined style={styles.syncIcon} spin={loading} />
          <span style={styles.refreshText}>{t('common.refresh')}</span>
        </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(64),
    position: 'relative',
    overflow: 'hidden'
  },
  bubblesContainer: {
    position: 'absolute',
    top: scale(150),
    bottom: scale(50),
    left: scale(100),
    right: scale(0)
  },
  refresh: {
    height: scale(48),
    padding: 0 + ' ' + scale(15),
    backgroundColor: '#21242a',
    borderRadius: scale(50),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.5s'
  },
  syncIcon: {
    fontSize: scale(20),
    color: '#BBB'
  },
  refreshText: {
    fontWeight: 'bold',
    marginLeft: scale(8),
    color: '#BBB',
    fontSize: scale(16)
  },
  menus: {
    position: 'absolute',
    top: scale(30),
    right: scale(30),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  home: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(48),
    height: scale(48),
    marginRight: scale(10),
    borderRadius: scale(24),
    backgroundColor: '#21242A',
    cursor: 'pointer'
  },
  homeIcon: {
    width: scale(24),
    height: scale(24),
    margin: 'auto'
  }
})

export default TokenCollection
