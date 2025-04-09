
interface IPathSegment {
  name: string;
  child?: IPathSegment;
}

export class FileSystemParser {
  constructor() {}

  parse(path: string): IPathSegment {
    if (!path?.trim()) throw new Error("Path cannot be empty");

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

    return segments.reduceRight((child, segment) => ({
      ...segment,
      child,
    }));
  }

  // getSubPath(name: string, subPath)
}