import { NextApiRequest, NextApiResponse } from 'next'
import { getSearchResults } from '../../search'

/**
 * Returns new search results for the client side.
 *
 * @param {NextApiRequest} req The number to raise.
 * @param {NextApiResponse} res The number to raise.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const results = await getSearchResults(
        String(req.query.page) || '1',
        req.query.q
      )
      res.status(200).json(results)
    } else {
      res.status(405)
    }
  } catch (_e) {
    res.status(500)
    console.log('An error happened while searching')
  }
}
