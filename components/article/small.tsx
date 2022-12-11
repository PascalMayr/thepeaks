import Image from 'next/image'
import styles from '../../styles/components/article/index.module.css'
import smallStyles from '../../styles/components/article/small.module.css'
import { ArticleProps } from '.'
import classNames from 'classnames'
import Logo from '../../assets/logo.svg'
import ResponsiveEllipsis from '../responsiveEllipsis'

const Article: React.FC<ArticleProps> = ({ fields, webTitle, top }) => {
  return (
    <article
      className={classNames(
        styles.container,
        !fields?.thumbnail && smallStyles['no-thumbnail-container']
      )}
    >
      <div
        className={classNames(styles.news, !top && smallStyles['not-top-news'])}
      >
        <ResponsiveEllipsis
          text={webTitle}
          maxLine={4}
          ellipsis="..."
          trimRight
          basedOn="letters"
          className={classNames(
            styles['web-title'],
            smallStyles['web-title'],
            top && smallStyles['top-web-title']
          )}
          component="h2"
          /* prettier-ignore */
        />
      </div>
      {fields?.thumbnail ? (
        <Image
          className={styles.image}
          src={fields?.thumbnail}
          alt={webTitle}
          width={255}
          height={255}
        />
      ) : (
        <div className={smallStyles.placeholder}>
          <Logo />
        </div>
      )}
    </article>
  )
}

export default Article
