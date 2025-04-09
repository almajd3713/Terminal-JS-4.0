import { FileSystemParser } from "../parser/FileSystemParser.js";
import { IFileTree } from "./types";


export class VirtualFileSystem {
  private root: Folder[] = [];
  private pathParser: FileSystemParser = new FileSystemParser();
  constructor(root: Folder) {
    this.addRoot(root)
  }

  static fromTree(tree: IFileTree | IFileTree[]): VirtualFileSystem {
    if (Array.isArray(tree)) {
      const rootFolder = new Folder("root");
      for (const t of tree) {
        const folder = Folder.fromTree(t);
        rootFolder.addDirectory(folder);
      }
      return new VirtualFileSystem(rootFolder);
    } else {
      const rootFolder = Folder.fromTree(tree);
      return new VirtualFileSystem(rootFolder);
    }
  }
  

  addRoot(folder: Folder) {
    this.root.push(folder);
  }

  // setFileTree(tree: IFileTree[]) {
  //   for(const rt of tree) {
  //     const folder = new Folder(rt.name);
  //     this.root.push(folder);
  //     if (rt.child) {
  //       this.setFileTree(rt.child);
  //     }
  //   }
  // }

  locateFile(id: string) {
    for (const dir of this.root) {
      const found = dir.locateFile(id);
      if (found) {
        return found;
      }
    }
    return null;
  }

  locateFileParent(id: string) {
    for (const dir of this.root) {
      const found = dir.locateFile(id);
      if (found) {
        return found.getParent();
      }
    }
    return null;
  }

  checkValidPath(path: string) {
    let pathTree = this.pathParser.parse(path);
    for(let tail of this.root) {
      let currentPathTree = pathTree
      while(tail && currentPathTree && tail.name === currentPathTree.name) {
        if(!currentPathTree.child) return true // Path exists to file
        currentPathTree = currentPathTree.child
        tail = tail.locateChildDirectory(currentPathTree.name) as Folder
      }
    }
    return false
  }

}


abstract class Directory {
  private id: string = Directory.generateId();
  constructor(private _name: string, private parent?: Directory) {
    this._name = _name;
    this.parent = parent;
  }

  getId() {
    return this.id;
  }
  getParent() {
    return this.parent;
  }
  
  public get name() : string {
    return this._name; 
  }
  
  set name(name: string) {
    this._name = name; 
  }

  abstract open(args: string[]): void;


  static generateId() {
    // Generate a random UUID v4 using crypto
    return crypto.randomUUID();
  }
}

class File extends Directory {
  private tree: Directory[] = [];
  constructor(fileName: string, private execute?: Function) {
    super(fileName);
  }

  async open(args: string[]) {
    await new Promise(resolve => resolve(this.execute ? this.execute(args) : undefined));
  }
}


class Folder extends Directory {
  private tree: Directory[] = [];
  constructor(folderName: string) {
    super(folderName);
  }

  static fromTree(tree: IFileTree) {
    let folder = new Folder(tree.name)
    folder.setTree(tree)
    return folder
  }

  setTree(tree: IFileTree) {
    this.name = tree.name
    if(tree.children) for (const rt of tree.children) {
      const dir: Directory = 
        rt.children && rt.children.length > 0 ? new Folder(rt.name) : 
        new File(rt.name);
      this.tree.push(dir);
      if (rt.children) {
        if (dir instanceof Folder) {
          dir.setTree(rt);
        }
      }
    }
  }

  addDirectory(directory: Directory) {
    this.tree.push(directory);
  }

  renameDirectory(directoryId: string, newName: string) {
    const dir = this.tree.find(dir => dir.getId() === directoryId);
    if (dir) {
      dir.name = newName;
    }
  }

  removeDirectory(directoryId: string) {
    this.tree = this.tree.filter(dir => dir.getId() !== directoryId);
  }

  open(args: string[]) {
    
  }

  locateChildDirectory(name: string) {
    return this.tree.find(dir => dir.name === name) || null;
  }

  locateFile(id: string): Directory | null {
    if (this.getId() === id) {
      return this;
    }
    for (const dir of this.tree) {
      if(dir instanceof Folder) {
        const found = dir.locateFile(id);
        if (found) {
          return found;
        }
      } else if (dir instanceof File && dir.getId() === id) {
        return dir;
      }
    }
    return null;
  }
}