import { useSession } from '../hooks/useSession'

export default function SessionBadge() {
  const { sessionId } = useSession()
  const shortId = sessionId.slice(0, 8)

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-light/50 border border-border/40 text-xs font-mono text-muted">
      <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
      ID: {shortId}
    </div>
  )
}
