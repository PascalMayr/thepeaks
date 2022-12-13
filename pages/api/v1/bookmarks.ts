import { NextApiRequest, NextApiResponse } from 'next'
import { ArticleContentResponse } from '../../../types'
import api from '../../../utils/api'
import remapApiFields from '../../../utils/remapApifields'

/**
 * Returns new search results for the client side to avoid exposing credentials
 *
 * @param {NextApiRequest} req The number to raise.
 * @param {NextApiResponse} res The number to raise.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST':
        const results = await Promise.all(
          JSON.parse(req.body).map((articleId: string) =>
            api<ArticleContentResponse>(articleId, {
              ['show-fields']: 'thumbnail,trailText',
            })
          )
        )
        res
          .status(200)
          .json(
            results.map((result) => result.response.content).map(remapApiFields)
          )
      default:
        res.status(405)
    }
  } catch (e) {
    res.status(500)
    console.error('An error happened while searching', e)
  }
}
