import React, { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import store from '@/store'
import StyleSheet, { scale } from '@/libs/StyleSheet'

const NavbarLoading: React.FC = () => {
  const { loading } = store

  useEffect(() => {
    loading && setTimeout(() => (store.loading = false), 5000)
  }, [loading])

  if (!loading) {
    return null
  }

  return (
    <Spin
      style={styles.container}
      delay={100}
      indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    margin: '0 ' + scale(20)
  }
})

export default NavbarLoading
