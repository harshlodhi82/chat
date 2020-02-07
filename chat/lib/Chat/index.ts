import {EventEmitter} from 'events'
import open from './open'
import getKeystrokeFromMessage from './getKeystrokeFromMessage'

class Chat extends EventEmitter {
  url: string = null
  open = open
  getKeystrokeFromMessage = getKeystrokeFromMessage
  messageKeyMappings = {}
  page = null
  browser = null
  constructor ({url, messageKeyMappings}) {
    super()
    this.url = url
    this.messageKeyMappings = messageKeyMappings
  }
}

export default (options) => new Chat(options)
