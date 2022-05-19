import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { NavbarStyles } from '.'

interface Props {
  name: string
  route: string
}

const NavbarMenuItem: React.FC<Props> = ({ name, route }) => {
  const active = route === useLocation().pathname
  const activeLinkStyle = active ? { color: '#FFF' } : {}

  if (route.startsWith('http')) {
    return (
      <div style={{ ...NavbarStyles.link, ...activeLinkStyle }} onClick={() => window.open(route)}>
        {name}
      </div>
    )
  }

  return (
    <Link to={route}>
      <div style={{ ...NavbarStyles.link, ...activeLinkStyle }}>{name}</div>
    </Link>
  )
}

export default NavbarMenuItem
