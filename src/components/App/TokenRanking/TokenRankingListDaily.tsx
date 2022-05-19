import React, { useEffect, useState } from 'react'
import { debounce, floor } from 'lodash'

import SingleList from '@/components/SingleList'
import StyleSheet, { scale } from '@/libs/StyleSheet'

import TokenRankingListItem from './TokenRankingListItem'

const TokenRankingListDaily: React.FC = () => {
  const [perPage, setPerPage] = useState(getPage())

  useEffect(() => {
    const onresize = () => setPerPage(getPage())
    window.onresize = debounce(onresize, 1000)
  }, [])

  return (
    <div style={styles.container}>
      <SingleList
        api="leaderboards"
        perPage={perPage}
        itemView={TokenRankingListItem}
        formatMethod={data => data.leaderboards}
      />
    </div>
  )
}

const getPage = () => {
  const count = floor((window.innerHeight - Number(scale(250, ''))) / Number(scale(104, '')))

  if (count < 5) {
    return 5
  }

  if (count > 20) {
    return 20
  }

  return count
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    overflowY: 'scroll',
    width: '100%'
  },
  loading: {
    paddingTop: scale(15)
  }
})

export default TokenRankingListDaily
