'use strict';

const SEPARATOR = '=';

const parseKeyValuePair = (value, sep = SEPARATOR) => {
  const [lhs, ...rhs] = value.split(sep);
  const key = lhs.trim();
  if (rhs.length === 0) return { key };
  const rhsRestored = rhs.join(sep).trim();
  try {
    const value = JSON.parse(rhsRestored);
    return { key, value };
  } catch {
    return { key };
  }
};

const tickplate =
  (strings, ...keys) =>
  (values) => {
    const result = [strings[0]];
    for (let i = 0; i < keys.length; i++) {
      const { key, value: fallback } = parseKeyValuePair(keys[i]);
      result.push(values[key] || fallback, strings[i + 1]);
    }
    return result.join('');
  };

module.exports = tickplate;
