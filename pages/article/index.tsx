import Head from 'next/head'
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

  /* extract images and show them on the right side on dekstop as shown in the design */
  const setBodyWithoutImages = useCallback((bodystring: string) => {
    const dom = domForHtml(bodystring)
    const images = Array.from(
      dom?.querySelectorAll('figure.element-image') || []
    ).map((img: Element) => img.outerHTML)
    dom
      ?.querySelectorAll('figure.element-image')
      ?.forEach((element: Element) => element.remove())
    setBodyImages(images.join(''))
    setBody(dom?.innerHTML || '')
  }, [])

  /* put images back to the right side on desktop */
  useEffect(() => {
    if (window.innerWidth > 818) {
      setBodyWithoutImages(fields?.body)
    }
  }, [fields?.body, setBodyWithoutImages])
  /* put images back into the body on mobile */
  useEffect(() => {
    const resizeCallback = () => {
      if (window.innerWidth < 818) {
        setBody(fields?.body)
        return
      }
      setBodyWithoutImages(fields?.body)
    }
    addEventListener('resize', resizeCallback)
    return () => removeEventListener('resize', resizeCallback)
  }, [fields?.body, setBodyWithoutImages])

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
      <Head>
        <title>{webTitle}</title>
      </Head>
      <BookmarkButton title="Add Bookmark" />
      <p className={styles.date}>{formatDate(webPublicationDate)}</p>
      <div>
        <div className={styles.headline}>
          <h1 className={styles.title}>{webTitle}</h1>
          {/* headline is the same as webTitle usnig trailText instead.
          trailtext can be html returned from the API */}
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
          <div
            className={styles['image-container']}
            dangerouslySetInnerHTML={{ __html: bodyImages }}
          />
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
