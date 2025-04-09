import { MessageTypes } from "../types"
import { TerminalCommandRepo } from "./commands/CommandRepo"
import { VirtualFileSystem } from "./filesystem/FileSystem.js"
import { TerminalUI } from "./TerminalUI.js"
import * as VirtualFileSystemErrors from './filesystem/errors.js'
import * as CommandErrors from './commands/errors.js'
import { TaskInputArgs } from "./parser/types"

export class TaskHelper  {
  constructor(
    private ui: TerminalUI, 
    private fileSystem: VirtualFileSystem,
    private commandRepo: TerminalCommandRepo
  ) {}

  //! UI RELATAED
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

  public async cmd() {      
    const path = this.fileSystem.getCursorPath()
      .split('/')
      .map((seg, i) => i === 0 ? `${seg}:` : seg)
      .join('/')
    const answer = await new Promise<string>(resolve => {
      this.ui.input(path , (ans) => resolve(ans), true)
    })

    await this.commandRepo.execute(answer, this)

    await this.cmd()
  }
  
  public async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  public clear() {
    this.ui.clear()
  }

  //! FILESYS RELATED
  public getCursor() {
    return this.fileSystem.cursor.dir
  }
  public setCursor(newVal: string) {
    try {
      this.fileSystem.cursor = newVal
    } catch (error) {
      if(error instanceof VirtualFileSystemErrors.CantSetCursorToAFileError)
        throw new CommandErrors.CantCDToFile()
      if(error instanceof VirtualFileSystemErrors.FolderNotFoundError)
        throw error
    }
  }

  public async openFile(name: string, args: string[]) {
    const file = this.fileSystem.locateFileRelativeByName(name)
    if(!file)
      throw new VirtualFileSystemErrors.FileNotFoundError
    try {
      await file.open(args)
    } catch(error) {throw error}
  }

  //! MISC
  commandArgsCheck(comArgs: TaskInputArgs, length: number) {
    return length === comArgs.args.length
  }
}