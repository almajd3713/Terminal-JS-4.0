import { TaskInputArgs } from "../parser/types"

export interface ICommand {
  name: string
  description?: string
  action: (args: TaskInputArgs) => Promise<any>
}