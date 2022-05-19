import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'

import StyleSheet, { scale } from '@/libs/StyleSheet'
import { getAntdLocale } from '@/i18n'

import routes from '../../routes'
import Navbar from '../Navbar'

const Router: React.FC = () => {
  return (
    <ConfigProvider locale={getAntdLocale()}>
      <BrowserRouter>
        <Navbar />
        <main style={styles.main}>
          <Routes>
            {routes.map(route => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </main>
      </BrowserRouter>
    </ConfigProvider>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    margin: '0 ' + scale(48),
    flex: 1
  }
})

export default Router
