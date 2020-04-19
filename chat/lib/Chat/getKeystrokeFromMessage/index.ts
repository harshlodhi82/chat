import {ChatMessage, Keystroke} from '../interfaces'

const getKeystrokeFromMessage = function (chatMessage: ChatMessage): Keystroke {
  const {username, message} = chatMessage
  _isValidArgs(username, message)
  const keys = Object.keys(this.messageKeyMappings)
  let validKey = _getValidKeyFromMessageKeyMappings(keys, message)
  if (validKey) {
    return {
      keys: this.messageKeyMappings[validKey],
      duration: this.keystrokeDuration
    }
  }
}

const _getValidKeyFromMessageKeyMappings = (keys: Array<string>, message: string): string => {
  let validKey
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    if (key.trim().toLowerCase() === message.trim().toLowerCase()) {
      validKey = key
      break
    }
  }
  return validKey
}

const _isValidArgs = (username, message) => {
  if (!username && !message) throw Error(`username '${username}' and message '${message}' is invalid.`)
  if (!username) throw Error(`username '${username}' is invalid.`)
  if (!message) throw Error(`message '${message}' is invalid.`)
}

export default getKeystrokeFromMessage
