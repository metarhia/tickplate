'use strict';

const assert = require('assert').strict;

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

const templ = t`${'hello'} ${'myFriend'}, great ${'positions'} of Rome`;

const expect = 'Ave! Marcus Aurelius, great imperor,philosopher,writer of Rome';
const result = templ(data);
assert.strictEqual(result, expect);
assert.strictEqual(templ({ myFriend: 'Hadrian' }), ' Hadrian, great  of Rome');
assert.strictEqual(templ({ hello: 'Hi!' }), 'Hi! , great  of Rome');
assert.strictEqual(templ({}), ' , great  of Rome');
