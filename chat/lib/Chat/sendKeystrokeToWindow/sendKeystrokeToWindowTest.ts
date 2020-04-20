import Chat from '../'

const username = 'test'
const duration = 1000
const chat = Chat({
  keystrokeDuration: duration,
  messageKeyMappings: {
    up: ['u'],
    down: ['d'],
    'one-random-word': ['one'],
    '3 random words': ['random output'],
    '2': ['2'],
    a: ['A']
  },
  windowName: 'notepad'
})

const keystroke = chat.getKeystrokeFromMessage({username, message: 'up'})
const keystroke2 = chat.getKeystrokeFromMessage({username, message: 'down'})
const counter = 5
setTimeout(async () => {
  await chat.sendKeystrokeToWindow(keystroke)
  await chat.sendKeystrokeToWindow(keystroke2)
}, chat.windowActivatorIntervalTime)

setTimeout(async () => {
  await chat.clearActiveWindowInterval()
}, chat.windowActivatorIntervalTime * counter)
