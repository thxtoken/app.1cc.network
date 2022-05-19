import React from 'react'

import css from './error.module.less'

const NotFoundPage: React.FC = () => {
  return (
    <div className={css.container}>
      <h2>404 Not Found</h2>
    </div>
  )
}

export default NotFoundPage
