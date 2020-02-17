import puppeteer from 'puppeteer'
import pRetry from 'p-retry'
import {ChatMessage} from '../interfaces'
import log from 'lib/utils/logger'

const open = async function () {
  this.browser = await puppeteer.launch({headless: false})
  this.page = await this.browser.newPage()
  await this.page.goto(this.url)
  await _waitForSelectors(this.page)
  this.messageInterval = setInterval(async () => {
    try {
      await this.page.evaluate(_getChatsArray).then(_emitChats.bind(this))
    }
    catch (error) {
      // log.info(error)
    }
  }, 500)
}

const _waitForSelectors = async (page) => {
  await page.waitForSelector('#container', {visible: true}).then(() => {
    log.info('container showing')
  })
  await page.waitForSelector('#chatframe', {visible: true}).then(() => {
    log.info('chatframe showing')
  })
  await page.waitForSelector('.ytp-play-button', {visible: true}).then(() => {
    log.info('ytp-large-play-button showing')
  })
}

const _getChatsArray = () => {
  let playButton: any = document.querySelector('.ytp-play-button')
  playButton.click()
  let chatframe: any = document.querySelector('#chatframe')
  let allChats: Array<any> = []
  if (chatframe && chatframe.contentDocument !== undefined) {
    allChats = chatframe.contentDocument.querySelectorAll('#items')[1].querySelectorAll('.yt-live-chat-item-list-renderer')
  }
  let chatArray = []
  for (let index = 0; index < allChats.length; index++) {
    playButton.click()
    const chat = allChats[index]
    const message = chat.querySelector('#message')
    if (message && message.textContent.split('##')[message.textContent.split('##').length - 1] !== '@@@@@') {
      const username = chat.querySelector('#author-name')
      if (username && message) {
        chatArray.push({username: username.textContent, message: message.textContent})
        message.textContent = `${message.textContent}##@@@@@`
      }
    }
  }
  return chatArray
}

const _emitChats = function (chatArray: Array<ChatMessage>) {
  for (let index = 0; index < chatArray.length; index++) {
    const chat = chatArray[index]
    this.emit('message', chat)
  }
}

// const _clickPlay = async function (self) {
//   await self.page.click('.ytp-play-button')
// }

// const _reloadPage = async function (self) {
//   await self.page.reload(self.url)
// }

// const _clickPlayWithRetry = async function (self) {
//   const res = await pRetry(() => _clickPlay(self), {
//     retries: 10,
//     onFailedAttempt: () => _reloadPage(self)
//   })
//   return res
// }

export default open
