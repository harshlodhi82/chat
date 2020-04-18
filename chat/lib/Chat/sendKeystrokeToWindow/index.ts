import {Keystroke} from '../interfaces'
import keySender from 'node-key-sender'

const sendKeystrokeToWindow = async function (keystroke: Keystroke) {
  try {
    let keys = keystroke.key.split("")
    let resData = await keySender.sendKeys(keys)
    return resData
  }
  catch (error) {
    throw Error(`failed sending keystroke '${keystroke}': ${error.message}`)
  }
}

export default sendKeystrokeToWindow
