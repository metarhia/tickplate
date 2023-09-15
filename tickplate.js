'use strict';

const serialize = (value, opts) => {
  if (!Array.isArray(value)) return value;
  const { delimiter } = opts;
  return value.join(delimiter);
};

const tickplate =
  (strings, ...keys) =>
  (values, opts = {}) => {
    const result = [strings[0]];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = serialize(values[key], opts);
      result.push(value, strings[i + 1]);
    }
    return result.join('');
  };

module.exports = tickplate;
