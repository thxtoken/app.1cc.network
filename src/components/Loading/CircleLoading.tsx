import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { scale } from '@/libs/StyleSheet'

interface Props {
  loading: boolean
  size?: number
  color?: string
}

const CircleLoading: React.FC<Props> = ({ loading, size = 20, color = '#1ADEED' }) => {
  if (!loading) {
    return null
  }

  return <Spin indicator={<LoadingOutlined style={{ fontSize: scale(size), color }} spin />} />
}

export default CircleLoading
