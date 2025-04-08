import { Task } from "./classes/Task.js"
import { TerminalUI } from "./classes/TerminalUI.js"
import { VM } from "./classes/VM.js"

const target = document.getElementById("terminal-container") as HTMLDivElement

const ui = new TerminalUI(target)

const vm1 = new VM(ui)


const bootup = new Task(async(helper) => {
  helper.print("Booting up...")
  await helper.sleep(1000)
  helper.print("Loading modules...")
  await helper.sleep(1000)
  helper.print("Starting services...")
  await helper.sleep(1000)
  helper.print("System ready.")
})

const shutdown = new Task(async(helper) => {
  await bootup.execute(helper)
  helper.print("Shutting down...")
  await helper.sleep(3000)
  helper.print("Saving state...")
  await helper.sleep(1000)
  helper.print("It iss done. bye.")
})

vm1.addTask("bootup", "Boot up the system", bootup)
vm1.addTask("shutdown", "Shutdown the system", shutdown)

vm1.executeTask("shutdown")