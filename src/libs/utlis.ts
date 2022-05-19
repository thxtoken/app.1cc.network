import moment from 'moment'

/**
 * 生成随机字符串
 * @param len 长度
 * @param charSet 字符集
 */
export function randomString(len: number, charSet?: string) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomStr = ''
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length)
    randomStr += charSet.substring(randomPoz, randomPoz + 1)
  }
  return randomStr
}

export function genRanHex(size: number) {
  return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

/**
 * Generating asynchronous delay functions
 * @param {number} time
 * @returns {Promise<void>}
 */
export function delay(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * Waiting fn return true
 **/
export function wait(fn: Function, interval = 200, stopTimeout = 60000) {
  let timeout = false
  const timer = setTimeout(() => (timeout = true), stopTimeout)

  return (async function check(): Promise<any> {
    if (await fn()) {
      clearTimeout(timer)
      return Promise.resolve()
    } else if (!timeout) {
      return delay(interval).then(check)
    } else {
      return Promise.resolve()
    }
  })()
}

export function addressSummary(address: string, toUpperCase = false, prefixLen = 4, suffixLen = 4) {
  const len = address.length
  const prefix = address.substring(2, prefixLen + 2)
  const suffix = address.substring(len - suffixLen, len)
  const addressSummary = prefix + '...' + suffix
  return '0x' + (toUpperCase ? addressSummary.toUpperCase() : addressSummary)
}

export function secondsFormat(s: number) {
  const day = Math.floor(s / (24 * 3600))
  const hoursSeconds = s - day * 24 * 3600
  const hour = Math.floor(hoursSeconds / 3600)
  const minute = Math.floor((hoursSeconds - hour * 3600) / 60)
  const num = hoursSeconds - hour * 3600 - minute * 60
  const second = Math.floor(num)
  const millisecond = Number((num % 1).toFixed(3)) * 1000

  return {
    day,
    hour,
    minute,
    second,
    millisecond
  }
}

export function friendlytime(datetime: string) {
  return moment(datetime).fromNow()
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function EMPTY_FUNCTION() {}
