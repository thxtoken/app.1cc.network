import { floor } from 'lodash'
import { CSSProperties } from 'react'

type StyleType<T> = { [P in keyof T]: CSSProperties }

export const SCALE = window.innerWidth >= 1980 ? 1 : 0.8

export function scale(size?: number, unit = 'px') {
  if (!size) {
    return 0
  }

  return floor(size * SCALE) + unit
}

export default class StyleSheet {
  static create<T extends StyleType<T>>(css: StyleType<T>) {
    return css
  }

  static flatten<T>(arr: T[]): CSSProperties {
    return arr.reduce((previousValue, currentValue) => ({ ...previousValue, ...currentValue }))
  }

  static inject(style: string) {
    const styleElement = document.createElement('style')
    let styleSheet = styleElement.sheet
    document.head.appendChild(styleElement)
    styleSheet = styleElement.sheet
    styleSheet?.insertRule(style, styleSheet.cssRules.length)
  }
}
