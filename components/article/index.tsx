import ArticleBig from './big'
import ArticleSmall from './small'
import ArticleNoImage from './noImage'
import Link from 'next/link'
import styles from '../../styles/components/article/index.module.css'
import classNames from 'classnames'

export enum ArticleVariation {
  SMALL,
  BIG,
  NOIMAGE,
}

export interface ArticleResult {
  id: string
  webTitle: string
  sectionId: string
  pillarName: string
  webPublicationDate: string
  fields: {
    thumbnail?: string
    trailText: string
  }
}

export interface ArticleProps extends ArticleResult {
  variation: ArticleVariation
  top?: boolean
}

const Article: React.FC<ArticleProps> = (props) => {
  const { id, variation, pillarName } = props
  return (
    <Link
      className={classNames(styles.link, styles[pillarName])}
      href={`/article?id=${id}`}
    >
      {variation === ArticleVariation.SMALL && <ArticleSmall {...props} />}
      {variation === ArticleVariation.NOIMAGE && <ArticleNoImage {...props} />}
      {variation === ArticleVariation.BIG && <ArticleBig {...props} />}
    </Link>
  )
}

export default Article
