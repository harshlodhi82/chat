import {EventEmitter} from 'events'
import open from './open'
import getKeystrokeFromMessage from './getKeystrokeFromMessage'
import sendKeystrokeToWindow from './sendKeystrokeToWindow'
import makeWindowActive from './makeWindowActive'

class Chat extends EventEmitter {
  url: string = null
  windowName: string = null
  keystrokeDuration:Number = null
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
  windowActivatorIntervalTime = 2000

  constructor ({url, keystrokeDuration, messageKeyMappings, windowName}) {
    super()
    this.url = url
    this.keystrokeDuration = keystrokeDuration
    this.windowName = windowName
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
