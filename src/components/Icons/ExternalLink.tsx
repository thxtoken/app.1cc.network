import React from 'react'

import { scale } from '@/libs/StyleSheet'

interface Props {
  size: number
}

const ExternalLink: React.FC<Props> = ({ size }) => {
  const style = {
    width: scale(size),
    height: scale(size),
    marginLeft: scale(5)
  }

  return (
    <img src={require('@/assets/images/external-link-line.png')} style={style} alt="ExternalLink" />
  )
}

export default ExternalLink
