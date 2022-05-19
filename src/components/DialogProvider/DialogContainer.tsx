import React from 'react'
import { Modal } from 'antd'

import StyleSheet from '@/libs/StyleSheet'

import IconClose from '../Icons/CloseIcon'
import { DialogParams } from '.'

/**
 * MUI - How to open Dialog imperatively/programmatically
 * https://stackoverflow.com/questions/63737526/mui-how-to-open-dialog-imperatively-programmatically
 * Modal 组件的入场动画
 * https://github.com/ant-design/ant-design/issues/16435
 */

type DialogContainerProps = DialogParams & {
  onClose: () => void
  onKill: () => void
}

const DialogContainer = (props: DialogContainerProps) => {
  const { children, open, onClose, onKill, ...options } = props

  return (
    <Modal
      centered
      visible={open}
      onCancel={onClose}
      afterClose={onKill}
      style={styles.container}
      bodyStyle={styles.body}
      closeIcon={<IconClose size={24} />}
      footer={null}
      transitionName="ant-move-down"
      {...options}>
      {children}
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: '20px',
    overflow: 'hidden'
  },
  body: {
    backgroundColor: '#1B1E26'
  }
})

export default DialogContainer
