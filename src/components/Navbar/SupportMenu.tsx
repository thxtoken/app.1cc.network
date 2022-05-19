import React from 'react'
import { Dropdown, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { NavbarStyles } from '.'

const SupportMenu: React.FC = () => {
  const styles = NavbarStyles
  const active = ['/faq'].includes(useLocation().pathname)
  const activeLinkStyle = active ? { color: '#FFF' } : {}
  const { t } = useTranslation()

  return (
    <Dropdown
      className="navbar-dropdown"
      overlay={MenuItems}
      trigger={['click']}
      placement="top"
      arrow>
      <div style={{ ...styles.link, ...activeLinkStyle }}>
        {t('navbar.support')} <CaretDownOutlined style={styles.dropdownArrow} />
      </div>
    </Dropdown>
  )
}

const MenuItems: any = () => {
  const styles = NavbarStyles
  const menus = [{ key: 'faq', name: 'FAQ' }]

  return (
    <Menu style={styles.menu} className="navbar-dropdown-menu">
      {menus.map(menu => (
        <Menu.Item key={menu.key} style={styles.menuItem}>
          <Link to={menu.key}>
            <div style={styles.menuItemName}>{menu.name}</div>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default SupportMenu
