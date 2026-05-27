import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
  streaming?: boolean
}

const AGENT_ID = 'agent_0501ksmvcy92fbzsycardzmwf9je'
const TOKEN_URL = `/api/elevenlabs/v1/convai/conversation/token?agent_id=${AGENT_ID}`

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hey there! I'm Ozzy — thanks for stopping by. Whether you're planning a septic install, need some land cleared, or just have questions about excavation work, I'm here to help. What can I do for you today?",
      sender: 'agent',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [thinking, setThinking] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const msgIdRef = useRef(1)
  const pendingRef = useRef<string | null>(null)
  const streamingIdRef = useRef<number | null>(null)
  const streamingTextRef = useRef<string>('')
  // Tracks whether any agent response was already added this turn
  const responseHandledRef = useRef(false)
  // Tracks whether this is the first connection (skip dup greeting)
  const firstConnectRef = useRef(true)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  // Connect WebSocket via proxy-signed URL
  const connect = useCallback(async () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    setConnecting(true)
    try {
      // Get signed URL from our Vite proxy
      const res = await fetch(TOKEN_URL)
      const data = await res.json()
      const token = data.token

      // Parse JWT metadata to get signed WebSocket URL
      let signedUrl: string
      try {
        const parts = token.split('.')
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
        const json = atob(base64)
        const payload = JSON.parse(json)
        const metadata = JSON.parse(payload.metadata)
        signedUrl = metadata.signed_url
      } catch {
        throw new Error('Failed to parse signed URL from token')
      }

      // Connect WebSocket with convai sub-protocol
      const ws = new WebSocket(signedUrl, 'convai')

      ws.onopen = () => {
        setConnecting(false)
        // Initiate conversation — no first_message override to avoid dup greeting
        ws.send(JSON.stringify({
          conversation_initiation_client_data: {
            conversation_config_override: {},
          },
        }))

        // Send pending message if any
        if (pendingRef.current) {
          ws.send(JSON.stringify({ type: 'user_message', text: pendingRef.current }))
          pendingRef.current = null
          setThinking(true)
        }
      }

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data)

          // Ping — respond with pong
          if (msg.type === 'ping' || msg.type === 'ping_event') {
            ws.send(JSON.stringify({
              type: 'pong_event',
              event_id: msg.event_id ?? msg.ping_event?.event_id ?? 0,
            }))
            return
          }

          // Streaming text response parts (text-only mode)
          if (msg.type === 'agent_chat_response_part') {
            const part = msg.text_response_part
            if (!part) return

            if (part.type === 'start') {
              // Skip if agent_response already handled this turn
              if (responseHandledRef.current) return

              // On first connection, skip the auto-greeting (already shown in state)
              if (firstConnectRef.current) {
                firstConnectRef.current = false
                responseHandledRef.current = true
                return
              }

              responseHandledRef.current = true
              streamingTextRef.current = ''
              const newId = msgIdRef.current++
              streamingIdRef.current = newId
              setMessages(prev => [...prev, {
                id: newId,
                text: '',
                sender: 'agent',
                timestamp: new Date(),
                streaming: true,
              }])
              setThinking(false)
            } else if (part.type === 'delta' && streamingIdRef.current != null) {
              streamingTextRef.current += part.text || ''
              const sid = streamingIdRef.current
              const accText = streamingTextRef.current
              setMessages(prev => prev.map(m =>
                m.id === sid ? { ...m, text: accText } : m
              ))
            } else if (part.type === 'stop') {
              streamingIdRef.current = null
              streamingTextRef.current = ''
            }
            return
          }

          // Full agent response event — only if nothing handled it yet
          if (msg.type === 'agent_response') {
            if (responseHandledRef.current) return

            const text = msg.agent_response_event?.agent_response || ''
            const trimmed = text.trim()

            if (trimmed) {
              // On first connection, skip the auto-greeting duplicate
              if (firstConnectRef.current) {
                firstConnectRef.current = false
                responseHandledRef.current = true
                return
              }
              responseHandledRef.current = true
              setThinking(false)
              setMessages(prev => [...prev, {
                id: msgIdRef.current++,
                text: trimmed,
                sender: 'agent',
                timestamp: new Date(),
              }])
            }
            return
          }

          // User transcript (echo of what we sent) — ignore
          if (msg.type === 'user_transcript') return

        } catch {
          // Non-JSON binary (audio), ignore in text-only mode
        }
      }

      ws.onerror = () => {
        setConnecting(false)
        setThinking(false)
        streamingIdRef.current = null
        addFallback()
      }

      ws.onclose = () => {
        wsRef.current = null
        setConnecting(false)
        setThinking(false)
        streamingIdRef.current = null
      }

      wsRef.current = ws
    } catch {
      setConnecting(false)
      setThinking(false)
      addFallback()
    }
  }, [])

  const addFallback = useCallback(() => {
    setMessages(prev => [...prev, {
      id: msgIdRef.current++,
      text: "Sorry, I'm having trouble connecting. Please call us at (867) 445-0923 or email admin@ozzysexcavation.ca.",
      sender: 'agent',
      timestamp: new Date(),
    }])
  }, [])

  const sendMessage = useCallback(() => {
    const text = input.trim()
    if (!text) return

    setMessages(prev => [...prev, {
      id: msgIdRef.current++,
      text,
      sender: 'user',
      timestamp: new Date(),
    }])
    setInput('')
    setThinking(true)
    responseHandledRef.current = false
    firstConnectRef.current = false // first message already sent, no more greets

    // If connected, send immediately
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'user_message', text }))
    } else {
      // Queue and connect
      pendingRef.current = text
      connect()
    }
  }, [input, connect])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 100); connect() }}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-rust hover:bg-rust-dark text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          aria-label="Open chat"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute inset-0 rounded-full bg-rust animate-ping opacity-25" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-scale-in">
          {/* Header */}
          <div className="bg-earth text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rust rounded-full flex items-center justify-center text-lg font-bold">O</div>
              <div>
                <div className="font-display font-semibold text-base leading-tight">Ozzy's Excavation</div>
                <div className="text-white/60 text-xs flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${wsRef.current?.readyState === WebSocket.OPEN ? 'bg-green-400' : connecting ? 'bg-yellow-400' : 'bg-green-400'}`} />
                  {connecting ? 'Connecting...' : thinking ? 'Typing...' : 'Online'}
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1" aria-label="Close chat">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-warm-cream">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-rust text-white rounded-br-md' : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'}`}>
                  {msg.text}
                  {msg.streaming && <span className="inline-block w-1.5 h-4 bg-rust ml-0.5 animate-pulse align-middle" />}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-400 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your project..."
                className="flex-1 px-4 py-2.5 bg-warm-cream border border-gray-200 rounded-xl text-base focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition-all"
                disabled={connecting}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || connecting}
                className="w-10 h-10 bg-rust hover:bg-rust-dark disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
