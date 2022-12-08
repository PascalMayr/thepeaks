import styles from '../../styles/components/header/index.module.css'
import Logo from '../../assets/logo.svg'
import Link from 'next/link'
import Search from '../search'

const Header: React.FC = () => (
  <header className={styles.header}>
    <Link href="/">
      <Logo className={styles.logo} />
    </Link>
    <Search />
  </header>
)

export default Header
