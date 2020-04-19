import Chat from '../index'

test('Chat.getKeystrokeFromMessage', () => {
  const username = 'test'
  const duration = 100
  const chat = Chat({
    keystrokeDuration: duration,
    messageKeyMappings: {
      up: ['u'],
      down: ['d'],
      'one-random-word': ['one'],
      '3 random words': ['random output'],
      '2': ['2'],
      a: ['A'],
      'jump': ['shift', 'j']
    }
  })

  let res

  res = chat.getKeystrokeFromMessage({username, message: 'up'})
  expect(res).toEqual({keys: ['u'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'Up'})
  expect(res).toEqual({keys: ['u'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'down'})
  expect(res).toEqual({keys: ['d'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'down '})
  expect(res).toEqual({keys: ['d'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'down '})
  expect(res).toEqual({keys: ['d'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'a down '})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: 'One-random-word'})
  expect(res).toEqual({keys: ['one'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'one random-word'})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: '3 Random Words'})
  expect(res).toEqual({keys: ['random output'], duration})

  res = chat.getKeystrokeFromMessage({username, message: ' 3 random words'})
  expect(res).toEqual({keys: ['random output'], duration})

  res = chat.getKeystrokeFromMessage({username, message: ' 3 random word'})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: '3 random words extra'})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: 'the 3 random words'})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: 'One-random-word'})
  expect(res).toEqual({keys: ['one'], duration})

  res = chat.getKeystrokeFromMessage({username, message: '2'})
  expect(res).toEqual({keys: ['2'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'a'})
  expect(res).toEqual({keys: ['A'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'jump'})
  expect(res).toEqual({keys: ['shift', 'j'], duration})

  res = chat.getKeystrokeFromMessage({username, message: 'JUMP'})
  expect(res).toEqual({keys: ['shift', 'j'], duration})

  expect(() => chat.getKeystrokeFromMessage({username: null, message: `doesn't exist`})).toThrow()

  expect(() => chat.getKeystrokeFromMessage({username, message: null})).toThrow()

  chat.clearActiveWindowInterval()
})
