## Tickplate

Back-tick template engine for JavaScript

## Usage

- Install: `npm install tickplate`
- Require: `const tpl = require('tickplate');`
- Call `tpl` function like that: `tpl(filename, data, your_callback(err, data))`

## Examples:

```javascript
const tpl = require('./tickplate.js');

const data = {
  title: 'Test templated page',
  myFriend: {
    name: 'Marcus',
    surname: 'Aurelius',
    toString() {
      return this.name + ' ' + this.surname;
    }
  },
  experience: 36
};

tpl('./index.tpl', data, (err, data) => console.log(data));
```
