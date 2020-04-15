import child_process from 'child_process'

const makeWindowActive = function () {
  const command = `nircmd win activate ititle "${this.windowName}" && nircmd win max ititle "${this.windowName}"`
  
  this.activeWindowInterval = setInterval(async function () {
    child_process.exec(command)
  }, this.activeWindowTime)
}

export default makeWindowActive
