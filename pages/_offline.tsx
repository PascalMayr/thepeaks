import Head from 'next/head'
import styles from '../styles/pages/offline.module.css'

const Offline: React.FC = () => (
  <>
    <Head>
      <title>Offline fallback</title>
    </Head>
    <div className={styles.container}>
      <h2>You are offline.</h2>
    </div>
  </>
)

export default Offline
