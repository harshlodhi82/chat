import Chat from '../index'

test('Chat.getKeystrokeFromMessage', () => {
  const username = 'test'
  const duration = 100
  const chat = Chat({
    keystrokeDuration: duration,
    messageKeyMappings: {
      up: 'u',
      down: 'd',
      'one-random-word': 'one',
      '3 random words': 'random output',
      '2': '2',
      a: 'A'
    }
  })

  let res

  res = chat.getKeystrokeFromMessage({username, message: 'up'})
  expect(res).toEqual({key: 'u', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'Up'})
  expect(res).toEqual({key: 'u', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'down'})
  expect(res).toEqual({key: 'd', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'down '})
  expect(res).toEqual({key: 'd', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'down '})
  expect(res).toEqual({key: 'd', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'a down '})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: 'One-random-word'})
  expect(res).toEqual({key: 'one', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'one random-word'})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: '3 Random Words'})
  expect(res).toEqual({key: 'random output', duration})

  res = chat.getKeystrokeFromMessage({username, message: ' 3 random words'})
  expect(res).toEqual({key: 'random output', duration})

  res = chat.getKeystrokeFromMessage({username, message: ' 3 random word'})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: '3 random words extra'})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: 'the 3 random words'})
  expect(res).toBe(undefined)

  res = chat.getKeystrokeFromMessage({username, message: 'One-random-word'})
  expect(res).toEqual({key: 'one', duration})

  res = chat.getKeystrokeFromMessage({username, message: '2'})
  expect(res).toBe('2')

  res = chat.getKeystrokeFromMessage({username, message: 'a'})
  expect(res).toBe('A')

  expect(() => chat.getKeystrokeFromMessage({username: null, message: `doesn't exist`})).toThrow()

  expect(() => chat.getKeystrokeFromMessage({username, message: null})).toThrow()

  chat.clearActiveWindowInterval()
})
