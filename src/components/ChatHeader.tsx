import SessionBadge from './SessionBadge'
import ModeToggle from './ModeToggle'
import type { ChatMode } from '../types/chat'

interface ChatHeaderProps {
  mode: ChatMode
  onModeChange: (mode: ChatMode) => void
  onNewSession: () => void
  onClear: () => void
  isProcessing: boolean
}

export default function ChatHeader({
  mode,
  onModeChange,
  onNewSession,
  onClear,
  isProcessing,
}: ChatHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-surface/60 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-dot" />
            <h1 className="text-base font-display font-semibold text-text-primary tracking-tight">
              Spring AI Agent
            </h1>
          </div>
          <SessionBadge />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle mode={mode} onChange={onModeChange} disabled={isProcessing} />
          <button
            onClick={onClear}
            disabled={isProcessing}
            className="px-3 py-1.5 text-xs text-muted hover:text-text-primary border border-border/30 rounded-lg hover:border-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="清空对话"
          >
            清空
          </button>
          <button
            onClick={onNewSession}
            disabled={isProcessing}
            className="px-3 py-1.5 text-xs font-medium text-accent bg-accent/10 border border-accent/25 rounded-lg hover:bg-accent/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="新建会话"
          >
            + 新会话
          </button>
        </div>
      </div>
    </header>
  )
}
