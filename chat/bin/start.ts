import {argv} from 'yargs'
import Chat from '../lib/Chat/index'

const windowName = argv.windowName
const url = argv.url
const keystrokeDuration = argv.keystrokeDuration
const messageKeyMappings = argv.messageKeyMappings

const chat = Chat({windowName, url, keystrokeDuration, messageKeyMappings})

/** Command :: ts-node ./bin/start.ts --windowName="notepad" --url="https://www.youtube.com/watch?v=Jl6X40D0CGE" --keystrokeDuration=100 --messageKeyMappings.finally="finally"  --messageKeyMappings.LOL="shift" --messageKeyMappings.LOL="j" --messageKeyMappings.up="up" */

const index = async () => {
  keyMapper()
  console.log(messageKeyMappings);
  
  chat.on('message', chatOnCallBack)
  await chat.open()
}

const chatOnCallBack = async ({message, username}) => {
  if (message && username) {
    let keystroke = chat.getKeystrokeFromMessage({username, message})
    if (keystroke) {
      await chat.sendKeystrokeToWindow(keystroke)
    }
  }
}

const keyMapper = ()=>{
  Object.keys(messageKeyMappings).forEach((key)=>{
    if(!Array.isArray(messageKeyMappings[key])){
      messageKeyMappings[key] = [messageKeyMappings[key]]
    }
  })
}


index()
