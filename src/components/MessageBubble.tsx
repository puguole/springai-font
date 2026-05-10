import { useMemo } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import clsx from 'clsx'
import type { Message } from '../types/chat'
import TypingIndicator from './TypingIndicator'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isStreaming = message.status === 'streaming'
  const isError = message.status === 'error'
  const isSending = message.status === 'sending'

  const time = useMemo(() => {
    const d = new Date(message.timestamp)
    return d.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }, [message.timestamp])

  return (
    <div
      className={clsx(
        'flex animate-fade-in',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={clsx(
          'max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-bubble-user rounded-tr-md'
            : 'bg-bubble-ai rounded-tl-md border border-border/20',
          isError && 'border-red-500/30 bg-red-500/5',
        )}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </span>
            <span className="text-xs font-medium text-accent">AI</span>
          </div>
        )}

        <div className={clsx(
          'text-sm leading-relaxed',
          isUser ? 'text-text-primary' : 'text-text-primary/90',
          isError && 'text-red-400',
        )}>
          {isSending ? (
            <div className="flex items-center gap-2 text-muted">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>思考中...</span>
            </div>
          ) : isStreaming && !message.content ? (
            <TypingIndicator />
          ) : message.content ? (
            <div className="markdown-body">
              <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </Markdown>
            </div>
          ) : isStreaming ? (
            <TypingIndicator />
          ) : null}

          {isError && (
            <div className="mt-2 text-xs text-red-400/80">
              {message.content}
            </div>
          )}
        </div>

        <div className={clsx(
          'flex items-center gap-2 mt-1.5',
          isUser ? 'justify-end' : 'justify-start',
        )}>
          <span className="text-[10px] text-muted/60">{time}</span>
          {isStreaming && (
            <span className="text-[10px] text-accent/60 animate-pulse">输出中...</span>
          )}
        </div>
      </div>
    </div>
  )
}
