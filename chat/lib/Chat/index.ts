import {EventEmitter} from 'events'
import open from './open'
import getKeystrokeFromMessage from './getKeystrokeFromMessage'
import sendKeystrokeToWindow from './sendKeystrokeToWindow'
import makeWindowActive from './makeWindowActive'

class Chat extends EventEmitter {
  url: string = null
  windowName: string = null
  open = open
  getKeystrokeFromMessage = getKeystrokeFromMessage
  sendKeystrokeToWindow = sendKeystrokeToWindow
  makeWindowActive = makeWindowActive
  messageKeyMappings = {}
  messageInterval = null
  activeWindowInterval = null
  windowActivatorInterval = null
  page = null
  browser = null
  activeWindowTime = 5000

  constructor ({url, messageKeyMappings}) {
    super()
    this.url = url
    this.windowName = 'notepad'
    this.messageKeyMappings = messageKeyMappings
    this.makeWindowActive()
  }

  close = async () => {
    await clearInterval(this.messageInterval)
    await this.browser.close()
  }

  clearActiveWindowInterval = async () => {
    await clearInterval(this.activeWindowInterval)
  }
}

export default (options) => new Chat(options)
