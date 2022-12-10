import ListHeader from '../components/listHeader/index'
import { ContentResponse, Result } from '../types'
import api from '../utils/api'
import { ParsedUrlQuery } from 'querystring'
import Article, { ArticleResult, ArticleVariation } from '../components/article'
import styles from '../styles/pages/index.module.css'

/* query params */
interface Query extends ParsedUrlQuery {
  q: string
  ['order-by']: string
}

export async function getServerSideProps({
  query,
  query: { q },
}: {
  query: Query
}) {
  const date = new Date()
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  const commonQuery = {
    ['order-by']: query['order-by'] || 'newest',
    ['show-fields']: 'thumbnail,trailText',
    ['from-date']: `${year}-${month}-${day}`,
  }
  /* request theguardian API */
  const remapFields = ({
    webTitle,
    sectionId,
    fields,
    pillarName,
  }: Result) => ({ webTitle, sectionId, fields, pillarName })
  const news = (
    await api<ContentResponse>('search', {
      ...commonQuery,
      /* only section 'news' isn't returning articles */
      section: 'world|uk-news|australia-news|uk-news|us-news|news',
    })
  ).response.results.map(remapFields)
  const sport = (
    await api<ContentResponse>('search', {
      ...commonQuery,
      q,
      section: 'sport',
    })
  ).response.results.map(remapFields)

  return {
    props: {
      news,
      sections: {
        sport,
      },
    },
  }
}

interface HomeProps {
  news: ArticleResult[]
  sections: {
    sport: ArticleResult[]
  }
}

const Home: React.FC<HomeProps> = ({ news }) => (
  <>
    <ListHeader title="Top Stories" />
    <div className={styles.top}>
      <Article {...news[0]} variation={ArticleVariation.BIG} top />
      <div className={styles['top-news-col']}>
        <Article {...news[1]} variation={ArticleVariation.SMALL} />
        <Article {...news[2]} variation={ArticleVariation.NOIMAGE} />
      </div>
      <div className={styles['top-news-col']}>
        <Article {...news[3]} variation={ArticleVariation.SMALL} />
        <Article {...news[4]} variation={ArticleVariation.NOIMAGE} />
      </div>
    </div>
    <div>
      <div className={styles['top-second-row']}>
        <Article {...news[5]} variation={ArticleVariation.BIG} />
        <Article {...news[6]} variation={ArticleVariation.BIG} />
        <Article {...news[7]} variation={ArticleVariation.BIG} />
      </div>
    </div>
  </>
)

export default Home
