import {EventEmitter} from 'events'
import open from './open'

class Chat extends EventEmitter {
  url: string = null
  open = open
  page = null
  browser = null
  constructor ({url}) {
    super()
    this.url = url
  }
}

export default (options) => new Chat(options)
