import jazzicon from '@metamask/jazzicon'
import React, { CSSProperties, useEffect, useRef } from 'react'

interface Props {
  account: string
  size: number | string
  style?: CSSProperties
  onClick?: (address: string) => void
}

const MetaMaskAvatar: React.FC<Props> = ({ account, size, style, onClick }) => {
  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = avatarRef.current
    if (element && account) {
      const addr = account.slice(2, 10)
      const seed = parseInt(addr, 16)
      const icon = jazzicon(size, seed)
      if (element.firstChild) {
        element.removeChild(element.firstChild)
      }
      element.appendChild(icon)
    }
  }, [account, avatarRef, size])

  return (
    <div
      style={{
        display: 'flex',
        width: size + 'px',
        height: size + 'px',
        overflow: 'hidden',
        ...style
      }}
      ref={avatarRef}
      onClick={() => onClick && onClick(account)}
    />
  )
}

export default MetaMaskAvatar
