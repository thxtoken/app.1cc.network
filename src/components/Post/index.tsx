import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'
import { Spin } from 'antd'

import StyleSheet, { scale } from '@/libs/StyleSheet'

const marked = require('marked/marked.min.js')

interface Props {
  slug: string
  url?: string
  style?: React.CSSProperties
  contentStyle?: React.CSSProperties
}

const Post: React.FC<Props> = ({ slug, url, style, contentStyle }) => {
  const [post, setPost] = useState('')

  const { i18n } = useTranslation()

  const fetchData = useCallback(async () => {
    setPost('')
    const docsLink = process.env.REACT_APP_GITHUB_USER_CONTENT_DOCS_URL
    const docsFile = `${slug}.${i18n.language}.md`
    const docsUrl = `${docsLink}/${docsFile}`
    const api = url || docsUrl
    const response = await axios.get(api)
    setPost(marked(response.data as string))
  }, [i18n.language, slug, url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="markdown-body" style={StyleSheet.flatten([styles.container, style])}>
      {isEmpty(post) && (
        <div style={styles.loading}>{isEmpty(post) && <Spin size="default" />}</div>
      )}
      <article
        style={StyleSheet.flatten([styles.content, contentStyle])}
        dangerouslySetInnerHTML={{ __html: post }}></article>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: scale(50)
  },
  loading: {
    padding: scale(50),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    fontSize: scale(20),
    lineHeight: scale(30)
  }
})

export default Post
