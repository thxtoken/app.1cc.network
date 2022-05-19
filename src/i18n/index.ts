import enUS from 'antd/lib/locale/en_US'
import zhCN from 'antd/lib/locale/zh_CN'
import zhTW from 'antd/lib/locale/zh_TW'
import moment from 'moment'
import { initReactI18next } from 'react-i18next'
import { find } from 'lodash'

import Storage from '../services/storage'
import translations from './translations'

import i18n from 'i18next'

const DEFAULT_LANGUAGE = 'en_us'

export const LANGUAGES = [
  { key: 'en_us', name: 'English', show: 'EN' },
  { key: 'zh_cn', name: '简体中文', show: 'ZH' },
  { key: 'zh_tw', name: '繁體中文', show: 'ZH' }
]

i18n.use(initReactI18next).init({
  resources: translations,
  lng: getLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false
  }
})

export function getLanguage() {
  return Storage.get('language') || DEFAULT_LANGUAGE
}

export function getLanguageName() {
  const language = find(LANGUAGES, { key: getLanguage() })
  return language ? language.name : DEFAULT_LANGUAGE
}

export function getAntdLocale() {
  const language = getLanguage()
  const languagesMap = {
    en_us: enUS,
    zh_cn: zhCN,
    zh_tw: zhTW
  }
  // @ts-ignore
  return languagesMap[language]
}

export function getGitbookLink() {
  const language = getLanguage()
  const languagesMap = {
    en_us: 'https://thxtoken.gitbook.io/1cc-docs',
    zh_cn: 'https://thxtoken.gitbook.io/1cc-docs/v/1cc-zhong-wen-jian-ti',
    zh_tw: 'https://thxtoken.gitbook.io/1cc-docs/v/1cc-zhong-wen-fan-ti'
  }
  // @ts-ignore
  return languagesMap[language]
}

export function initMomentLocale() {
  const language = getLanguage()
  require('moment/locale/en-gb')
  require('moment/locale/zh-cn')
  require('moment/locale/zh-tw')
  moment.locale(language)
}

initMomentLocale()

export default i18n
