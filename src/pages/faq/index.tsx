import React from 'react'

import Post from '@/components/Post'
import StyleSheet, { scale } from '@/libs/StyleSheet'

const FAQPage: React.FC = () => {
  return <Post slug="faq" style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    maxWidth: scale(1200),
    margin: '0 auto',
    paddingBottom: scale(50)
  }
})

export default FAQPage
