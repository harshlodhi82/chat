import log from 'lib/utils/logger'
import {ChatMessage, Keystroke} from '../interfaces'

//* *Return type:  */
// key: string
// duration: number
const getKeystrokeFromMessage = function (chatMessage: ChatMessage): Keystroke {
  return {
    key: 'test key',
    duration: 100
  }
}

export default getKeystrokeFromMessage
