import React from 'react'
import pageStyles from './styles/Page.module.scss'
import pageLastStyles from './styles/PageLast.module.scss'

const PageLast:React.FC = () => {
  return (
    <div className={`${pageStyles.page} ${pageLastStyles.pageLast}`}>
      <p>名称：Misa展 日本の名所巡り</p>
      <p>モデル： Misa</p>
      <p>制作： <a href="http://shuhei-hasegawa.com/" target='_blank' rel="noreferrer">Shuhei Hasegawa</a></p>
    </div>
  )
}

export default PageLast
