'use strict';

const tpl = require('./tickplate.js');

const data = {
  title: 'Test templated page',
  hello: 'Hello',
  myFriend: {
    name: 'Marcus',
    surname: 'Aurelius',
    toString() {
      return this.name + ' ' + this.surname;
    }
  },
  experience: 36,
  blog: [
    {
      id: 0,
      title: 'What Will Javascript Be Like In 100 Years?',
      author: 'Vladyslav Dukhin',
      body: 'Test blog post'
    },
    {
      id: 1,
      title: 'Node.js and JavaScript instead of the old web',
      author: 'Timur Shemsedinov',
      body: 'Impress is not Express!'
    }
  ]
};

tpl('./index.tpl', data, (err, data) => console.log(data));
