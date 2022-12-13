/**
 * Returns a promise which resolves to the local API result.
 *
 * @param {string} path The local API path.
 * @param {RequestInit} init fetch() options.
 */
const clientApi = async <T>(
  path: string,
  init: RequestInit = {}
): Promise<T> => {
  return await (
    await fetch(`${process.env.NEXT_PUBLIC_CLIENT_EXPOSED_API}/${path}`, init)
  ).json()
}

export default clientApi
