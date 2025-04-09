import { TerminalCommandRepo } from "./classes/commands/CommandRepo.js"
import { VirtualFileSystem } from "./classes/filesystem/FileSystem.js"
import { Task } from "./classes/Task.js"
import { TaskHelper } from "./classes/TaskHelper.js"
import { TerminalUI } from "./classes/TerminalUI.js"
import { VM } from "./classes/VM.js"

const target = document.getElementById("terminal-container") as HTMLDivElement

const ui = new TerminalUI(target)

const fs1 = VirtualFileSystem.fromTree({
  name: "C",
  children: [
    {
      name: "home",
      children: [
        {
          name: "user",
          children: [
            { name: "documents", children: [
              { name: "notes.txt" },
              { name: "report.pdf" }
            ]},
            { name: "pictures", children: [
              { name: "vacation.jpg" },
              { name: "family.jpg" }
            ]},
            { name: "downloads", children: [
              { name: "game.zip" }
            ]}
          ]
        }
      ]
    },
    {
      name: "system",
      children: [
        { name: "bin", children: [
          { name: "ls" },
          { name: "cd" },
          { name: "mkdir" }
        ]},
        { name: "etc", children: [
          { name: "config.json" }
        ]},
        { name: "var", children: [
          { name: "log", children: [
            { name: "system.log" }
          ]}
        ]}
      ]
    }
  ]
})

const comRepo = TerminalCommandRepo.withDefaults()

const vm1 = new VM(ui, fs1, comRepo)


const bootup = new Task(async(helper) => {
  helper.print("Booting up...")
  await helper.sleep(1000)
  helper.print("Boot up complete.")
  await helper.cmd('C:/home')
})

const shutdown = new Task(async(helper) => {
  // await bootup.execute(helper)
  // helper.print("Shutting down...")
  // await helper.sleep(3000)
  // helper.print("Saving state...")
  // await helper.sleep(1000)
  // helper.print("It iss done. bye.")
})


vm1.addTask("bootup", "Boot up the system", bootup)
vm1.addTask("shutdown", "Shutdown the system", shutdown)

vm1.executeTask("bootup")