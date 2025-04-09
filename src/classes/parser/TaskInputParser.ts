

class TaskInputParser {
  constructor() {}

  parse(input: string) {
    const tokens = input.trim().match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    let task = tokens[0] || '';
    let args: string[] = [];
    let flags: Record<string, string> = {};

    for (let i = 1; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.startsWith('-')) {
        const flagName = token.replace(/^--?/, '');
        const next = tokens[i + 1];

        if (next && !next.startsWith('-')) {
          flags[flagName] = TaskInputParser.stripQuotes(next);
          i++;
        } else {
          flags[flagName] = 'true';
        }
      } else {
        args.push(TaskInputParser.stripQuotes(token));
      }
    }

    return { task, args, flags };
  }

  static stripQuotes(value: string) {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1);
    }
    return value;
  }
}