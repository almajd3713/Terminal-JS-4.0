import { VirtualFileSystem } from "../filesystem/FileSystem"
import { TaskInputParser } from "../parser/TaskInputParser"
import { TaskInputArgs } from "../parser/types"
import { TerminalUI } from "../TerminalUI"
import { ICommand } from "./types"


export class TerminalCommandRepo {
  private parser: TaskInputParser = new TaskInputParser()
  private commandList: TerminalCommand[] = []
  constructor(
    private ui: TerminalUI,
    private fileSystem: VirtualFileSystem
  ) {}

  static withDefault() {

  }

  addCommand(commandArgs: ICommand) {
    if(this.commandList.find(com => com.name === commandArgs.name))
      throw new Error("Error: command already exists")
    const command = new TerminalCommand(commandArgs)
    this.commandList.push(command)
  }

  removeCommand(name: string) {
    this.commandList.filter(com => com.name === name)
  }

  async execute(expression: string) {
    const commandArgs = this.parser.parse(expression)
    const command = this.commandList.find(com => com.name === commandArgs.task)
    await command.execute(commandArgs)
  }
}

class TerminalCommand implements ICommand{
  name: string
  description?: string;
  action: (args: TaskInputArgs) => Promise<any>;
  constructor(command: ICommand) {
    this.name = command.name
    this.description = command.description || ''
    this.action = command.action
  }

  public async execute(args: TaskInputArgs) {
    await this.action(args)
  }
}