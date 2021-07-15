'use strict';

const tickplate =
  (strings, ...keys) =>
  (values) => {
    const result = [strings[0]];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      result.push(values[key], strings[i + 1]);
    }
    return result.join('');
  };

module.exports = tickplate;
