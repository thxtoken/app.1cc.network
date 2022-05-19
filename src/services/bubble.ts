import { random } from 'lodash'

import { BubbleType } from '@/types/bubble'

const X_GRID_LENGTH = 6
const Y_GRID_LENGTH = 4

export function randomBubblePositions(len: number, array: string[]) {
  const randomNumbers: string[] = []
  while (randomNumbers.length < len) {
    const x = random(0, X_GRID_LENGTH - 1)
    const y = random(0, Y_GRID_LENGTH - 1)
    const randomNumber = x + '' + y
    if (!randomNumbers.includes(randomNumber) && !array.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
    }
  }
  return randomNumbers
}

export function locateBubbles(bubbles: BubbleType[]) {
  const bubblePositions = bubbles.filter(bubble => bubble.xy).map(bubble => bubble.xy)
  const notPositionedBubbles = bubbles.filter(bubble => !bubble.xy)
  const randomPositions = randomBubblePositions(notPositionedBubbles.length, bubblePositions)
  return bubbles.map(bubble => {
    if (bubble.xy) {
      return bubble
    }
    const position = randomPositions.pop() as string
    const x = Number(position[0])
    const y = Number(position[1])
    const xUnit = (10 / X_GRID_LENGTH) * 10
    const yUnit = (10 / Y_GRID_LENGTH) * 10
    const xRandom = random(-xUnit / 3, xUnit / 3)
    const yRandom = random(-yUnit / 3, yUnit / 3)
    const xStyle = xUnit * x + xRandom + '%'
    const yStyle = yUnit * y + yRandom + '%'
    return { ...bubble, x: xStyle, y: yStyle, xy: position } as BubbleType
  })
}
