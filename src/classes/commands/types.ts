import { TaskInputArgs } from "../parser/types"
import { TaskHelper } from "../TaskHelper"

export interface ICommand {
  name: string
  description?: string
  action: (helper: TaskHelper, args: TaskInputArgs) => Promise<any>
}