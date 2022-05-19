import React from 'react'

import StyleSheet, { scale } from '@/libs/StyleSheet'

import MetaMaskAvatar from '../MetaMaskAvatar'
import { Dialog } from '../DialogProvider'

export class Avatar {
  static show(address: string) {
    Dialog.open({
      children: <MetaMaskAvatar account={address} size={200} style={styles.avatar} />,
      width: scale(360),
      bodyStyle: styles.body,
      transitionName: 'ant-zoom-big'
    })
  }
}

const styles = StyleSheet.create({
  avatar: {
    margin: scale(40)
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1E26'
  }
})

export default Avatar
