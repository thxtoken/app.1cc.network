import React from 'react'
import { useTranslation } from 'react-i18next'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { BubbleType } from '@/types/bubble'
import Typewriter from 'typewriter-effect'
import { me } from '@/services/auth'

interface Props {
  address?: string
  bubbles: BubbleType[]
}

const TokenCollectionEmpty: React.FC<Props> = ({ address, bubbles }) => {
  const { t, i18n } = useTranslation()

  if (bubbles.length) {
    return null
  }

  if (address && address !== me()?.address) {
    return (
      <div style={styles.container}>
        <em style={styles.emptyText}>{t('bubble.empty_placeholder')}</em>
      </div>
    )
  }

  if (i18n.language === 'zh_cn') {
    return (
      <div style={styles.container}>
        <div style={StyleSheet.flatten([styles.emptyText, styles.zh])}>
          <Typewriter
            onInit={typewriter => {
              typewriter
                .typeString('无论是历史、现在还是将来')
                .typeString('<br />')
                .typeString('任何一笔以太坊 Gas fee 的花费，都将催生一颗 $1CC Bubble 的诞生')
                .typeString('<br />')
                .typeString('一颗 $1CC Bubble 的生命是短暂的，从诞生到永久消失只有120个小时')
                .typeString('<br />')
                .typeString('一颗 $1CC Bubble 诞生24小时后，它将成熟，可以供我们进行采集')
                .typeString('<br />')
                .typeString('完成采集的 $1CC Bubble，将正式成为 $1CC Token，永久归你所有')
                .typeString('<br />')
                .typeString('... ...')
                .typeString('<br />')
                .typeString('噢，对了！ $1CC 总量有限，未来诞生的 $1CC Bubble 会越来越小')
                .typeString('<br />')
                .typeString('如果你没有可以采集的 $1CC Bubble，可以访问其他人的主页进行采集')
                .typeString('<br />')
                .typeString('呐， $1CC Bubble 为什么诞生？可以点击右上角“项目简介”了解更多')
                .typeString('<br />')
                .start()
            }}
            options={{ delay: 50 }}
          />
        </div>
      </div>
    )
  }

  if (i18n.language === 'zh_tw') {
    return (
      <div style={StyleSheet.flatten([styles.emptyText, styles.zh])}>
        <Typewriter
          onInit={typewriter => {
            typewriter
              .typeString('無論是歷史、現在還是將來')
              .typeString('<br />')
              .typeString('任何一筆以太坊 Gas fee 的花費，都將催生一顆 $1CC Bubble 的誕生')
              .typeString('<br />')
              .typeString('一顆 $1CC Bubble 的生命是短暫的，從誕生到永久消失只有120個小時')
              .typeString('<br />')
              .typeString('一顆 $1CC Bubble 誕生24小時後，她將成熟，可以供我們進行採集')
              .typeString('<br />')
              .typeString('完成採集的 $1CC Bubble，將正式成為 $1CC Token，永久歸你所有')
              .typeString('<br />')
              .typeString('... ...')
              .typeString('<br />')
              .typeString('噢，對了！ $1CC 總量有限，未來誕生的 $1CC Bubble 會越來越小')
              .typeString('<br />')
              .typeString('如果你沒有可以採集的 $1CC Bubble，可以訪問其他人的主頁進行採集')
              .typeString('<br />')
              .typeString('吶， $1CC Bubble 為什麼誕生？可以點擊右上角“項目简介”了解更多')
              .typeString('<br />')
              .start()
          }}
          options={{ delay: 50 }}
        />
      </div>
    )
  }

  return (
    <div style={styles.emptyText}>
      <Typewriter
        onInit={typewriter => {
          typewriter
            .typeString('No matter if it is in the past, now or in the future.')
            .typeString('<br />')
            .typeString(
              'Any transaction with gas costs in the ethereum will generate one $1CC bubble.'
            )
            .typeString('<br />')
            .typeString(
              'A $1CC bubble has a brief life, which only lasts for 120 hours since its birth.'
            )
            .typeString('<br />')
            .typeString('A $1CC bubble will be ready for collecting after 24 hours of its birth.')
            .typeString('<br />')
            .typeString(
              'The collected $1CC bubble will be officially transformed into a $1CC token and you can own it forever.'
            )
            .typeString('<br />')
            .typeString('......')
            .typeString('<br />')
            .typeString(
              'Oh, right! $1CC bubbles generated in the future will become smaller and smaller due to the limited supply of $1CC.'
            )
            .typeString('<br />')
            .typeString(
              'If you do not have any available $1CC bubbles to collect, please visit other people’s homepages to have a look.'
            )
            .typeString('<br />')
            .typeString('What is the purpose of generating $1CC bubbles? ')
            .typeString('<br />')
            .typeString('Please click the ‘About’ on the upper left corner for more information.')
            .typeString('<br />')
            .start()
        }}
        options={{ delay: 50 }}
      />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: scale(22),
    lineHeight: scale(40),
    fontFamily: 'Rajdhani',
    textAlign: 'center'
  },
  zh: {
    fontSize: scale(16),
    fontFamily: 'JDZhongHei'
  }
})

export default TokenCollectionEmpty
