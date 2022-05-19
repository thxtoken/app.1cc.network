import React from 'react'
import AnimatedNumber from 'react-awesome-animated-number'
import { floor } from 'lodash'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useMe } from '@/libs/hooks'

import Button from '../Button'
import MetaMaskAvatar from '../MetaMaskAvatar'
import TransactionsPopup from '../Popups/TransactionsPopup'
import UserProfilePopup from '../Popups/UserProfilePopup'

const NavbarUser: React.FC = () => {
  const user = useMe()
  const onPress = () => UserProfilePopup.show()

  if (!user) {
    return null
  }

  const tokens = floor(user.tokens, 2).toString()

  const ButtonTitle = <AnimatedNumber value={Number(tokens)} size={Number(scale(14, ''))} />

  return (
    <div style={styles.container}>
      <Button
        width={90 + tokens.length * 4}
        height={48}
        title={ButtonTitle}
        borderRadius={40}
        style={styles.connectBtn}
        onClick={TransactionsPopup.show}
      />
      <MetaMaskAvatar
        size={scale(48, '')}
        account={user.address}
        style={styles.avatar}
        onClick={onPress}
      />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: scale(10),
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(48)
  },
  connectBtn: {
    backgroundColor: 'transparent',
    borderColor: '#1ADEED',
    marginLeft: scale(20),
    borderWidth: scale(2)
  },
  avatar: {
    marginLeft: scale(16)
  }
})

export default NavbarUser
