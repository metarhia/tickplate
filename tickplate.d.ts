declare function tickplate(
  strings: TemplateStringsArray,
  ...keys: string[]
): (values: object) => string;

export = tickplate;
