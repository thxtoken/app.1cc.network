import React, { useCallback, useEffect } from 'react'
import { Spin } from 'antd'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import HTTP from '@/services/http'
import StyleSheet, { scale } from '@/libs/StyleSheet'
import { useRef } from 'react'
import { EMPTY_FUNCTION } from '@/libs/utlis'
import { useStateIfMounted } from 'use-state-if-mounted'

interface Props {
  api: string
  params?: any
  itemView: React.FC<any>
  emptyView?: React.FC<any>
  footerView?: React.FC<any> | null
  style?: React.CSSProperties
  perPage?: number
  loading?: boolean
  formatMethod: (data: any) => any[]
}

const SingleList: React.FC<Props> = props => {
  const [list, setList] = useStateIfMounted<any[]>([])
  const [loading, setLoading] = useStateIfMounted(props.loading)
  const [canLoadingMore, setCanLoadingMore] = useStateIfMounted(true)
  const [page, setPage] = useStateIfMounted(1)
  const { t } = useTranslation()

  const per_page = props.perPage || 10
  const loadingMore = loading && !isEmpty(list)
  const showLoading = loading && isEmpty(list)
  const showLoadingMore = canLoadingMore && !loading && props.footerView === undefined

  const fetchDataRef = useRef(EMPTY_FUNCTION)

  const fetchData = useCallback(async () => {
    setLoading(props.loading === undefined ? true : props.loading)

    try {
      const response = await HTTP.get(props.api, {
        params: {
          ...props.params,
          page,
          per_page
        }
      })

      const data = props.formatMethod(response.data)

      setLoading(false)
      setList(page === 1 ? data : list.concat(data))

      data.length < per_page ? setCanLoadingMore(false) : setPage(page + 1)

      return data
    } catch (error) {
      console.log(error)
      setLoading(false)
      setCanLoadingMore(false)
      return []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, page, per_page, props])

  fetchDataRef.current = fetchData

  const refresh = () => {
    setPage(1)
    setList([])
    setLoading(false)
    fetchDataRef?.current()
  }

  useEffect(() => {
    fetchDataRef?.current()
  }, [])

  return (
    <div style={{ ...styles.container, ...props.style }}>
      {showLoading && <Spin style={styles.loading} />}
      {list.map(item => (
        <props.itemView data={item} key={item?.id ? item.id : JSON.stringify(item)} />
      ))}
      {loadingMore && (
        <div style={styles.footer}>
          <Spin style={styles.loading} />
        </div>
      )}
      {showLoadingMore && (
        <div style={styles.footer} onClick={() => fetchData()}>
          <span>{t('common.click_show_more')}</span>
        </div>
      )}
      {props.footerView && <props.footerView loading={loading} refresh={refresh} />}
      {!loading && isEmpty(list) && props.emptyView && <props.emptyView />}
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  loading: {
    paddingTop: scale(15)
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    minHeight: scale(50),
    marginBottom: scale(20)
  }
})

export default SingleList
