import type { ChatMode } from '../types/chat'

interface ModeToggleProps {
  mode: ChatMode
  onChange: (mode: ChatMode) => void
  disabled?: boolean
}

export default function ModeToggle({ mode, onChange, disabled }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-1.5 bg-surface-light/30 rounded-lg p-0.5 border border-border/30">
      <button
        onClick={() => onChange('stream')}
        disabled={disabled}
        className={`relative px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
          mode === 'stream'
            ? 'bg-accent/15 text-accent shadow-sm'
            : 'text-muted hover:text-text-primary'
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        流式
      </button>
      <button
        onClick={() => onChange('blocking')}
        disabled={disabled}
        className={`relative px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
          mode === 'blocking'
            ? 'bg-accent/15 text-accent shadow-sm'
            : 'text-muted hover:text-text-primary'
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        阻塞
      </button>
    </div>
  )
}
