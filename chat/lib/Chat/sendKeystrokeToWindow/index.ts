import {Keystroke} from '../interfaces'
import keySender from 'node-key-sender'

const sendKeystrokeToWindow = async function (keystroke: Keystroke) {
  try {
    let resData = await keySender.sendKey(keystroke.key)
    return resData
  }
  catch (error) {
    throw error
  }
}

export default sendKeystrokeToWindow
