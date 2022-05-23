import React, { CSSProperties, useEffect, useState } from 'react'
import { floor, padStart } from 'lodash'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import EventEmitter from '@/services/event'
import HTTP from '@/services/http'
import Storage from '@/services/storage'
import store from '@/store'
import StyleSheet, { scale } from '@/libs/StyleSheet'
import { BubbleCollectionType, BubbleType } from '@/types/bubble'
import { delay } from '@/libs/utlis'
import { DigitalClockType, useDigitalClock } from '@/libs/hooks'
import { isMe, walletLogin } from '@/services/auth'
import { requestErrorHandlerAlert } from '@/services/error'
import { play, SOUNDS } from '@/services/sound'
import { formatCountdown } from '@/services/format'

import css from './index.module.css'

interface Props {
  bubble: BubbleType
  onCollect: (bubble: BubbleType) => void
}

const Bubble: React.FC<Props> = props => {
  const countdown = props.bubble ? props.bubble.ttl : 0

  const [bubble, setBubble] = useState<BubbleType>(props.bubble)
  const [show, setShow] = useState(true)
  const [collectedTokens, setCollectedTokens] = useState(0)
  const [clock] = useDigitalClock(countdown)
  const [loading, setLoading] = useState(false)

  // Auto remove disappeared bubble
  useEffect(() => {
    if (bubble) {
      const disappearedCountdown = formatCountdown(bubble.disappearedCountdown)
      if (disappearedCountdown > 0 && clock.countdown === 0) {
        setShow(false)
      }
    }
  }, [bubble, clock])

  const isOwner = isMe(bubble.userId)
  const collectable = isOwner ? formatCountdown(bubble.ripenedCountdown) === 0 : bubble.stealable
  const bubbleAnimate = Number(bubble.id) % 2 // bubble0 bubble1
  const floatAnimate = { animation: `bubble${bubbleAnimate} 4s linear infinite` }
  const scaleOutAnimate = { animation: 'scale-out 1s forwards' }
  const scaleInAnimate = { animation: 'scale-in 1s forwards' }
  const bubbleScale = getScale(bubble.remainingTokens)
  const bubbleSize = Number(scale(BUBBLE_SIZE, '')) * bubbleScale

  const bubbleStyle: CSSProperties = {
    ...styles.bubble,
    left: bubble.x,
    top: bubble.y,
    opacity: collectable ? 1 : 0.3,
    transition: 'all 0.5s'
  }

  const containerStyle: CSSProperties = {
    ...bubbleStyle,
    ...(show ? scaleInAnimate : scaleOutAnimate)
  }

  const tokenCollectStyle: CSSProperties = {
    ...styles.tokenCollect,
    ...styles.full,
    animation: 'scale-up 1.5s forwards',
    top: -bubbleSize / 2 - 10 + 'px'
  }

  const onClick = async (e: any) => {
    await walletLogin()
    isOwner ? onCollectBubble() : onStealBubble()
  }

  const onCollectBubble = async () => {
    if (!collectable) {
      return
    }

    props.onCollect(bubble)

    setShow(false)
    play(SOUNDS.RainDrop)

    setTimeout(() => setBubble({ ...bubble, show: false }), 1000)

    await HTTP.post('bubble-collections', { bubble_id: bubble.id })

    if (store.user) {
      await delay(500)
      store.user = {
        ...store.user,
        tokens: Number(store.user?.tokens || 0) + Number(bubble.remainingTokens)
      }
    }
  }

  const onStealBubble = async () => {
    if (!bubble.stealable || !store.user) {
      return
    }

    setLoading(true)

    let response

    try {
      response = await HTTP.post('bubble-collections', { bubble_id: bubble.id })
    } catch (error: any) {
      setLoading(false)
      setBubble({ ...bubble, stealable: false })
      EventEmitter.emit(`BUBBLE_COLLECT_ERROR:ADDRESS:${bubble.address}`)
      return requestErrorHandlerAlert(error, 'Request Error', false)
    }

    EventEmitter.emit(`BUBBLE_COLLECT_ERROR:ADDRESS:${bubble.address}`)

    play(SOUNDS.RainDrop)

    const bubbleCollection: BubbleCollectionType = response.data.bubbleCollection
    const remainingTokens = bubble.remainingTokens - bubbleCollection.tokens
    setLoading(false)

    setCollectedTokens(bubbleCollection.tokens)
    setBubble({ ...bubble, stealable: false, remainingTokens })

    store.user = { ...store.user, tokens: store.user.tokens + bubbleCollection.tokens }

    Storage.set('user', store.user)
  }

  const onDoubleClick = () => {
    if (window.app.debug) {
      window.open(`https://etherscan.io/tx/${bubble.transactionHash}`)
    }
  }

  return (
    <div key={bubble.id} onClick={onClick} onDoubleClick={onDoubleClick} style={containerStyle}>
      <div style={{ ...styles.full, ...floatAnimate }}>
        {Boolean(collectedTokens) && (
          <div style={tokenCollectStyle}>+{getCollecedTokenValue(collectedTokens)}</div>
        )}
        <div className={css.bubble} style={{ transform: `scale(${bubbleScale})` }}>
          {!loading && (
            <span className={css.bubbleText}>{getTokenValue(bubble.remainingTokens)}</span>
          )}
          {loading && <LoadingSpin />}
          <img src={require('@/assets/images/bubble.png')} className={css.bubbleBg} alt="bubble" />
          {Boolean(countdown) && (
            <div style={styles.countdown}>
              <div>{getClockValue(clock)}</div>
              <div>{bubble.ripenedCountdown ? 'growing' : 'disappear'}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const LoadingSpin = () => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: scale(60), color: '#354a57' }} spin />} />
)

const getScale = (num: number) => {
  if (num <= 5) {
    return 0.4
  }

  if (num <= 10) {
    return 0.45
  }

  if (num <= 20) {
    return 0.5
  }

  if (num <= 35) {
    return 0.6
  }

  if (num <= 50) {
    return 0.65
  }

  if (num <= 100) {
    return 0.7
  }

  if (num <= 150) {
    return 0.8
  }

  if (num <= 200) {
    return 0.9
  }

  return 1
}

const getTokenValue = (num: number) => {
  return floor(num, num < 10 ? 1 : 0)
}

const getCollecedTokenValue = (num: number) => {
  return floor(num, num < 0.01 ? 4 : 2)
}

const getClockValue = (clock: DigitalClockType) => {
  if (Number(clock.hours) > 0) {
    const hours = padStart(String(Number(clock.day) * 24 + Number(clock.hours)), 2, '0')
    return [hours, clock.minutes, clock.seconds].join(':')
  }

  return [clock.minutes, clock.seconds].join(':')
}

const BUBBLE_SIZE = 132
const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    width: scale(BUBBLE_SIZE),
    height: scale(BUBBLE_SIZE),
    borderRadius: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  full: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  countdown: {
    position: 'absolute',
    bottom: scale(-75),
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: scale(24),
    lineHeight: scale(30),
    color: '#1ADEED',
    fontFamily: 'JDZhengHT'
  },
  tokenCollect: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'JDZhengHT',
    fontWeight: 'bold',
    fontSize: scale(30),
    opacity: 0.5,
    transition: 'opacity 0.3s'
  }
})

export default React.memo(Bubble)
