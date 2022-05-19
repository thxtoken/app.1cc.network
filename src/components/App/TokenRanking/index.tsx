import React, { useState } from 'react'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { TokenRankingTabs } from '@/types/ranking'

import css from './index.module.css'
import TokenRankingHeaderTab from './TokenRankingHeaderTab'
import TokenRankingListDaily from './TokenRankingListDaily'
import TokenRankingListRandom from './TokenRankingListRandom'

const TokenRanking: React.FC = () => {
  const [tab, setTab] = useState(TokenRankingTabs.Leaderboard)

  return (
    <div style={styles.container} className={css.container}>
      <TokenRankingHeaderTab onTabChange={setTab} />
      {tab === TokenRankingTabs.Leaderboard && <TokenRankingListDaily />}
      {tab === TokenRankingTabs.RandomAccess && <TokenRankingListRandom />}
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#1B1E26',
    flexDirection: 'column',
    alignItems: 'center',
    width: scale(527),
    borderRadius: scale(64),
    marginLeft: scale(24),
    paddingBottom: scale(24),
    paddingTop: scale(20)
  }
})

export default TokenRanking
