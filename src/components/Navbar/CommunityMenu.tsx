import React from 'react'
import { Dropdown, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import StyleSheet, { scale } from '@/libs/StyleSheet'

import { NavbarStyles } from '.'

const CommunityMenu: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Dropdown
      className="navbar-dropdown"
      overlay={MenuItems}
      trigger={['click']}
      placement="top"
      arrow>
      <div style={{ ...NavbarStyles.link, ...styles.link }}>
        <div style={styles.title}>{t('navbar.community')}</div>
        <CaretDownOutlined style={NavbarStyles.dropdownArrow} />
      </div>
    </Dropdown>
  )
}

const MenuItems: any = () => {
  const styles = NavbarStyles

  return (
    <Menu style={styles.menu} className="navbar-dropdown-menu">
      {communitys.map(community => (
        <Menu.Item
          key={community.key}
          onClick={() => window.open(community.url)}
          style={styles.menuItem}>
          <div style={styles.menuItemName}>{community.name}</div>
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
    justifyContent: 'space-between'
  },
  title: {
    display: 'flex',
    marginRight: scale(5)
  }
})

const communitys = [
  { key: 'discord', name: 'Discord', url: 'https://discord.gg/5MkyQh4KqE' },
  { key: 'twitter', name: 'Twitter', url: 'https://twitter.com/1ccnetwork' },
  { key: 'github', name: 'Github', url: 'https://github.com/thxtoken' }
]

export default CommunityMenu
