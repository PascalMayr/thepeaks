import Link from 'next/link'
import styles from '../styles/pages/404.module.css'

const NotFound: React.FC = () => (
  <div className={styles.container}>
    <h1>500</h1>
    <h3>Sorry – we haven’t been able to serve the page you asked for.</h3>
    <p>Server error</p>
    <Link className={styles.home} href="/">
      The Peaks homepage
    </Link>
  </div>
)

export default NotFound
