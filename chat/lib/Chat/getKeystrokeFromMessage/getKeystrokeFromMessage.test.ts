import Chat from '../index'

test('Chat.getKeystrokeFromMessage', async () => {
  const username = 'test'
  const duration = 100
  const chat = Chat({messageKeyMappings: {up: 'u', 'down': 'd'}})
  let res

  res = chat.getKeystrokeFromMessage({username, message: 'up'})
  expect(res).toEqual({key: 'u', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'Up'})
  expect(res).toEqual({key: 'u', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'down'})
  expect(res).toEqual({key: 'd', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'down '})
  expect(res).toEqual({key: 'd', duration})

  res = chat.getKeystrokeFromMessage({username, message: 'a down '})
  expect(res).toBeFalsy()

  res = chat.getKeystrokeFromMessage({username, message: 'something'})
  expect(res).toBeFalsy()

  expect(() => chat.getKeystrokeFromMessage({message: 'something'})).toThrow()

  expect(() => chat.getKeystrokeFromMessage({username})).toThrow()
})
