'use strict';

const { test } = require('node:test');
const assert = require('node:assert').strict;

const t = require('./tickplate.js');

test('no fallbacks: renders with full data', () => {
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
  const expect =
    'Ave! Marcus Aurelius, great emperor, philosopher, writer of Rome';
  assert.strictEqual(templ(data, { delimiter: ', ' }), expect);
});

test('no fallbacks: renders with partial data', () => {
  const templ = t`${'hello'} ${'myFriend'}, great ${'positions'} of Rome`;
  assert.strictEqual(
    templ({ myFriend: 'Hadrian' }),
    ' Hadrian, great  of Rome',
  );
  assert.strictEqual(templ({ hello: 'Hi!' }), 'Hi! , great  of Rome');
});

test('no fallbacks: renders with empty object', () => {
  const templ = t`${'hello'} ${'myFriend'}, great ${'positions'} of Rome`;
  assert.strictEqual(templ({}), ' , great  of Rome');
});

test('fallbacks: uses data over defaults', () => {
  const data = {
    greeting: 'Ave!',
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
  const templ = t`${'greeting='} ${'person = "Marcus Aurelius"'}, great ${'positions  =["emperor", "philosopher"]'} of Rome from ${'ruleFrom = 161'} to ${'ruleTo=180'} AD`;
  const expect =
    'Ave! Lucius Verus, great brother,emperor,' +
    'co-emperor of Rome from 161 to 169 AD';
  assert.strictEqual(templ(data), expect);
});

test('fallbacks: uses defaults when data is empty', () => {
  const templ = t`${'greeting='} ${'person = "Marcus Aurelius"'}, great ${'positions  =["emperor", "philosopher"]'} of Rome from ${'ruleFrom = 161'} to ${'ruleTo=180'} AD`;
  assert.strictEqual(
    templ({}),
    ' Marcus Aurelius, great emperor,philosopher of Rome from 161 to 180 AD',
  );
});

test('fallbacks: merges partial data with defaults', () => {
  const templ = t`${'greeting='} ${'person = "Marcus Aurelius"'}, great ${'positions  =["emperor", "philosopher"]'} of Rome from ${'ruleFrom = 161'} to ${'ruleTo=180'} AD`;
  assert.strictEqual(
    templ({ greeting: 'Valē!!!', ruleFrom: '44 BC', ruleTo: 2023 }),
    'Valē!!! Marcus Aurelius, great emperor,' +
      'philosopher of Rome from 44 BC to 2023 AD',
  );
});

test('fallbacks: handles malformed default syntax', () => {
  const data = {
    greeting: 'Ave!',
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
  const expect =
    'Ave! Lucius Verus, great brother,emperor,' +
    'co-emperor of Rome from 161 to 169 AD';
  const messedUp = t`${'greeting= /\\/'} ${'person = " "'}, great ${'positions  ="emperor", "philosopher"]]'} of Rome from ${'ruleFrom    = undefined'} to ${'ruleTo==180'} AD`;
  assert.strictEqual(messedUp(data), expect);
  assert.strictEqual(messedUp({}), '  , great  of Rome from  to  AD');
  assert.strictEqual(
    messedUp({ greeting: 'No way!' }),
    'No way!  , great  of Rome from  to  AD',
  );
  assert.strictEqual(
    messedUp({
      greeting: 'Papa Roma is',
      person: 'a',
      positions: 'pizzeria',
      ruleFrom: 1970,
      ruleTo: 'today',
    }),
    'Papa Roma is a, great pizzeria of Rome from 1970 to today AD',
  );
});

test('fallbacks with empty values: renders empty placeholders', () => {
  const templ = t`${'hello='} ${'myFriend='}, great ${'positions='} of Rome`;
  assert.strictEqual(templ({}), ' , great  of Rome');
});

const delimiterData = {
  hello: 'Ave!',
  myFriend: {
    name: 'Marcus Aurelius',
    toString() {
      return this.name;
    },
  },
  positions: ['emperor', 'philosopher', 'writer'],
};

const delimiterTestcases = [
  [
    {},
    'Ave! Marcus Aurelius, great emperor,philosopher,writer of Rome',
    'empty object provided, so comma used by default',
  ],
  [
    { delimiter: undefined },
    'Ave! Marcus Aurelius, great emperor,philosopher,writer of Rome',
    'delimiter is undefined, so comma used by default',
  ],
  [
    { delimiter: null },
    'Ave! Marcus Aurelius, great emperornullphilosophernullwriter of Rome',
    'delimiter is null, which gets stringified to "null"',
  ],
  [
    { delimiter: ',' },
    'Ave! Marcus Aurelius, great emperor,philosopher,writer of Rome',
    'delimiter is comma, which is default',
  ],
  [
    { delimiter: ', ' },
    'Ave! Marcus Aurelius, great emperor, philosopher, writer of Rome',
    'delimiter is comma plus whitespace which is the most common case',
  ],
  [
    { delimiter: ' & ' },
    'Ave! Marcus Aurelius, great emperor & philosopher & writer of Rome',
    'delimiter is " & " which is another example of string value',
  ],
  [
    { delimiter: 0 },
    'Ave! Marcus Aurelius, great emperor0philosopher0writer of Rome',
    'delimiter is number 0 which should be stringified to "0"',
  ],
  [
    { delimiter: NaN },
    'Ave! Marcus Aurelius, great emperorNaNphilosopherNaNwriter of Rome',
    'delimiter is number NaN which should be stringified to "NaN"',
  ],
  [
    { delimiter: BigInt('0x1fffffffffffff') },
    'Ave! Marcus Aurelius, great ' +
      'emperor9007199254740991philosopher9007199254740991writer of Rome',
    'delimiter is BigInt which should be stringified',
  ],
  [
    { delimiter: true },
    'Ave! Marcus Aurelius, great emperortruephilosophertruewriter of Rome',
    'delimiter is boolean true which should be stringified to "true"',
  ],
  [
    { delimiter: [', '] },
    'Ave! Marcus Aurelius, great emperor, philosopher, writer of Rome',
    'delimiter is array of single string which should be flattened',
  ],
  [
    { delimiter: new Array(', human, ') },
    'Ave! Marcus Aurelius, great emperor, human, philosopher, human, ' +
      'writer of Rome',
    'delimiter is array of single string which should be flattened',
  ],
  [
    { delimiter: new Object() },
    'Ave! Marcus Aurelius, great emperor[object Object]philosopher' +
      '[object Object]writer of Rome',
    'delimiter is empty object serialized to "[object Object]"',
  ],
  [
    { delimiter: { toString: new Function('', 'return ", and ";') } },
    'Ave! Marcus Aurelius, great emperor, and philosopher, ' +
      'and writer of Rome',
    'delimiter is object with toString defined',
  ],
];

for (const [opts, expected, message] of delimiterTestcases) {
  test(`delimiter: ${message}`, () => {
    const templ = t`${'hello'} ${'myFriend'}, great ${'positions'} of Rome`;
    assert.strictEqual(templ(delimiterData, opts), expected);
  });
}

test('edge case: handles null and undefined values like empty object', () => {
  const templ = t`Hello ${'name'}!`;
  assert.strictEqual(templ(null), 'Hello !');
  assert.strictEqual(templ(undefined), 'Hello !');
});

test('edge case: handles empty template', () => {
  const templ = t``;
  assert.strictEqual(templ({}), '');
  assert.strictEqual(templ(null), '');
});

test('edge case: handles single placeholder with no static text', () => {
  const templ = t`${'x'}`;
  assert.strictEqual(templ({ x: 'hello' }), 'hello');
  assert.strictEqual(templ({}), '');
});
