import Image from 'next/image'
import { ArticleProps } from '.'
import styles from '../../styles/components/article/index.module.css'
import bigStyles from '../../styles/components/article/big.module.css'
import classNames from 'classnames'
import Logo from '../../assets/logo.svg'
import ResponsiveEllipsis from '../responsiveEllipsis'

export enum ArticleVariation {
  SMALL,
  BIG,
  NOIMAGE,
}

const ArticleBig: React.FC<ArticleProps> = ({ fields, webTitle, top }) => {
  return (
    <article
      className={classNames(
        styles.container,
        !fields?.thumbnail && bigStyles['no-thumbnail-container']
      )}
    >
      <div className={styles.news}>
        <ResponsiveEllipsis
          text={webTitle}
          maxLine={2}
          ellipsis="..."
          trimRight
          basedOn="letters"
          className={classNames(
            styles['web-title'],
            bigStyles['web-title'],
            top && bigStyles['top-web-title']
          )}
          component="h2"
        />
        {/* some articles return HTML */}
        <p
          className={styles['trail-text']}
          dangerouslySetInnerHTML={{ __html: fields?.trailText }}
        />
      </div>
      {fields?.thumbnail ? (
        <Image
          className={styles.image}
          src={fields?.thumbnail}
          alt={webTitle}
          width={540}
          height={423}
        />
      ) : (
        <div className={bigStyles.placeholder}>
          <Logo />
        </div>
      )}
    </article>
  )
}

export default ArticleBig
