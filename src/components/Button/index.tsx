import React from 'react'

import StyleSheet, { scale } from '@/libs/StyleSheet'

import CircleLoading from '../Loading/CircleLoading'
import css from './index.module.less'

interface Props {
  width: number
  height: number
  title: string | React.ReactElement
  borderRadius?: number
  style?: React.CSSProperties
  titleStyle?: React.CSSProperties
  className?: string
  danger?: boolean
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

const Button: React.FC<Props> = ({
  width,
  height,
  title,
  style = {},
  titleStyle = {},
  danger = false,
  className,
  borderRadius,
  disabled,
  loading = false,
  onClick = () => {}
}) => {
  const buttonStyle = {
    width: scale(width),
    height: scale(height),
    borderRadius: scale(borderRadius),
    opacity: disabled ? 0.6 : 1
  }

  const onPress = () => {
    if (!disabled) {
      onClick()
    }
  }

  return (
    <button
      className={[css.button, className, danger && css.danger].join(' ')}
      style={StyleSheet.flatten([buttonStyle, style])}
      onClick={onPress}>
      {loading && <CircleLoading loading />}
      {!loading && (
        <div className={css.title} style={StyleSheet.flatten([styles.title, titleStyle])}>
          {title}
        </div>
      )}
    </button>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: scale(16),
    overflow: 'hidden'
  }
})

export default Button
