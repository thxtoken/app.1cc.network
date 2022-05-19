import React from 'react'
import { useTranslation } from 'react-i18next'

import Post from '@/components/Post'
import StyleSheet, { scale } from '@/libs/StyleSheet'

import css from './index.module.css'

const ABOUT_TEXT = {
  en_us: require('@/assets/images/about_text_en.png'),
  zh_cn: require('@/assets/images/about_text_zh.png'),
  zh_tw: require('@/assets/images/about_text_zh_tw.png')
}

const AboutPage: React.FC = () => {
  const { i18n } = useTranslation()

  /// @ts-ignore
  const aboutImage = ABOUT_TEXT[i18n.language]

  return (
    <div className={css.container} style={styles.container}>
      <div className={css.header} style={styles.headerImage}>
        <img
          src={require('@/assets/images/about_header_bg.png')}
          className={css.headerImage}
          style={styles.headerImage}
          alt="About Background"
        />
        <img
          src={aboutImage}
          className={css.aboutText}
          style={{
            ...styles.aboutText,
            width: scale(i18n.language === 'en' ? 510 * 0.5 : 448 * 0.5)
          }}
          alt="About"
        />
      </div>
      <Post slug="about" />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: scale(1200),
    margin: '0 auto',
    paddingTop: scale(15)
  },
  headerImage: {
    minHeight: scale(200),
    maxHeight: scale(200),
    borderRadius: scale(10),
    backgroundColor: '#732f74'
  },
  aboutText: {
    width: scale(448 * 0.5),
    height: scale(109 * 0.5)
  }
})

export default AboutPage
