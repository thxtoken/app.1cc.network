import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { getGitbookLink } from '@/i18n'

import CommunityMenu from './CommunityMenu'
import ConnectWallet from './ConnectWallet'
import LanguageMenu from './LanguageMenu'
import NavbarLoading from './NavbarLoading'
import NavbarMenuItem from './NavbarMenuItem'
import NavbarSettingsMenu from './NavbarSettingsMenu'
import NavbarUser from './NavbarUser'

const Navbar: React.FC = () => {
  const styles = NavbarStyles

  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    window.app.navigate = navigate
  }, [navigate])

  return (
    <nav style={styles.container}>
      <Link to="/">
        <div style={styles.brand}>
          <img src={require('@/assets/images/logo.png')} alt="logo" style={styles.logo} />
          <span style={styles.brandText}>cc.network</span>
        </div>
      </Link>
      <menu style={styles.menus}>
        <NavbarLoading />
        <LanguageMenu />
        <CommunityMenu />
        <NavbarMenuItem name={t('navbar.about')} route={getGitbookLink()} />
        <NavbarUser />
        <ConnectWallet />
        <NavbarSettingsMenu />
      </menu>
    </nav>
  )
}

export const NavbarStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#22252D',
    padding: '0 ' + scale(48),
    marginBottom: scale(20),
    borderBottom: '1px solid #313131',
    minHeight: scale(80),
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  brand: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer'
  },
  brandText: {
    fontSize: scale(38),
    marginLeft: scale(8),
    color: '#1ADEED',
    fontFamily: 'Expressa',
    marginTop: scale(-5)
  },
  logo: {
    width: scale(40),
    height: scale(40)
  },
  menus: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  link: {
    color: '#afbaca',
    fontSize: scale(21),
    fontWeight: '500',
    marginLeft: scale(15),
    marginRight: scale(15),
    opacity: 0.8,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  dropdownArrow: {
    fontSize: scale(16),
    cursor: 'pointer'
  },
  menu: {
    borderRadius: scale(6)
  },
  menuItem: {
    width: scale(200),
    height: scale(50),
    textAlign: 'left',
    fontSize: scale(18),
    fontWeight: 'bold'
  },
  menuItemName: {
    paddingLeft: scale(10),
    paddingRight: scale(10)
  }
})

export default Navbar
