import '@/assets/styles/index.less'
import 'antd/es/dropdown/style'
import 'antd/es/menu/style'
import 'antd/es/modal/style'
import 'antd/es/spin/style'
import 'antd/es/message/style'
import 'antd/es/input/style'
import 'antd/es/notification/style'
import './i18n'

import React from 'react'
import ReactDOM from 'react-dom'

import DialogProvider from './components/DialogProvider'
import Router from './components/Router'
import { init } from './services/app'

init()

ReactDOM.render(
  <DialogProvider>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </DialogProvider>,
  document.getElementById('root')
)
