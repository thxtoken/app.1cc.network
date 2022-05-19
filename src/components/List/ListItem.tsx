import React from 'react'

import StyleSheet, { scale } from '@/libs/StyleSheet'

interface Props {
  title: string
  value: string | React.ReactElement
  onClick?: () => void
}

const ListItem: React.FC<Props> = ({ title, value, onClick }) => {
  return (
    <div style={styles.container}>
      <span style={styles.title}>{title}</span>
      <span
        style={StyleSheet.flatten([styles.value, onClick && { cursor: 'pointer' }])}
        onClick={() => onClick && onClick()}>
        {value}
      </span>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(50),
    borderBottom: '1px solid #333'
  },
  title: {
    color: 'white',
    fontSize: scale(20),
    opacity: 0.6
  },
  value: {
    color: 'white',
    fontSize: scale(20),
    fontFamily: 'JDZhengHT'
  }
})

export default ListItem
