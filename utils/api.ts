const { API_URL, API_KEY } = process.env

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
