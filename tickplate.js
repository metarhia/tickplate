'use strict';

const tickplate = (strings, ...keys) => {
  console.dir({ strings, keys });
  return values => {
    console.dir({ values });
    const result = [strings[0]];
    keys.forEach((key, i) => {
      result.push(values[key], strings[i + 1]);
    });
    return result.join('');
  };
};

module.exports = tickplate;
