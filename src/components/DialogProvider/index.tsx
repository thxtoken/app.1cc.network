import React, { useRef, useState } from 'react'
import { ModalProps } from 'antd'

import DialogContainer from './DialogContainer'

export type DialogParams = {
  children: React.ReactNode
  open: boolean
  onClose?: Function
  onExited?: Function
}

export type DialogInstance = {
  close: Function
}

type DialogOption = Omit<DialogParams, 'open'> & Partial<ModalProps>
type ProviderContext = readonly [(option: DialogOption) => void, () => void]

const EMPTY_FUNC = () => {}

const DialogContext = React.createContext<ProviderContext>([EMPTY_FUNC, EMPTY_FUNC])

const DialogProvider: React.FC = ({ children }) => {
  const [dialogs, setDialogs] = useState<DialogParams[]>([])

  const createDialog = (option: DialogOption) => {
    const dialog = { ...option, open: true }
    const dialogInstance = {
      close: () => setDialogs([...dialogs, { ...dialog, open: false }])
    }
    setDialogs(dialogs => [...dialogs, dialog])
    return dialogInstance
  }

  const closeDialog = () => {
    setDialogs(dialogs => {
      const latestDialog = dialogs.pop()
      if (!latestDialog) return dialogs
      if (latestDialog.onClose) latestDialog.onClose()
      return [...dialogs].concat({ ...latestDialog, open: false })
    })
  }

  const contextValue = useRef([createDialog, closeDialog] as const)

  Dialog.open = createDialog
  Dialog.close = closeDialog

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {dialogs.map((dialog, i) => {
        const { onClose, ...dialogParams } = dialog
        const onKill = () => {
          dialog.onExited && dialog.onExited()
          setDialogs(dialogs => dialogs.slice(0, dialogs.length - 1))
        }
        return <DialogContainer key={i} onClose={closeDialog} onKill={onKill} {...dialogParams} />
      })}
    </DialogContext.Provider>
  )
}

export const useDialog = () => React.useContext(DialogContext)

export class Dialog {
  static open(option: DialogOption) {
    return {} as DialogInstance
  }
  static close() {}
}

export default DialogProvider
