import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { TokenRankingTabs } from '@/types/ranking'

interface Props {
  onTabChange: (tab: TokenRankingTabs) => void
}

const TokenRankingHeaderTab: React.FC<Props> = ({ onTabChange }) => {
  const [activeMenu, setActiveMenu] = useState(TokenRankingTabs.Leaderboard)
  const { t } = useTranslation()

  useEffect(() => {
    onTabChange(activeMenu)
  }, [activeMenu, onTabChange])

  const menus = [TokenRankingTabs.Leaderboard, TokenRankingTabs.RandomAccess]

  return (
    <header style={styles.container}>
      {menus.map(menu => (
        <div
          style={StyleSheet.flatten([styles.menu, activeMenu === menu && styles.active])}
          key={menu}>
          <label style={styles.label} onClick={() => setActiveMenu(menu)}>
            {t(`ranking.${menu}`)}
          </label>
        </div>
      ))}
    </header>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: scale(479)
  },
  menu: {
    flex: 1,
    textAlign: 'center',
    height: scale(60),
    lineHeight: scale(40),
    opacity: '0.4',
    fontSize: scale(18)
  },
  label: {
    cursor: 'pointer'
  },
  active: {
    opacity: 1,
    fontWeight: 'bold'
  }
})

export default TokenRankingHeaderTab
