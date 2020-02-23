import puppeteer from 'puppeteer'
import {ChatMessage} from '../interfaces'
import log from 'lib/utils/logger'

const open = async function () {
  this.browser = await puppeteer.launch({headless: false})
  this.page = await this.browser.newPage()
  await this.page.goto(this.url)
  await _waitForSelectors(this.page)
  this.messageInterval = setInterval(async () => {
    let chatArray = await this.page.evaluate(_getChatsArray)
    _emitChats(chatArray, this)
  }, 500)
}

const _waitForSelectors = async (page) => {
  await page.waitForSelector('#container', {visible: true})
  await page.waitForSelector('#chatframe', {visible: true})
}

const _getChatsArray = () => {
  const playButton: any = document.querySelector('.ytp-play-button')
  const video: any = document.querySelector('.video-stream')
  if (video && video.paused) playButton.click()
  let allChats: Array<any> = []
  let chatArray: Array<any> = []
  const chatframe: any = document.querySelector('#chatframe')
  const chatframeDocument = chatframe.contentDocument.querySelectorAll('#items')[1]
  const scroller = chatframe.contentDocument.querySelector('#item-scroller')
  if (chatframeDocument) allChats = chatframeDocument.querySelectorAll('.yt-live-chat-item-list-renderer')
  for (let index = 0; index < allChats.length; index++) {
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
  if (scroller && chatArray.length === 0) scroller.scroll(0, scroller.scrollHeight)
  return chatArray
}

const _emitChats = function (chatArray: Array<ChatMessage>, self) {
  log.info(chatArray)
  for (let index = 0; index < chatArray.length; index++) {
    const chat = chatArray[index]
    self.emit('message', chat)
  }
}

export default open
