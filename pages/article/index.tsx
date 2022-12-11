import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import BookmarkButton from '../../components/bookmarkButton'
import styles from '../../styles/pages/article/index.module.css'
import { ArticleContent, ArticleContentResponse } from '../../types'
import api from '../../utils/api'
import domForHtml from '../../utils/domForHtml'

interface Query extends ParsedUrlQuery {
  id: string
}

export async function getServerSideProps({ query }: { query: Query }) {
  const content = (
    await api<ArticleContentResponse>(query.id, {
      ['show-fields']: 'thumbnail,trailText,body',
    })
  ).response.content
  return {
    props: content,
  }
}

const ArticlePage: React.FC<ArticleContent> = (props) => {
  const { webPublicationDate, webTitle, fields } = props
  const [body, setBody] = useState<string>(fields?.body || '')
  const [bodyImages, setBodyImages] = useState<string>('')

  useEffect(() => {
    const dom = domForHtml(fields?.body)
    // extract images and show them on the right side
    const images = Array.from(
      dom?.querySelectorAll('figure.element-image') || []
    ).map((img: Element) => img.outerHTML)
    dom
      ?.querySelectorAll('figure.element-image')
      ?.forEach((element: Element) => element.remove())
    setBodyImages(images.join(''))
    setBody(dom?.innerHTML || '')
  }, [fields?.body])

  const formatDate = useCallback((apiDate: string) => {
    const date = Intl.DateTimeFormat('en', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    })
      .format(new Date(apiDate))
      .replace(new RegExp(',', 'g'), '')
      .toUpperCase()
      .split(' ')
    return `${date[0]} ${date[2]} ${date[1]} ${date[3]} ${date[4].replace(
      ':',
      '.'
    )} ${date[5]}`
  }, [])

  return (
    <div className={styles.container}>
      <BookmarkButton title="Add Bookmark" />
      <p className={styles.date}>{formatDate(webPublicationDate)}</p>
      <div>
        <div className={styles.headline}>
          <h1 className={styles.title}>{webTitle}</h1>
          {/* trailtext can be html returned from the API */}
          <p
            className={styles['trail-text']}
            dangerouslySetInnerHTML={{ __html: fields?.trailText }}
          />
        </div>
        <div className={styles['content-image-container']}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div dangerouslySetInnerHTML={{ __html: bodyImages }} />
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
