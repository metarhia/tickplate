interface TickplateOptions {
  delimiter?: string;
}

type TickplateTemplate = (
  values?: Record<string, unknown> | null,
  opts?: TickplateOptions,
) => string;

declare function tickplate(
  strings: TemplateStringsArray,
  ...keys: string[]
): TickplateTemplate;

export = tickplate;
