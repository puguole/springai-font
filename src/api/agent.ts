import { request, requestStream } from './client'
import type { ApiResult, ChatResponseData } from '../types/api'

export interface ChatRequest {
  query: string
  sessionId?: string
  userNo?: string
}

export async function sendChat(req: ChatRequest, signal?: AbortSignal) {
  return request<ApiResult<ChatResponseData>>('/agent/chat', {
    body: req,
    signal,
  })
}

export async function sendStreamChat(
  req: ChatRequest,
  signal?: AbortSignal,
) {
  return requestStream('/agent/stream-chat', req, signal)
}

export async function checkHealth(signal?: AbortSignal) {
  return request<ApiResult<string>>('/agent/health', {
    method: 'GET',
    signal,
  })
}
