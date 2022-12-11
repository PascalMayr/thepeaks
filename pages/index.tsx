import ListHeader from '../components/listHeader/index'
import { ContentResponse, Result } from '../types'
import api from '../utils/api'
import { ParsedUrlQuery } from 'querystring'
import Article, { ArticleResult, ArticleVariation } from '../components/article'
import styles from '../styles/pages/index.module.css'
import SectionTitle from '../components/sectionTitle'

/* query params */
interface Query extends ParsedUrlQuery {
  ['order-by']: string
}

export async function getServerSideProps({ query }: { query: Query }) {
  const date = new Date()
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
  let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  if (date.getHours() < 4) {
    // until 4 AM in the morning show the news from the day before
    day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
      date.setDate(date.getDate() - 1)
    )
  }
  const commonQuery = {
    ['order-by']: query['order-by'] || 'newest',
    ['show-fields']: 'thumbnail,trailText',
  }
  /* request theguardian API */
  const remapFields = ({
    webTitle,
    sectionId,
    fields,
    pillarName,
  }: Result) => ({ webTitle, sectionId, fields: fields || {}, pillarName })
  const news = (
    await api<ContentResponse>('search', {
      ...commonQuery,
      /* only section 'news' isn't returning articles */
      ['from-date']: `${year}-${month}-${day}`,
      section: 'world|uk-news|australia-news|uk-news|us-news|news',
    })
  ).response.results.map(remapFields)
  const sport = (
    await api<ContentResponse>('search', {
      ...commonQuery,
      /* only section 'sport' returns less articles */
      section: 'sport|football',
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

const Home: React.FC<HomeProps> = ({ news, sections: { sport } }) => (
  <>
    <ListHeader title="Top Stories" />
    <section className={styles.top}>
      <Article {...news[0]} variation={ArticleVariation.BIG} top />
      <div className={styles['top-news-col']}>
        <Article {...news[1]} variation={ArticleVariation.SMALL} top />
        <Article {...news[2]} variation={ArticleVariation.NOIMAGE} />
      </div>
      <div className={styles['top-news-col']}>
        <Article {...news[3]} variation={ArticleVariation.SMALL} top />
        <Article {...news[4]} variation={ArticleVariation.NOIMAGE} />
      </div>
    </section>
    <section className={styles['top-news-second-row']}>
      <Article {...news[5]} variation={ArticleVariation.BIG} />
      <Article {...news[6]} variation={ArticleVariation.BIG} />
      <Article {...news[7]} variation={ArticleVariation.BIG} />
    </section>
    <SectionTitle title="Sports" />
    <section className={styles['sport-news']}>
      <Article {...sport[0]} variation={ArticleVariation.SMALL} />
      <Article {...sport[1]} variation={ArticleVariation.SMALL} />
      <Article {...sport[2]} variation={ArticleVariation.SMALL} />
    </section>
  </>
)

export default Home
