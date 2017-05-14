# Tickplate
Backtick template engine for JavaScript

## Install
```
$ npm install --save tickplate
```

## Usage
```js
const tickplate = require('tickplate');

const template = '\
  <article>\n\
    <h2>${article.title}</h2>\n\
    <p>${article.description}</p>\n\
    <span>${article.author.firstName} ${article.author.lastName}</span>\n\
    <span>${article.formattedDate()}</span>\n\
  </article>\
';

const context = {
  article: {
    title: 'Lorem ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    author: {
      firstName: 'FirstName',
      lastName: 'LastName',
    },
    createdAt: new Date(),
    formattedDate() {
      const date = this.createdAt.getDate();
      const month = this.createdAt.getMonth();
      const year = this.createdAt.getFullYear();
      return `${date}.${month}.${year}`;
    },
  },
};

const result = tickplate(template, context);
console.log(result);
```
