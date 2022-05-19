export default class Timer {
  static timers: { [key: number]: any } = {}
  static lastTimer: NodeJS.Timeout

  static getAll() {
    return Object.values(Timer.timers)
  }

  public static start(callback: () => void, ms: number) {
    const id = setTimeout(callback, ms)
    Timer.timers[id as any] = id
    Timer.lastTimer = id
    return id
  }

  public static cancel(id: NodeJS.Timeout = Timer.lastTimer) {
    clearTimeout(id)
  }

  public static cancelAll() {
    for (const id of Timer.getAll()) {
      Timer.cancel(id)
    }
  }
}
