import { debounce } from 'lodash'

export const SOUNDS = {
  RainDrop: `${process.env.PUBLIC_URL}/assets/sounds/rain_drop.wav`
}

function playSound(source: string) {
  const audio = new Audio(source)
  audio.play()
}

const play = debounce(playSound, 1000, { leading: true, trailing: false })

export { play }
