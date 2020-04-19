interface ChatMessage {
  username: string
  message: string
}

interface Keystroke {
  keys: string[]
  duration: number
}

export {ChatMessage, Keystroke}
