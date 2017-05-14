/* eslint-disable no-template-curly-in-string */

const tickplate = require('../tickplate');

describe('tickplate', () => {
  it('should insert values from parameters', () => {
    const template = '<p>${person.firstName} ${person.lastName}</p>';
    const context = {
      person: {
        firstName: 'FirstName',
        lastName: 'LastName',
      },
    };
    const actual = tickplate(template, context);
    const expected = `<p>${context.person.firstName} ${context.person.lastName}</p>`;
    expect(actual).toBe(expected);
  });

  it('should evaluate functions from parameters', () => {
    const template = '<p>${test()}</p>';
    const context = {
      test: () => 1 + 1,
    };
    const actual = tickplate(template, context);
    const expected = `<p>${context.test()}</p>`;
    expect(actual).toBe(expected);
  });

  it('should correctly escape backticks', () => {
    const template = '<p>`${value}``</p>';
    const context = {
      value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    };
    const actual = tickplate(template, context);
    const expected = `<p>&#96;${context.value}&#96;&#96;</p>`;
    expect(actual).toBe(expected);
  });

  it('should work with nested template literals', () => {
    const template = '<p>${`${`${value}`}`}</p>';
    const context = {
      value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    };
    const actual = tickplate(template, context);
    const expected = `<p>${`${`${context.value}`}`}</p>`;
    expect(actual).toBe(expected);
  });
});
