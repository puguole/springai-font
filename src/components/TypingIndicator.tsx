export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1">
      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse-dot" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse-dot" style={{ animationDelay: '300ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse-dot" style={{ animationDelay: '600ms' }} />
    </div>
  )
}
