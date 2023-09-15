'use strict';

const assert = require('node:assert').strict;

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

const testcases = [
  [
    {},
    'Ave! Marcus Aurelius, great imperor,philosopher,writer of Rome',
    'empty object provided, so comma used by default',
  ],
  [
    { delimiter: undefined },
    'Ave! Marcus Aurelius, great imperor,philosopher,writer of Rome',
    'delimiter is undefined, so comma used by default',
  ],
  [
    { delimiter: null },
    'Ave! Marcus Aurelius, great imperornullphilosophernullwriter of Rome',
    'delimiter is null, which gets stringified to "null"',
  ],
  [
    { delimiter: ',' },
    'Ave! Marcus Aurelius, great imperor,philosopher,writer of Rome',
    'delimiter is comma, which is default',
  ],
  [
    { delimiter: ', ' },
    'Ave! Marcus Aurelius, great imperor, philosopher, writer of Rome',
    'delimiter is comma plus whitespace, which is the most common case',
  ],
  [
    { delimiter: ' & ' },
    'Ave! Marcus Aurelius, great imperor & philosopher & writer of Rome',
    'delimiter is whitespace ampersand whitespace, which is another example of string value',
  ],
  [
    { delimiter: 0 },
    'Ave! Marcus Aurelius, great imperor0philosopher0writer of Rome',
    'delimiter is number 0, which should be stringified to "0"',
  ],
  [
    { delimiter: NaN },
    'Ave! Marcus Aurelius, great imperorNaNphilosopherNaNwriter of Rome',
    'delimiter is number NaN, which should be stringified to "NaN"',
  ],
  [
    { delimiter: BigInt('0x1fffffffffffff') },
    'Ave! Marcus Aurelius, great imperor9007199254740991philosopher9007199254740991writer of Rome',
    'delimiter is number NaN, which should be stringified to "NaN"',
  ],
  [
    { delimiter: true },
    'Ave! Marcus Aurelius, great imperortruephilosophertruewriter of Rome',
    'delimiter is boolean true, which should be stringified to "true"',
  ],
  [
    { delimiter: [', '] },
    'Ave! Marcus Aurelius, great imperor, philosopher, writer of Rome',
    'delimiter is array of single string, which should be flattened and tringified',
  ],
  [
    { delimiter: new Array(', human, ') },
    'Ave! Marcus Aurelius, great imperor, human, philosopher, human, writer of Rome',
    'delimiter is array of single string, which should be flattened and tringified',
  ],
  [
    { delimiter: new Object() },
    'Ave! Marcus Aurelius, great imperor[object Object]philosopher[object Object]writer of Rome',
    'delimiter is empty object with default serialization to "[object Object]"',
  ],
  [
    { delimiter: { toString: new Function('', 'return ", and ";') } },
    'Ave! Marcus Aurelius, great imperor, and philosopher, and writer of Rome',
    'delimiter is object with serialization defined',
  ],
];

for (const [opts, expected, message] of testcases)
  assert.strictEqual(templ(data, opts), expected, message);
