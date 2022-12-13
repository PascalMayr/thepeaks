import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import Article, { ArticleProps, ArticleVariation } from '../components/article'
import ListHeader from '../components/listHeader'
import { ArticleResult, SearchResponse } from '../types'
import api from '../utils/api'
import styles from '../styles/pages/search.module.css'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LoadingContext } from '../context/LoadingContext'
import Loading from '../components/loading'
import clientApi from '../utils/clientApi'
import remapApiFields from '../utils/remapApifields'

interface Query extends ParsedUrlQuery {
  q: string
  page: string
  ['order-by']: string | undefined | string[]
}

export const getSearchResults = async (
  page: string,
  q: string | string[] | undefined
): Promise<ArticleResult[]> => {
  return (
    await api<SearchResponse>('search', {
      q,
      ['show-fields']: 'thumbnail,trailText',
      page: Number(page) || 1,
      ['page-size']: 15,
    })
  ).response?.results?.map(remapApiFields<ArticleResult>)
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
  const { loading, setLoading } = useContext(LoadingContext)
  const [articles, setArticles] = useState<ArticleResult[]>([])
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
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
      setLoading(false)
    }
  }, [results, setLoading, handleArticleUpdate])

  /* load more articles */
  const loadMore = useCallback(async () => {
    if (
      Number(window.innerHeight) + Number(window.scrollY) >=
      document.body.offsetHeight - 300
    ) {
      removeEventListener('scroll', loadMore)
      const nextPage = articles.length / 15 + 1
      const searchQuery = new URLSearchParams({
        q,
        page: String(nextPage),
      }).toString()
      try {
        setLoadingMore(true)
        const newResults = await clientApi<ArticleResult[]>(
          `search?${searchQuery}`
        )
        setLoadingMore(false)
        handleArticleUpdate([...articles, ...newResults])
      } catch (_e: unknown) {
        console.error('loading more articles failed')
      }
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }, [articles, q, handleArticleUpdate])

  useEffect(() => {
    addEventListener('scroll', loadMore)
    return () => removeEventListener('scroll', loadMore)
  }, [loadMore])

  /* avoid rerendering if loadingMore state changes */
  const Articles = useMemo(() => {
    return articles.map((article) => (
      <Article
        key={article.id}
        {...article}
        variation={ArticleVariation.SMALL}
      />
    ))
  }, [articles])

  return (
    <>
      <Head>
        <title>The Peaks - Search</title>
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader title="Search results" />
          <div className={styles.results}>{Articles}</div>
          {loadingMore && <Loading />}
          {articles.length === 0 && !loading && (
            <h2 className={styles.noresult}>
              No results found for: <b>{q}</b>
            </h2>
          )}
        </>
      )}
    </>
  )
}

export default Search
