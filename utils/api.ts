const { API_URL, API_KEY } = process.env

/**
 * Returns a promise which resolves to the API result.
 *
 * @param {string} path The https://open-platform.theguardian.com API path.
 * @param {object} query Query params.
 * @param {RequestInit} init fetch() options.
 */
const api = async <T>(
  path: string,
  params = {},
  init: RequestInit = {}
): Promise<T> => {
  const url = new URL(`${API_URL}${path}`)
  url.search = new URLSearchParams({
    ...params,
    'api-key': API_KEY || '',
  }).toString()
  return await (await fetch(url, init)).json()
}

export default api
