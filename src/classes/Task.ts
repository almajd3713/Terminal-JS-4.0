import { MessageTypes } from "../types";
import { TerminalUI } from "./TerminalUI";


class Task {
  private ctx: TaskContext
  constructor() {}
}

class TaskContext  {
  constructor(private ui: TerminalUI) {}

  public print(message: string, type?: MessageTypes) {

  }

  public input(message: string, onSubmit: (answer: string) => void) {

  }

  public cmd(currentPath?: string, onSubmit?: (answer: string) => void) {

  }
  
  public async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}