import { NextApiRequest, NextApiResponse } from 'next'
import { getSearchResults } from '../../search'

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
      case 'GET':
        const results = await getSearchResults(
          String(req.query.page) || '1',
          req.query.q
        )
        res.status(200).json(results)
        break
      default:
        res.status(405).end()
    }
  } catch (e) {
    res.status(500)
    console.error('An error happened while searching', e)
  }
}
