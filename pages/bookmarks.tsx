import Head from 'next/head'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Article, { ArticleVariation } from '../components/article'
import ListHeader from '../components/listHeader'
import Loading from '../components/loading'
import { LoadingContext } from '../context/LoadingContext'
import clientApi from '../utils/clientApi'
import getBookmarks from '../utils/getBookmarks'
import styles from '../styles/pages/bookmarks.module.css'
import { ArticleResult } from '../types'

const Bookmarks: React.FC = () => {
  const { loading, setLoading } = useContext(LoadingContext)

  const [articles, setArticles] = useState<ArticleResult[]>([])
  const fetchBookmarks = useCallback(async () => {
    const bookmarks = getBookmarks()
    setLoading(true)
    const results = await clientApi<ArticleResult[]>('bookmarks', {
      method: 'POST',
      body: JSON.stringify(bookmarks),
    })
    setLoading(false)
    setArticles(results)
  }, [setLoading])

  useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  /* prevent rerendering when loading state is updated */
  const Articles = useMemo(
    () =>
      articles.map((article: ArticleResult) => (
        <Article
          key={article.id}
          {...article}
          variation={ArticleVariation.SMALL}
        />
      )),
    [articles]
  )

  return (
    <>
      <Head>
        <title>The Peaks - Search</title>
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader title="All bookmark" />
          <div className={styles.results}>{Articles}</div>
        </>
      )}
    </>
  )
}

export default Bookmarks
