import Chat from '../index'

test('Chat.open', async (done) => {
  const chat = Chat({url: 'https://www.youtube.com/watch?v=Jl6X40D0CGE'})
  let messageCount = 0
  chat.on('message', ({message, username}) => {
    expect(typeof message).toBe('string')
    expect(typeof username).toBe('string')

    if (messageCount++ > 10) {
      done()
    }
  })
})
