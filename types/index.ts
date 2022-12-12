export interface Result {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  isHosted: boolean
  pillarId: string
  pillarName: string
}

export interface ContentResult extends Result {
  fields: {
    thumbnail?: string
    trailText: string
  }
}

export interface ContentResponse {
  response: {
    status: string
    userTier: string
    total: number
    startIndex: number
    pageSize: number
    currentPage: number
    pages: number
    orderBy: string
    results: ContentResult[]
  }
}

export interface SearchResult extends Result {
  fields: {
    thumbnail?: string
    trailText: string
  }
}

export interface SearchResponse {
  response: {
    status: string
    userTier: string
    total: number
    startIndex: number
    pageSize: number
    currentPage: number
    pages: number
    orderBy: string
    results: SearchResult[]
  }
}

export interface ArticleContent extends Result {
  fields: {
    thumbnail?: string
    trailText: string
    body: string
  }
}

export interface ArticleContentResponse {
  response: {
    status: string
    userTier: string
    total: number
    content: ArticleContent
  }
}
