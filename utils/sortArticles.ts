import { ArticleResult } from '../types'

/**
 * Sorts articles on the client side
 *
 * @param {ArticleResult} articles
 * @param {string} order newest or oldest
 * @returns {ArticleResult | undefined}
 */
const sortArticles = (articles: ArticleResult[] | undefined, order: string) => {
  if (order === 'newest') {
    return articles?.sort(
      (resultA, resultB) =>
        new Date(resultB.webPublicationDate).getTime() -
        new Date(resultA.webPublicationDate).getTime()
    )
  }
  if (order === 'oldest') {
    return articles?.sort(
      (resultA, resultB) =>
        new Date(resultA.webPublicationDate).getTime() -
        new Date(resultB.webPublicationDate).getTime()
    )
  }
}

export default sortArticles
