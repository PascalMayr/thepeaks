import Image from 'next/image'
import LinesEllipsis from 'react-lines-ellipsis'
import { ArticleProps } from '.'
import styles from '../../styles/components/article/index.module.css'
import bigStyles from '../../styles/components/article/big.module.css'
import classNames from 'classnames'

export enum ArticleVariation {
  SMALL,
  BIG,
  NOIMAGE,
}

const ArticleBig: React.FC<ArticleProps> = ({
  fields: { thumbnail, trailText },
  webTitle,
  top,
}) => {
  return (
    <article className={styles.container}>
      <div className={styles.news}>
        <LinesEllipsis
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
        <p className={styles['trail-text']}>{trailText}</p>
      </div>
      {thumbnail && (
        <Image
          className={styles.image}
          src={thumbnail}
          alt={webTitle}
          width={540}
          height={423}
        />
      )}
    </article>
  )
}

export default ArticleBig
