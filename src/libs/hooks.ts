import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import HTTP from '@/services/http'
import store from '@/store'
import { BubbleType } from '@/types/bubble'

import { delay, secondsFormat } from './utlis'
import { getGasPrice } from '@/services/transfer'

export function useWalletConnected() {
  const [connected, setConnected] = useState(window.ethereum.isConnected())
  return [connected, setConnected]
}

export function useMe() {
  const { user } = store
  return user
}

export function useBubbles() {
  const { address = store.user?.address } = useParams()

  const [bubbles, setBubbles] = useState<BubbleType[]>([])
  const [list, setList] = useState<any[]>([])

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const perPage = 10

  const fetchData = useCallback(
    async (refresh?: boolean) => {
      console.log('[useBubbles] fetchData')

      const currentPage = refresh ? 1 : page

      if (!address) {
        setLoading(false)
        return
      }

      setLoading(refresh ? true : list.length === 0)

      const response = await HTTP.get('bubbles', {
        params: {
          address,
          page: currentPage,
          per_page: perPage
        }
      })

      const data = response.data.bubbles

      setLoading(false)
      setList(currentPage === 1 ? data : list.concat(data))
      setPage(currentPage + 1)
    },
    [address, list, page]
  )

  const onCollect = (bubble: BubbleType) => {
    list.length < perPage && fetchData()
  }

  return { bubbles, loading, setBubbles, onCollect }
}

export function useCountDown(seconds: number, interval = 0.1): [number, (num: number) => void] {
  const [ttl, setTTL] = useState<number>(seconds)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (ttl > 0) {
      timeout = setTimeout(
        () => ttl && setTTL(Number((ttl - interval).toFixed(1))),
        interval * 1000
      )
    }
    return () => timeout && clearTimeout(timeout)
  }, [interval, ttl])

  return [ttl, setTTL]
}

export type DigitalClockType = {
  countdown: number
  day: string
  hours: string
  minutes: string
  seconds: string
}

export function useDigitalClock(seconds: number): [DigitalClockType, (num: number) => void] {
  const [countdown, setCountdown] = useCountDown(seconds, 1)
  const { day, hour, minute, second } = secondsFormat(countdown)
  const pad = (number: number) => String(number).padStart(2, '0')

  const clock = {
    countdown,
    day: pad(day),
    hours: pad(hour),
    minutes: pad(minute),
    seconds: pad(second)
  }

  return [clock, setCountdown]
}

export function useIsMounted() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted.current
}

export function useForceUpdate() {
  const [value, setValue] = useState(0)
  return () => setValue(value + 1)
}

export function useGasPrice() {
  const [gwei, setGwei] = useState(0)
  const stop = useRef(false)

  const updateGwei = useCallback(async () => {
    const gasPrice = await getGasPrice()
    setGwei(gasPrice)
    console.log('[useGasPrice] updateGwei', gasPrice)
    await delay(5000)
    !stop.current && updateGwei()
  }, [])

  useEffect(() => {
    updateGwei()
    return () => {
      stop.current = true
    }
  }, [updateGwei])

  return gwei
}
