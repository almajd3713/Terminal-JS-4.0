import { VirtualFileSystem } from "../filesystem/FileSystem"
import { TaskInputParser } from "../parser/TaskInputParser.js"
import { TaskInputArgs } from "../parser/types"
import { TaskHelper } from "../TaskHelper"
import { TerminalUI } from "../TerminalUI"
import DefaultCommands from "./DefaultCommands.js"
import { ICommand } from "./types"


export class TerminalCommandRepo {
  public parser: TaskInputParser = new TaskInputParser()
  private commandList: TerminalCommand[] = []
  constructor(

  ) {}

  static withDefaults() {
    const commands = DefaultCommands().map(com => new TerminalCommand(com))
    const repo = new TerminalCommandRepo();
    commands.forEach(command => repo.commandList.push(command));
    return repo;
  }
  // loadDefaults(context: TaskHelper) {
  //   const commands = DefaultCommands().map(com => new TerminalCommand(com))
  //   for(const command of commands)
  //     this.addCommand(command)
  // }

  addCommand(commandArgs: ICommand) {
    if(this.commandList.find(com => com.name === commandArgs.name))
      throw new Error("Error: command already exists")
    const command = new TerminalCommand(commandArgs)
    this.commandList.push(command)
  }

  removeCommand(name: string) {
    this.commandList.filter(com => com.name === name)
  }

  async execute(expression: string, context: TaskHelper) {
    const commandArgs = this.parser.parse(expression)
    const command = this.commandList.find(com => com.name === commandArgs.task)
    if(command) await command.execute(context, commandArgs)
  }
}

class TerminalCommand implements ICommand{
  name: string
  description?: string;
  action: (helper: TaskHelper, args: TaskInputArgs) => Promise<any>;
  constructor(command: ICommand) {
    this.name = command.name
    this.description = command.description || ''
    this.action = command.action
  }

  public async execute(helper: TaskHelper, args: TaskInputArgs) {
    await this.action(helper, args)
  }
}