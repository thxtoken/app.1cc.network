import { BubbleType } from '@/types/bubble'

export function formatBubble(bubble: BubbleType, index: number) {
  bubble.show = true
  bubble.ttl =
    formatCountdown(bubble?.ripenedCountdown) || formatCountdown(bubble?.disappearedCountdown) || 0
  return bubble
}

export function formatCountdown(ttl: string) {
  const value = Number(ttl.replace('s', '').split('.')[0])

  if (value < 0) {
    return 0
  }

  return value
}
