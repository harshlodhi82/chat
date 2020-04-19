import Chat from '../'

const chat = Chat({
  keystrokeDuration: 100,
  messageKeyMappings: {
    up: 'u',
    down: 'd',
    'one-random-word': 'one',
    '3 random words': 'random output',
    '2': '2',
    a: 'A'
  },
  windowName: 'notepad'
})
