import { useState, useRef, useCallback } from 'react'
import { sendChat, sendStreamChat } from '../api/agent'
import { useSession } from './useSession'
import type { Message, ChatMode } from '../types/chat'

export function useChat() {
  const { sessionId, userNo, newSession } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [mode, setMode] = useState<ChatMode>('stream')
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const generateId = useCallback(() => crypto.randomUUID(), [])

  const stopStream = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setIsProcessing(false)
    setMessages(prev =>
      prev.map(m =>
        m.status === 'streaming' ? { ...m, status: 'complete' as const } : m,
      ),
    )
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const sendMessage = useCallback(
    async (query: string) => {
      if (!query.trim() || isProcessing) return

      setError(null)

      const userMsg: Message = {
        id: generateId(),
        role: 'user',
        content: query.trim(),
        timestamp: Date.now(),
        status: 'complete',
      }

      const aiMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        status: mode === 'stream' ? 'streaming' : 'sending',
      }

      setMessages(prev => [...prev, userMsg, aiMsg])
      setIsProcessing(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        if (mode === 'blocking') {
          const res = await sendChat(
            { query: query.trim(), sessionId, userNo },
            controller.signal,
          )

          if (res.code === 200) {
            setMessages(prev =>
              prev.map(m =>
                m.id === aiMsg.id
                  ? { ...m, content: res.data.answer, status: 'complete' }
                  : m,
              ),
            )
          } else {
            throw new Error(res.message || '请求失败')
          }
        } else {
          const { reader, headers } = await sendStreamChat(
            { query: query.trim(), sessionId, userNo },
            controller.signal,
          )

          const decoder = new TextDecoder()
          let buffer = ''
          let fullContent = ''

          const readChunk = async (): Promise<void> => {
            while (true) {
              const { done, value } = await reader.read()
              if (done) break

              buffer += decoder.decode(value, { stream: true })
              const lines = buffer.split('\n')
              buffer = lines.pop() || ''

              for (const line of lines) {
                if (line.startsWith('data:')) {
                  const chunk = line.slice(5).trim()
                  if (chunk) {
                    fullContent += chunk
                    const content = fullContent
                    setMessages(prev =>
                      prev.map(m =>
                        m.id === aiMsg.id
                          ? { ...m, content: content, status: 'streaming' }
                          : m,
                      ),
                    )
                  }
                }
              }
            }

            if (buffer && buffer.startsWith('data:')) {
              const chunk = buffer.slice(5).trim()
              if (chunk) {
                fullContent += chunk
              }
            }
          }

          await readChunk()

          setMessages(prev =>
            prev.map(m =>
              m.id === aiMsg.id
                ? { ...m, content: fullContent, status: 'complete' }
                : m,
            ),
          )
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        const errMsg = err instanceof Error ? err.message : '请求失败，请重试'
        setMessages(prev =>
          prev.map(m =>
            m.id === aiMsg.id
              ? { ...m, status: 'error' as const, content: errMsg }
              : m,
          ),
        )
        setError(errMsg)
      } finally {
        setIsProcessing(false)
        abortRef.current = null
      }
    },
    [isProcessing, mode, sessionId, userNo, generateId],
  )

  return {
    messages,
    isProcessing,
    mode,
    error,
    sendMessage,
    stopStream,
    setMode,
    clearMessages,
    newSession,
  } as const
}
