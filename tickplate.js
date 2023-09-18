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

const parseKeys = (strKeyValuePairs, sep = SEPARATOR) => {
  const defaults = {};
  for (const pair of strKeyValuePairs) {
    const { key, value } = parseKeyValuePair(pair, sep);
    defaults[key] = value;
  }
  return { keys: Object.keys(defaults), defaults };
};

const tickplate = (strings, ...keys) => {
  const { keys: tickplateKeys, defaults } = parseKeys(keys);
  return (values) => {
    const result = [strings[0]];
    for (let i = 0; i < tickplateKeys.length; i++) {
      const key = tickplateKeys[i];
      const value = key in values ? values[key] : defaults[key];
      result.push(value, strings[i + 1]);
    }
    return result.join('');
  };
};

module.exports = tickplate;
