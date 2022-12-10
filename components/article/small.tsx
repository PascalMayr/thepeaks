import Image from 'next/image'
import styles from '../../styles/components/article/index.module.css'
import smallStyles from '../../styles/components/article/small.module.css'
import LinesEllipsis from 'react-lines-ellipsis'
import { ArticleProps } from '.'
import classNames from 'classnames'

const Article: React.FC<ArticleProps> = ({
  fields: { thumbnail },
  webTitle,
}) => {
  return (
    <article className={styles.container}>
      <div className={styles.news}>
        <LinesEllipsis
          text={webTitle}
          maxLine={4}
          ellipsis="..."
          trimRight
          basedOn="letters"
          className={classNames(styles['web-title'], smallStyles['web-title'])}
          component="h2"
        />
      </div>
      {thumbnail && (
        <Image
          className={styles.image}
          src={thumbnail}
          alt={webTitle}
          width={255}
          height={255}
        />
      )}
    </article>
  )
}

export default Article
