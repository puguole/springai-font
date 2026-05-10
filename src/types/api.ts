export interface ApiResult<T> {
  code: number
  message: string
  data: T
  timestamp: number
}

export interface ChatResponseData {
  answer: string
  sessionId: string
}
