import child_process from 'child_process'

const makeWindowActive = function () {
  const command = `nircmd win hide ititle alltop && nircmd win activate ititle ${this.windowName} && nircmd win max ititle ${this.windowName}`

  this.activeWindowInterval = setInterval(function () {
    child_process.exec(command)
  }, this.windowActivatorIntervalTime)
}

export default makeWindowActive
