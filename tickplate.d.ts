interface TickplateOptions {
  delimiter?: any;
}

declare function tickplate(
  strings: Array<string>,
  ...keys: Array<string>
): (values: object, opts?: TickplateOptions) => string;

export = tickplate;
