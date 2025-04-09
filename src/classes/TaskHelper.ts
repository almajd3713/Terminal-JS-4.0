import { MessageTypes } from "../types"
import { VirtualFileSystem } from "./filesystem/FileSystem.js"
import { TerminalUI } from "./TerminalUI.js"

export class TaskHelper  {
  constructor(private ui: TerminalUI, private fileSystem: VirtualFileSystem) {}

  public print(message: string, type?: MessageTypes) {
    this.ui.print(message, type)
  }

  public async input(message: string, onSubmit: (answer: string) => Promise<any> | void) {
    const answer = await new Promise<string>(resolve => {
      this.ui.input(message, (val: string) => {
        resolve(val)
      }, false)
    })
    await onSubmit(answer)
  }

  public async cmd(currentPath?: string) {
    if(!this.fileSystem.checkValidPath(currentPath)) 
      throw new Error("This path does not exisst");
      
    const answer = await new Promise<string>(resolve => {
      this.ui.input(currentPath, (ans) => resolve(ans), true)
    })

    console.log(answer)
    await this.cmd(currentPath)
  }
  
  public async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}