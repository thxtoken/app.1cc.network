import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'

import TokenRanking from '@/components/App/TokenRanking'
import StyleSheet, { scale } from '@/libs/StyleSheet'

import TokenCollection from '../../components/App/TokenCollection'
import css from './index.module.css'

const spaceHeight = Number(scale(120, ''))

const HomePage: React.FC = () => {
  const [height, setHeight] = useState(window.innerHeight - spaceHeight)

  useEffect(() => {
    const onresize = () => setHeight(window.innerHeight - spaceHeight)
    window.onresize = debounce(onresize, 50)
  }, [])

  return (
    <div className={css.container} style={{ ...styles.container, maxHeight: height + 'px' }}>
      <TokenCollection />
      <TokenRanking />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    minHeight: scale(800)
  }
})

export default HomePage
