'use strict';

const tickplate =
  (strings, ...keys) =>
  (values) =>
    String.raw(strings, ...keys.map((key) => values[key] ?? ''));

module.exports = tickplate;
