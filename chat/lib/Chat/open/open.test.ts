import Chat from '../index'
import log from 'lib/utils/logger'

test('Chat.open', async (done) => {
  const chat = Chat({url: 'https://www.youtube.com/watch?v=Jl6X40D0CGE'})
  let messageCount = 0
  await chat.on('message', async ({message, username}) => {
    expect(typeof message).toBe('string')
    expect(typeof username).toBe('string')
    if (messageCount++ > 50) {
      await chat.close()
      done()
    }
  })
  await chat.open()
})
