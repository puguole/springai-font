export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  status: 'sending' | 'streaming' | 'complete' | 'error'
}

export type ChatMode = 'blocking' | 'stream'
