'use strict';

const t = require('./tickplate.js');

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
