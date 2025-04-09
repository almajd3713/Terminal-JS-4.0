
interface IPathSegment {
  name: string;
  child?: IPathSegment;
}

export class FileSystemParser {
  constructor() {}

  parse(path: string) {
    if (!path?.trim()) throw new Error("Path cannot be empty");
      
    const isAbsolute = path.startsWith('/') || /^[a-zA-Z]:[\\/]/.test(path);

    const segments = path
      .split('/')
      .filter(seg => seg !== '' && seg !== '.')
      .reduce<IPathSegment[]>((acc, seg, index) => {
        if(index === 0) seg = seg.replace(/:$/, '')
        if (seg === '..') acc.pop();
        else acc.push({ name: seg });
        return acc;
      }, []);
    if (segments.length === 0) throw new Error("Path resolves to empty");

    const tree =  segments.reduceRight((child, segment) => ({
      ...segment,
      child,
    }));
    return tree
  }

  stringify(file: IPathSegment) {
    let path = file.name;
    let current = file.child;

    while (current) {
      path += '/' + current.name;
      current = current.child;
    }

    return path;
  }
}