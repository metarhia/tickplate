## Tickplate

Back-tick template engine for JavaScript

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
      return this.name
    }
  },
  positions: ['imperor', 'philosopher', 'writer']
};

const template1 = t`Example: ${'hello'} ${'myFriend'} great ${'positions'} of Rome`;

console.log(template1(data));
```
