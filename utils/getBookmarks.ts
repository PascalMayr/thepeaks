/**
 * get's bookmarks saved in localStorage
 *
 * @returns {string[]} all artilce ids in an array
 */
const getBookmarks = (): string[] =>
  JSON.parse(localStorage.getItem('bookmarks') || '[]')

export default getBookmarks
