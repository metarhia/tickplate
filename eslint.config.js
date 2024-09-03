'use strict';

const init = require('eslint-config-metarhia');

module.exports = [
  ...init,
  {
    rules: {
      [`max-len`]: ['error', { ignoreTemplateLiterals: true }],
    },
  },
];
