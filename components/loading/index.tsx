import LoadingIcon from '../../assets/loading.svg'
import styles from '../../styles/components/loading/index.module.css'

const Loading: React.FC = () => (
  <div className={styles.container}>
    <LoadingIcon className={styles.circle} />
  </div>
)

export default Loading
