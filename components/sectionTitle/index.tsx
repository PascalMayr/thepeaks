import styles from '../../styles/components/sectionTitle/index.module.css'

interface SectionTitleProps {
  title: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <h3 className={styles.title}>{title}</h3>
)

export default SectionTitle
