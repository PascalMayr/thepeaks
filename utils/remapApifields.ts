import { ArticleResult, SearchResult } from '../types'

/**
 * remaps the API response to avoid passing too much data from server to client
 *
 * @param {SearchResult} result result from API response
 * @returns {ArticleResult} needed fields for the FE
 */
const remapApiFields = <T>({
  webTitle,
  webPublicationDate,
  id,
  sectionId,
  fields,
  pillarName,
}: SearchResult) =>
  <T | ArticleResult>{
    webTitle,
    webPublicationDate,
    id,
    sectionId,
    fields: fields || {},
    pillarName,
  }

export default remapApiFields
