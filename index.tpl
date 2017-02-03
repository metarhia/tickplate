<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
  </head>
  <body>
    <h1>${hello}, ${myFriend}!</h1>
    <p>You are ${ experience > 10 ? 'System Architector' : 'Junior' }.</p>
    <p>Page rendered at ${ new Date().toUTCString() }</p>
    <hr>
    <section>
      ${
         blog.reduce((result, {id, title, author, body}) => (
           result + `
            <article>
              <h2>${title}</h2>
              <div class="author">${author}</div>
              <div class="post-body">${body}</div>
            </article>
           `
         ), '')
      }
    </section>
  </body>
</html>
