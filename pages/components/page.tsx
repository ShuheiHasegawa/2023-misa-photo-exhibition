import Image from 'next/image'
import React from 'react'
import styles from './styles/Page.module.scss'

type pageProps = {
  srcPath: string,
  portrait: boolean
}

const Page:React.FC<pageProps> = ({srcPath, portrait}) => {
  return (
    <div className={styles.page}>
      <img alt='image' src={srcPath} style={{ width: portrait ? "auto" : "85vw", height: portrait ? "512px" : "100%" }}/>
    </div>
  )
}

export default Page
