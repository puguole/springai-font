import { SessionProvider } from './hooks/useSession'
import { useChat } from './hooks/useChat'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

function ChatPage() {
  const {
    messages,
    isProcessing,
    mode,
    sendMessage,
    stopStream,
    setMode,
    clearMessages,
    newSession,
  } = useChat()

  return (
    <div className="h-full flex flex-col bg-[#0b0d16]">
      <ChatHeader
        mode={mode}
        onModeChange={setMode}
        onNewSession={newSession}
        onClear={clearMessages}
        isProcessing={isProcessing}
      />
      <MessageList messages={messages} />
      <ChatInput
        onSend={sendMessage}
        onStop={stopStream}
        isProcessing={isProcessing}
        mode={mode}
      />
    </div>
  )
}

export default function App() {
  return (
    <SessionProvider>
      <ChatPage />
    </SessionProvider>
  )
}
