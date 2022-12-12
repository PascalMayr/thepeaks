/**
 * Returns a DOM object.
 *
 * @param {string | undefined} html The html string to parse.
 */
const domForHtml = (html: string | undefined): HTMLElement | undefined => {
  if (
    typeof DOMParser !== 'undefined' &&
    html &&
    typeof window !== 'undefined'
  ) {
    const parser = new window.DOMParser()
    const parsed = parser.parseFromString(html, 'text/html')
    if (parsed && parsed.body) {
      return parsed.body
    }
  }
  return
}

export default domForHtml
