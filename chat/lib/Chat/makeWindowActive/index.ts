import child_process from 'child_process'
import log from 'lib/utils/logger'

const makeWindowActive = function () {
  const command = `nircmd win activate ititle ${this.windowName} && nircmd win togglemin ititle ${this.windowName} && nircmd win togglemax ititle ${this.windowName}`
  
  this.activeWindowInterval = setInterval(function () {
    let process = child_process.exec(command)
    process.stderr.on("data", log.info)
    process.stdout.on("data", log.info)
  }, this.windowActivatorIntervalTime)
}

export default makeWindowActive
