## Tickplate - Back-tick template engine for JavaScript

[![TravisCI](https://travis-ci.org/metarhia/do.svg?branch=master)](https://travis-ci.org/metarhia/do)
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
  positions: ['imperor', 'philosopher', 'writer'],
};

const templ = t`Example: ${'hello'} ${'myFriend'} great ${'positions'} of Rome`;

console.log(templ(data));
```
