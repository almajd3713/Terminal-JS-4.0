import { Folder, VirtualFileSystem } from "../filesystem/FileSystem.js";
import { TaskHelper } from "../TaskHelper.js";
import { TerminalUI } from "../TerminalUI";
import { ICommand } from "./types";


export default (): ICommand[] => [
  {
    name: 'ls',
    description: 'Shows files in current directory',
    async action(helper, args) {
      let output = ''
      for(const dir of helper.getCursor().getChildren()) {
        output = `${output}  ${dir.name}${dir instanceof Folder && '(folder)'}`
      }
      await helper.print(output) 
    },
  }
]