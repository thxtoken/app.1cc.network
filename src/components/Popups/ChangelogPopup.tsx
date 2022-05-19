import React from 'react'

import StyleSheet, { scale } from '@/libs/StyleSheet'

import Post from '../Post'
import { Dialog } from '../DialogProvider'

const ChangelogPopup = {
  show: () => {
    Dialog.open({
      children: <ChangelogDialog />,
      width: scale(560),
      bodyStyle: styles.body,
      transitionName: 'ant-zoom-big'
    })
  }
}

const ChangelogDialog: React.FC = () => {
  const url = process.env.REACT_APP_GITHUB_USER_CONTENT_URL + 'main/CHANGELOG.md'

  return (
    <div style={styles.container} className="changelog-popup">
      <Post slug="about" contentStyle={styles.content} url={url} />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    height: scale(500),
    overflowY: 'scroll'
  },
  body: {
    backgroundColor: '#1B1E26',
    padding: scale(30)
  },
  content: {
    fontSize: scale(18)
  }
})

export default ChangelogPopup
