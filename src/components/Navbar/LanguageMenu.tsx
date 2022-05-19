import React from 'react'
import { Dropdown, Menu } from 'antd'
import { CaretDownOutlined, GlobalOutlined } from '@ant-design/icons'
import { find } from 'lodash'

import Storage from '@/services/storage'
import store from '@/store'
import StyleSheet, { scale } from '@/libs/StyleSheet'

import { NavbarStyles } from '.'
import { LANGUAGES } from '@/i18n'

const LanguageMenu: React.FC = () => {
  let language = find(LANGUAGES, { key: store.language })

  if (!language) {
    language = LANGUAGES[0]
  }

  return (
    <Dropdown
      className="navbar-dropdown"
      overlay={MenuItems}
      trigger={['click']}
      placement="top"
      arrow>
      <div style={{ ...NavbarStyles.link, ...styles.link }}>
        <GlobalOutlined />
        <div style={styles.language}>{language.show}</div>
        <CaretDownOutlined style={NavbarStyles.dropdownArrow} />
      </div>
    </Dropdown>
  )
}

const MenuItems: any = () => {
  const styles = NavbarStyles

  const setLanguage = (language: string) => {
    Storage.set('language', language)
    window.location.reload()
    // store.language = language
    // i18n.changeLanguage(language)
    // resetHttpClient()
  }

  return (
    <Menu style={styles.menu} className="navbar-dropdown-menu">
      {LANGUAGES.map(language => (
        <Menu.Item
          key={language.key}
          onClick={() => setLanguage(language.key)}
          style={styles.menuItem}>
          <div style={styles.menuItemName}>{language.name}</div>
        </Menu.Item>
      ))}
    </Menu>
  )
}

const styles = StyleSheet.create({
  link: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.4
  },
  language: {
    display: 'flex',
    marginRight: scale(5),
    marginLeft: scale(8)
  }
})

export default LanguageMenu
