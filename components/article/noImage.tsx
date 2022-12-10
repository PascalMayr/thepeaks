import styles from '../../styles/components/article/index.module.css'
import noImageStyles from '../../styles/components/article/noImage.module.css'
import LinesEllipsis from 'react-lines-ellipsis'
import { ArticleProps } from '.'
import classNames from 'classnames'

const Article: React.FC<ArticleProps> = ({ webTitle }) => {
  return (
    <article className={styles.container}>
      <div className={classNames(styles.news, noImageStyles.news)}>
        <LinesEllipsis
          text={webTitle}
          maxLine={4}
          ellipsis="..."
          trimRight
          basedOn="letters"
          className={classNames(
            styles['web-title'],
            noImageStyles['web-title']
          )}
          component="h2"
        />
      </div>
    </article>
  )
}

export default Article
