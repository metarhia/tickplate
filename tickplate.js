'use strict';
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const tickplate = (template, sandbox, callback) => {
  const cxt = Object.freeze(sandbox);
  const file = path.resolve(__dirname, template);
  fs.readFile(file, (err, content) => {
    if (!err) {
      const script = new vm.Script('`' + content + '`');
      const context = new vm.createContext(cxt);
      const result = script.runInContext(context);
      callback(null, result);
    } else {
      callback(err);
    }
  });
};

module.exports = tickplate;
