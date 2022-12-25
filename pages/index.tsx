import ListHeader from '../components/listHeader/index'
import { ArticleResult, ContentResponse } from '../types'
import api from '../utils/api'
import { ParsedUrlQuery } from 'querystring'
import Article, { ArticleVariation } from '../components/article'
import styles from '../styles/pages/index.module.css'
import SectionTitle from '../components/sectionTitle'
import { useContext, useEffect } from 'react'
import { LoadingContext } from '../context/LoadingContext'
import Loading from '../components/loading'
import { useRouter } from 'next/router'
import remapApiFields from '../utils/remapApifields'

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
  let news =
    (
      await api<ContentResponse>('search', {
        ...commonQuery,
        /* only section 'news' isn't returning articles */
        ['from-date']: `${year}-${month}-${day}`,
        section: 'world|uk-news|australia-news|uk-news|us-news|news',
      })
    )?.response.results.map(remapApiFields<ArticleResult>) || null
  if (!news?.length) {
    news =
      (
        await api<ContentResponse>('search', {
          ...commonQuery,
          /* only section 'news' isn't returning articles */
          section: 'world|uk-news|australia-news|uk-news|us-news|news',
        })
      )?.response.results.map(remapApiFields<ArticleResult>) || null
  }
  const sport =
    (
      await api<ContentResponse>('search', {
        ...commonQuery,
        /* from date doesn't return results */
        /* only section 'sport' returns less articles */
        section: 'sport|football',
      })
    )?.response.results.map(remapApiFields<ArticleResult>) || null
  const culture =
    (
      await api<ContentResponse>('search', {
        ...commonQuery,
        /* only section 'sport' returns less articles */
        ['from-date']: `${year}-${month}-${day}`,
        section: 'culture',
      })
    )?.response.results.map(remapApiFields<ArticleResult>) || null
  const lifeandstyle =
    (
      await api<ContentResponse>('search', {
        ...commonQuery,
        /* only section 'sport' returns less articles */
        ['from-date']: `${year}-${month}-${day}`,
        section: 'lifeandstyle',
      })
    )?.response.results.map(remapApiFields<ArticleResult>) || null

  return {
    props: {
      news,
      sections: {
        sport,
        culture,
        lifeandstyle,
      },
    },
  }
}

interface HomeProps {
  news: ArticleResult[]
  sections: {
    sport: ArticleResult[]
    culture: ArticleResult[]
    lifeandstyle: ArticleResult[]
  }
}

const Home: React.FC<HomeProps> = ({
  news,
  sections: { sport, lifeandstyle, culture },
}) => {
  const { loading, setLoading } = useContext(LoadingContext)
  const router = useRouter()
  useEffect(() => {
    setLoading(false)
  }, [router, setLoading])
  return (
    <>
      {loading || (!news && !sport && !lifeandstyle && !culture) ? (
        <Loading />
      ) : (
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
          <section className={styles['mobile-top']}>
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
          {sport?.length > 0 && (
            <>
              <SectionTitle title="Sports" />
              <section className={styles['section-news']}>
                <Article {...sport[0]} variation={ArticleVariation.SMALL} />
                <Article {...sport[1]} variation={ArticleVariation.SMALL} />
                <Article {...sport[2]} variation={ArticleVariation.SMALL} />
              </section>
            </>
          )}
          {lifeandstyle?.length > 0 && (
            <>
              <SectionTitle title="Life & Style" />
              <section className={styles['section-news']}>
                <Article
                  {...lifeandstyle[0]}
                  variation={ArticleVariation.SMALL}
                />
                <Article
                  {...lifeandstyle[1]}
                  variation={ArticleVariation.SMALL}
                />
                <Article
                  {...lifeandstyle[2]}
                  variation={ArticleVariation.SMALL}
                />
              </section>
            </>
          )}
          {culture?.length > 0 && (
            <>
              <SectionTitle title="Culture" />
              <section className={styles['section-news']}>
                <Article {...culture[0]} variation={ArticleVariation.SMALL} />
                <Article {...culture[1]} variation={ArticleVariation.SMALL} />
                <Article {...culture[2]} variation={ArticleVariation.SMALL} />
              </section>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Home
