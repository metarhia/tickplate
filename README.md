## Tickplate - Back-tick templates for JavaScript

[![ci status](https://github.com/metarhia/tickplate/workflows/Testing%20CI/badge.svg)](https://github.com/metarhia/tickplate/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![snyk](https://snyk.io/test/github/metarhia/tickplate/badge.svg)](https://snyk.io/test/github/metarhia/tickplate)
[![npm version](https://badge.fury.io/js/tickplate.svg)](https://badge.fury.io/js/tickplate)
[![npm downloads/month](https://img.shields.io/npm/dm/tickplate.svg)](https://www.npmjs.com/package/tickplate)
[![npm downloads](https://img.shields.io/npm/dt/tickplate.svg)](https://www.npmjs.com/package/tickplate)

Zero-dependency back-tick templates using property names instead of expressions.
Part of the [Metarhia](https://github.com/metarhia) stack.

## Installation

```bash
npm install tickplate
```

## Usage

Place tag `t` before a template literal. Placeholders use property names (strings)
as keys; pass a data object to the returned function to render.

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
// Ave! Marcus Aurelius, great emperor, philosopher, writer of Rome
```

### ESM

```js
import t from 'tickplate';

const templ = t`Hello ${'name'}!`;
console.log(templ({ name: 'World' }));
// Hello World!
```

## API

### `t(strings, ...keys)`

Tagged template literal. Returns a function `(values, opts?) => string`.

- **Placeholders**: `${'key'}` — property name from the data object.
- **Default values**: `${'key=value'}` — JSON-parsable default when the key is
  missing. Example: `${'greeting="Hello"'}` or `${'count=0'}`.
- **Arrays**: Values are joined with `,` by default. Use `opts.delimiter` to
  customize (e.g. `{ delimiter: ', ' }`).

### `templ(values, opts?)`

Renders the template.

- **values**: Data object. Keys not present render as empty string. `null` and
  `undefined` are treated as `{}`.
- **opts.delimiter**: String (or coercible value) used to join array elements.
  Default: `','`.

## Examples

### With delimiter

```js
console.log(templ(data, { delimiter: ', ' }));
// Ave! Marcus Aurelius, great emperor, philosopher, writer of Rome
```

### With default values

```js
const templ = t`${'greeting='} ${'person="Marcus Aurelius"'}, great ${'positions=["emperor", "philosopher"]'} of Rome from ${'ruleFrom=161'} to ${'ruleTo=180'} AD`;

const data = {
  greeting: 'Valē!',
  person: {
    name: 'Lucius Verus',
    toString() {
      return this.name;
    },
  },
  positions: ['brother', 'emperor', 'co-emperor'],
  ruleFrom: 161,
  ruleTo: 169,
};

console.log(templ(data));
// Valē! Lucius Verus, great brother,emperor,co-emperor of Rome from 161 to 180 AD
```

## License & Contributors

Copyright (c) 2017-2026 [Metarhia contributors](https://github.com/metarhia/tickplate/graphs/contributors).
Tickplate is [MIT licensed](./LICENSE).
Tickplate is a part of [Metarhia](https://github.com/metarhia) technology stack.
