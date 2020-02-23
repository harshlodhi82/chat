import {ChatMessage, Keystroke} from '../interfaces'

const getKeystrokeFromMessage = function (chatMessage: ChatMessage): Keystroke {
  const {username, message} = chatMessage
  _isValidArgs(username, message)
  const keys = Object.keys(this.messageKeyMappings)
  let validKey = _getValidKey(keys, message)
  return _returnValue(this, message, validKey, 100)
}

const _getValidKey = (keys: Array<string>, message: string): string => {
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
  if (!username && !message) throw Error(`username ${username} and message ${message} is invalid.`)
  if (!username) throw Error(`username ${username} is invalid.`)
  if (!message) throw Error(`message ${message} is invalid.`)
}

const _returnValue = (self, message: string, validKey: string, duration: number): Keystroke => {
  if (validKey && message.trim().length !== 1) {
    return {
      key: self.messageKeyMappings[validKey],
      duration
    }
  }
  return self.messageKeyMappings[validKey]
}

export default getKeystrokeFromMessage
