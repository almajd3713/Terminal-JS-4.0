export interface IFileTree {
  name: string;
  children?: IFileTree[],
  onOpen?: Function
}

