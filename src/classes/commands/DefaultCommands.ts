import { CantSetCursorToAFileError, FolderDoesntExist } from "../filesystem/errors.js";
import { Folder, VirtualFileSystem } from "../filesystem/FileSystem.js";
import { CantCDToFile } from "./errors.js";
import { ICommand } from "./types";


export default (): ICommand[] => [
  {
    name: 'ls',
    description: 'Shows files in current directory',
    async action(helper, args) {
      let output = ''
      for(const dir of helper.getCursor().getChildren()) {
        output = `${output}  ${dir.name}${dir instanceof Folder ? '(folder)': ''}`
      }
      await helper.print(output) 
    },
  }, {
    name: 'cd',
    description: 'Allows for navigation between directories',
    async action(helper, args) {
     if(!helper.commandArgsCheck(args, 1))
        return helper.print('Error: command accepts only 1 argument')
      try {
        helper.setCursor(args.args[0])
      } catch(error) {
        if(error instanceof CantCDToFile) 
          return helper.print("Error: Destination must be a folder")
        if(error instanceof FolderDoesntExist)
          return helper.print("Error: Folder doesnt exist")
      }
    }
  }
]