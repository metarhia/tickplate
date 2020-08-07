## Tickplate - Back-tick templates for JavaScript

[![Testing CI](https://github.com/metarhia/tickplate/workflows/Testing%20CI/badge.svg?branch=master)](https://github.com/metarhia/tickplate/actions)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/69719502402b43598ffac0fd35f2192c)](https://www.codacy.com/app/metarhia/tickplate)
[![NPM Version](https://badge.fury.io/js/tickplate.svg)](https://badge.fury.io/js/tickplate)
[![NPM Downloads/Month](https://img.shields.io/npm/dm/tickplate.svg)](https://www.npmjs.com/package/tickplate)
[![NPM Downloads](https://img.shields.io/npm/dt/tickplate.svg)](https://www.npmjs.com/package/tickplate)

## Usage

- Install: `npm install tickplate`
- Require: `const t = require('tickplate');`
- Place tag `t` before templated string

## Examples:

```js
const t = require('tickplate');

const data = {
  hello: 'Ave!',
  myFriend: {
    name: 'Marcus Aurelius',
    toString() {
      return this.name;
    },
  },
  positions: ['emperor', 'philosopher', 'writer'],
};

const templ = t`Example: ${'hello'} ${'myFriend'}, the great ${'positions'} of Rome`;

console.log(templ(data));
```
