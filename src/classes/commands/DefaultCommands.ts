import { VirtualFileSystem } from "../filesystem/FileSystem";
import { TerminalUI } from "../TerminalUI";
import { ICommand } from "./types";


export default (ui: TerminalUI, fs: VirtualFileSystem): ICommand[] => [
  {
    name: 'ls',
    description: 'Shows files in current directory',
    async action() {
      let output = ''
      
    },
  }
]