enum Pillar {
  Arts,
  Sport,
  News,
  Opinion,
}

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
  pillarName: Pillar
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
    results: Result[]
  }
}

export interface ArticleContent {
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
