import ArticleBig from './big'
import ArticleSmall from './small'
import ArticleNoImage from './noImage'
import Link from 'next/link'
import styles from '../../styles/components/article/index.module.css'
import classNames from 'classnames'
import { ArticleResult } from '../../types'

export enum ArticleVariation {
  SMALL,
  BIG,
  NOIMAGE,
}

export interface ArticleProps extends ArticleResult {
  variation: ArticleVariation
  top?: boolean
}

const Article: React.FC<ArticleProps> = (props) => {
  const { id, variation, pillarName } = props
  return (
    <>
      {id && (
        <Link
          className={classNames(styles.link, styles[pillarName])}
          href={`/article?id=${id}`}
        >
          {variation === ArticleVariation.SMALL && <ArticleSmall {...props} />}
          {variation === ArticleVariation.NOIMAGE && (
            <ArticleNoImage {...props} />
          )}
          {variation === ArticleVariation.BIG && <ArticleBig {...props} />}
        </Link>
      )}
    </>
  )
}

export default Article
