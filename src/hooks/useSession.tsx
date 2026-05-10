import { createContext, useContext, useCallback, useState, type ReactNode } from 'react'

interface SessionContextType {
  sessionId: string
  userNo: string
  newSession: () => void
}

const SessionContext = createContext<SessionContextType | null>(null)

function generateId(): string {
  return crypto.randomUUID()
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState(generateId)

  const newSession = useCallback(() => {
    setSessionId(generateId())
  }, [])

  return (
    <SessionContext.Provider value={{ sessionId, userNo: '张三', newSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession(): SessionContextType {
  const ctx = useContext(SessionContext)
  if (!ctx) {
    throw new Error('useSession must be used within SessionProvider')
  }
  return ctx
}
