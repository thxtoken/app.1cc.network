import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'

import TokenCollectionsPopup from '@/components/Popups/TokenCollectionsPopup'
import SingleList from '@/components/SingleList'
import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useMe } from '@/libs/hooks'

import TokenCollectionLogItem from './TokenCollectionLogItem'

const TokenCollectionLogs: React.FC = () => {
  const user = useMe()
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  if (!user) {
    return null
  }

  return (
    <div style={styles.container}>
      <SingleList
        api="bubble-collections"
        itemView={TokenCollectionLogItem}
        footerView={null}
        formatMethod={data => {
          setShow(!isEmpty(data.bubbleCollections))
          return data.bubbleCollections
        }}
        perPage={3}
        loading={false}
      />
      {show && (
        <div style={styles.more} onClick={() => TokenCollectionsPopup.show()}>
          {t('common.show_more')}
        </div>
      )}
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: scale(40),
    bottom: scale(40),
    width: scale(500),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  more: {
    marginLeft: scale(32),
    marginTop: scale(10),
    fontSize: scale(14),
    lineHeight: scale(22),
    color: '#FFF',
    opacity: '0.4',
    cursor: 'pointer'
  }
})

export default React.memo(TokenCollectionLogs)
