import { useState, useRef, useEffect, useCallback } from 'react'
import clsx from 'clsx'

interface ChatInputProps {
  onSend: (content: string) => void
  onStop: () => void
  isProcessing: boolean
  mode: 'blocking' | 'stream'
}

export default function ChatInput({ onSend, onStop, isProcessing, mode }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    const maxHeight = 6 * 24
    ta.style.height = `${Math.min(ta.scrollHeight, maxHeight)}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  const handleSend = useCallback(() => {
    if (isProcessing) return
    const trimmed = value.trim()
    if (!trimmed) return
    onSend(trimmed)
    setValue('')
  }, [isProcessing, value, onSend])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  return (
    <div className="border-t border-border/50 bg-surface/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-end gap-3 bg-surface-light/50 rounded-2xl border border-border/40 px-4 py-3 transition-all duration-200 focus-within:border-accent/40 focus-within:shadow-[0_0_20px_rgba(245,166,35,0.06)]">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入问题... (Enter 发送, Shift+Enter 换行)"
            rows={1}
            disabled={isProcessing}
            className={clsx(
              'flex-1 bg-transparent text-sm text-text-primary placeholder-muted/50 outline-none resize-none max-h-[144px]',
              'disabled:cursor-not-allowed disabled:opacity-50',
            )}
          />
          {isProcessing ? (
            <button
              onClick={onStop}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-colors group"
              title="停止"
            >
              <svg className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!value.trim()}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center hover:bg-accent/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
              title="发送"
            >
              <svg className="w-4 h-4 text-accent group-hover:translate-y-[-1px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-[10px] text-muted/40">
            {isProcessing ? (mode === 'stream' ? '正在流式输出...' : '正在请求...') : '就绪'}
          </span>
          <span className="text-[10px] text-muted/30">{value.length} 字符</span>
        </div>
      </div>
    </div>
  )
}
