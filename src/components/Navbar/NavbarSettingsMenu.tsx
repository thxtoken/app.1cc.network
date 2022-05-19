import React from 'react'

import NavMenuIcon from '@/assets/images/nav-menu.svg'
import StyleSheet, { scale } from '@/libs/StyleSheet'

import SettingsPopup from '../Popups/SettingsPopup'

const NavbarSettingsMenu: React.FC = () => {
  const onPress = () => SettingsPopup.show()

  return (
    <div style={styles.container} onClick={() => onPress()}>
      <img src={NavMenuIcon} style={styles.menu} alt="menu" />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: scale(12),
    paddingRight: scale(12),
    cursor: 'pointer'
  },
  menu: {
    width: scale(28),
    height: scale(28)
  }
})

export default NavbarSettingsMenu
