import {Keystroke} from '../interfaces'
import keySender from 'node-key-sender'

const sendKeystrokeToWindow = async function (keystroke: Keystroke) {
  try {
    let keys = keystroke.keys
    let resData = await keySender.sendCombination(keys)
    return resData
  }
  catch (error) {
    throw Error(`failed sending keystroke '${keystroke}': ${error.message}`)
  }
}

export default sendKeystrokeToWindow
