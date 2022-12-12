import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import Article, {
  ArticleProps,
  ArticleResult,
  ArticleVariation,
} from '../components/article'
import ListHeader from '../components/listHeader'
import { SearchResponse, SearchResult } from '../types'
import api from '../utils/api'
import styles from '../styles/pages/search.module.css'
import { useCallback, useEffect, useState } from 'react'

interface Query extends ParsedUrlQuery {
  q: string
  page: string
  ['order-by']: string | undefined | string[]
}

export const getSearchResults = async (
  page: string,
  q: string | string[] | undefined
): Promise<ArticleResult[]> => {
  const remapFields = ({
    webTitle,
    id,
    webPublicationDate,
    sectionId,
    fields,
    pillarName,
  }: SearchResult): ArticleResult => ({
    webTitle,
    id,
    webPublicationDate,
    sectionId,
    fields: fields || {},
    pillarName: pillarName || '',
  })
  return (
    await api<SearchResponse>('search', {
      q,
      ['show-fields']: 'thumbnail,trailText',
      page: Number(page) || 1,
      ['page-size']: 15,
    })
  ).response?.results?.map(remapFields)
}

export async function getServerSideProps({ query }: { query: Query }) {
  const { q, page } = query
  const results = await getSearchResults(page || '1', q)
  return {
    props: {
      q,
      results: results || null,
      order: query['order-by'] || 'newest',
    },
  }
}

interface SearchProps {
  q: string
  results: ArticleProps[]
  order: string
}

const Search: React.FC<SearchProps> = ({ q, results, order }) => {
  const [articles, setArticles] = useState<ArticleResult[]>([])
  /* sortin on client side since API isn't returning results with order-by query param */
  const handleArticleUpdate = useCallback(
    (articles: ArticleResult[]) => {
      if (order === 'newest') {
        setArticles(
          articles.sort(
            (resultA, resultB) =>
              new Date(resultB.webPublicationDate).getTime() -
              new Date(resultA.webPublicationDate).getTime()
          )
        )
      }
      if (order === 'oldest') {
        setArticles(
          articles.sort(
            (resultA, resultB) =>
              new Date(resultA.webPublicationDate).getTime() -
              new Date(resultB.webPublicationDate).getTime()
          )
        )
      }
    },
    [order]
  )

  useEffect(() => {
    if (results) {
      handleArticleUpdate(results)
    }
  }, [results, handleArticleUpdate])

  /* load more articles */
  const loadMore = useCallback(async () => {
    if (
      Number(window.innerHeight) + Number(window.scrollY) >=
      document.body.offsetHeight - 250
    ) {
      removeEventListener('scroll', loadMore)
      const nextPage = articles.length / 15 + 1
      const searchQuery = new URLSearchParams({
        q,
        page: String(nextPage),
      }).toString()
      const newResults = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_EXPOSED_API}/search?${searchQuery}`
        )
      ).json()
      handleArticleUpdate([...articles, ...newResults])
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }, [articles, q, handleArticleUpdate])

  useEffect(() => {
    addEventListener('scroll', loadMore)
    return () => removeEventListener('scroll', loadMore)
  }, [loadMore])

  return (
    <>
      <Head>
        <title>The Peaks - Search</title>
      </Head>
      <ListHeader title="Search results" />
      <div className={styles.results}>
        {articles.map((article) => (
          <Article
            key={article.id}
            {...article}
            variation={ArticleVariation.SMALL}
          />
        ))}
      </div>
      {articles.length === 0 && (
        <h2 className={styles.noresult}>
          No results found for: <b>{q}</b>
        </h2>
      )}
    </>
  )
}

export default Search
