'use strict';

const assert = require('node:assert').strict;

const t = require('./tickplate.js');

{
  ({ description: 'No fallbacks used.' });

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
    'Ave! Marcus Aurelius, great emperor,philosopher,writer of Rome';
  const result = templ(data);
  assert.strictEqual(result, expect);
  assert.strictEqual(
    templ({ myFriend: 'Hadrian' }),
    ' Hadrian, great  of Rome',
  );
  assert.strictEqual(templ({ hello: 'Hi!' }), 'Hi! , great  of Rome');
  assert.strictEqual(templ({}), ' , great  of Rome');
}

{
  ({
    description:
      'Fallback primitives and arrays of primitives provided, with "=" separator, empty spaces around trimmed',
  });

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
    'Ave! Lucius Verus, great brother,emperor,co-emperor of Rome from 161 to 169 AD';
  const result = templ(data);
  assert.strictEqual(result, expect);
  assert.strictEqual(
    templ({}),
    ' Marcus Aurelius, great emperor,philosopher of Rome from 161 to 180 AD',
  );
  assert.strictEqual(
    templ({ greeting: 'Valē!!!', ruleFrom: '44 BC', ruleTo: 2023 }),
    'Valē!!! Marcus Aurelius, great emperor,philosopher of Rome from 44 BC to 2023 AD',
  );

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
}

{
  ({ description: 'No fallbacks used, but values not passed either' });

  const templ = t`${'hello='} ${'myFriend='}, great ${'positions='} of Rome`;
  const expect = ' , great  of Rome';
  const result = templ({});

  assert.strictEqual(result, expect);
}
