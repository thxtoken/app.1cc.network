import React from 'react'

import StyleSheet from '@/libs/StyleSheet'

import ExternalLink from '../Icons/ExternalLink'

interface Props {
  text: string
  url: string
}

const ListItemLink: React.FC<Props> = ({ text, url }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="link" style={styles.container}>
      {text}
      <ExternalLink size={20} />
    </a>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ListItemLink
