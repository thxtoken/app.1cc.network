import React from 'react'

import TokenCollectionLogItem from '@/components/App/TokenCollectionLogs/TokenCollectionLogItem'
import StyleSheet, { scale } from '@/libs/StyleSheet'

import SingleList from '../SingleList'
import { Dialog } from '../DialogProvider'

const TokenCollectionsPopup = {
  show: () => {
    Dialog.open({
      children: <TokenCollectionsDialog />,
      width: scale(600)
    })
  }
}

const TokenCollectionsDialog: React.FC = () => {
  const ListItemView = ({ data }: any) => <TokenCollectionLogItem data={data} style={styles.item} />
  return (
    <SingleList
      api="bubble-collections"
      itemView={ListItemView}
      formatMethod={data => data.bubbleCollections}
      perPage={20}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: scale(580),
    maxHeight: scale(580),
    overflowY: 'scroll',
    marginTop: scale(30),
    marginBottom: scale(30),
    paddingLeft: scale(12),
    paddingRight: scale(12),
    display: 'flex'
  },
  item: {
    marginBottom: scale(16)
  }
})

export default TokenCollectionsPopup
