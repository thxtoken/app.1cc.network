/// <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '@metamask/jazzicon'
declare module 'marked'

interface NavigateFunction {
  (to: To, options?: NavigateOptions): void
  (delta: number): void
}

interface Window {
  ethereum: any
  app: any
}
