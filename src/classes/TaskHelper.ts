import { MessageTypes } from "../types"
import { TerminalUI } from "./TerminalUI"

export class TaskHelper  {
  constructor(private ui: TerminalUI) {}

  public print(message: string, type?: MessageTypes) {
    this.ui.print(message, type)
  }

  public async input(message: string, onSubmit: (answer: string) => Promise<any> | void) {
    const answer = await new Promise<string>(resolve => {
      this.ui.input(message, (val: string) => {
        resolve(val)
      })
    })
    await onSubmit(answer)
  }

  public cmd(currentPath?: string, onSubmit?: (answer: string) => void) {
    
  }
  
  public async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}