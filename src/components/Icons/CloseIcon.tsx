import React, { CSSProperties } from 'react'

import { scale } from '@/libs/StyleSheet'

interface Props {
  size: number
  style?: CSSProperties
}

const IconClose: React.FC<Props> = ({ size, style }) => {
  return (
    <img
      src={require('@/assets/images/close_icon.png')}
      style={{ width: scale(size), height: scale(size), ...style }}
      alt="close"
    />
  )
}

export default IconClose
