import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import Article, { ArticleProps, ArticleVariation } from '../components/article'
import ListHeader from '../components/listHeader'
import { SearchResponse, SearchResult } from '../types'
import api from '../utils/api'
import styles from '../styles/pages/search.module.css'

interface Query extends ParsedUrlQuery {
  q: string
}

export async function getServerSideProps({ query: { q } }: { query: Query }) {
  const remapFields = ({
    webTitle,
    id,
    sectionId,
    fields,
    pillarName,
  }: SearchResult) => ({
    webTitle,
    id,
    sectionId,
    fields: fields || {},
    pillarName,
  })
  const results = (
    await api<SearchResponse>('search', {
      q,
      ['show-fields']: 'thumbnail',
      ['page-size']: 15,
    })
  ).response.results.map(remapFields)
  return {
    props: {
      q,
      results,
    },
  }
}

interface SearchProps {
  q: string
  results: ArticleProps[]
}

const Search: React.FC<SearchProps> = ({ q, results }) => {
  return (
    <>
      <Head>
        <title>The Peaks - Search {q}</title>
      </Head>
      <ListHeader title="Search results" />
      <div className={styles.results}>
        {results.map((result) => (
          <Article
            key={result.id}
            {...result}
            variation={ArticleVariation.SMALL}
          />
        ))}
      </div>
    </>
  )
}

export default Search
