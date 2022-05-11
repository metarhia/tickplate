## Tickplate - Back-tick templates for JavaScript

[![ci status](https://github.com/metarhia/tickplate/workflows/Testing%20CI/badge.svg)](https://github.com/metarhia/tickplate/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![codacy](https://api.codacy.com/project/badge/Grade/69719502402b43598ffac0fd35f2192c)](https://www.codacy.com/app/metarhia/tickplate)
[![snyk](https://snyk.io/test/github/metarhia/tickplate/badge.svg)](https://snyk.io/test/github/metarhia/tickplate)
[![npm version](https://badge.fury.io/js/tickplate.svg)](https://badge.fury.io/js/tickplate)
[![npm downloads/month](https://img.shields.io/npm/dm/tickplate.svg)](https://www.npmjs.com/package/tickplate)
[![npm downloads](https://img.shields.io/npm/dt/tickplate.svg)](https://www.npmjs.com/package/tickplate)

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

const templ = t`${'hello'} ${'myFriend'}, great ${'positions'} of Rome`;

console.log(templ(data));
```

## License & Contributors

Copyright (c) 2017-2022 [Metarhia contributors](https://github.com/metarhia/tickplate/graphs/contributors).
Tickplate is [MIT licensed](./LICENSE).\
Tickplate is a part of [Metarhia](https://github.com/metarhia) technology stack.
