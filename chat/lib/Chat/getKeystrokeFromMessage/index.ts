import {ChatMessage, Keystroke} from '../interfaces'

const getKeystrokeFromMessage = function (chatMessage: ChatMessage): Keystroke {
  const {username, message} = chatMessage
  _isValidArgs(username, message)
  const keys = Object.keys(this.messageKeyMappings)
  let splitMessageArray = message.trim().split(' ')
  let validKey = _getValidKey(keys, splitMessageArray)
  return _returnValue(this, validKey, 100)
}

const _getValidKey = (keys: Array<string>, splitMessageArray: Array<string>) => {
  let validKey
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    if (_isKeyValid(splitMessageArray, key)) {
      validKey = key
      break
    }
  }
  return validKey
}

const _isKeyValid = (splitMessageArray: Array<string>, key: string) => {
  return splitMessageArray && splitMessageArray.length > 0 && splitMessageArray[0].toLowerCase().indexOf(key) !== -1
}

const _isValidArgs = (username, message) => {
  if (!username && !message) throw Error('Username and Message is invalid.')
  if (!username) throw Error('Username is invalid.')
  if (!message) throw Error('Message is invalid.')
}

const _returnValue = (self, validKey, duration) => {
  if (validKey) {
    return {
      key: self.messageKeyMappings[validKey],
      duration
    }
  }
  return null
}

export default getKeystrokeFromMessage
