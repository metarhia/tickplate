const vm = require('vm');

/**
 * Replace backticks with corresponding HTML entity
 * @param  {String} string String to be escaped
 * @return {String}        Escaped string
 */
const escapeBackticks = string => string.replace(/`/g, '&#96;');

/**
 * Format correct body for template literal string
 * @param  {String} string String to be formatted
 * @return {String}        Body for template literal string
 */
const formatBody = (string) => {
  const delimiters = {
    start: '${',
    end: '}',
  };
  let result = '';
  let buffer = '';
  let startFound = false;
  let endFound = false;
  let nested = 0;
  for (let i = 0; i < string.length; i += 1) {
    const startDelimiter = i < string.length - 1 ? string[i] + string[i + 1] : null;
    if (startDelimiter && startDelimiter === delimiters.start) {
      if (startFound) {
        nested += 1;
      } else {
        if (buffer.length !== 0) {
          result += escapeBackticks(buffer);
          buffer = '';
        }
        startFound = true;
      }
    } else if (startFound && string[i] === delimiters.end) {
      if (nested !== 0) {
        nested -= 1;
      } else {
        endFound = true;
      }
    }
    buffer += string[i];
    if (startFound && endFound) {
      result += buffer;
      startFound = false;
      endFound = false;
      buffer = '';
    }
    if (buffer.length !== 0 && i === string.length - 1) {
      result += escapeBackticks(buffer);
    }
  }
  return result;
};

/**
 * Compile template with passed context
 * @param  {String} template String representing template
 * @param  {Object} context  Object representing template context
 * @return {String}          Compiled template
 */
const tickplate = (template, context) => {
  const code = `\`${formatBody(template)}\``;
  return vm.runInNewContext(code, context);
};

module.exports = tickplate;
