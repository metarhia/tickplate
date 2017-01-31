'use strict';

const t = require('./tickplate.js');

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
