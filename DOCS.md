# Documentation

Notes about the development of Bookbone:

## Explanation

I built this SPA using Backbone + Marionette because I'm familiar with those frameworks and I wanted to create something functional in a short amount of time. The end result is very simple (and very ugly), but it contains all basic functionality as well as some cool enhancements.

A little bit about the stack:

- It runs on a very simple Express server that's used to serve static files as well as providing the API consumed by the SPA.
- The "database" is just an in-memory JavaScript object that is manipulated by the Express app.
- I use Gulp as the task runner, and it takes care of bundling JavaScript files, compile stylesheets and copy vendor files.
- I use Browserify with the hsbfy transformer to be able to use CommonJS modules and Handlebars templates.
- I use gulp-sass to compile my only .scss file.
- Karma is being used to run unit tests, that are written in Jasmine with the help of Sinon, and running on PhantomJS.

The SPA is a simple book showcase app with the ability to add/remove books from the library. It's a Marionette app with a single Router and a single Layout with two regions, one for the header and one for the content. The main view (views/book-list.js) is a CompositeView that displays both the list of books and the form to add new books to the collection. Each child of this composite view is an ItemView (views/book-list-item.js) that represents a row in the main table. Each row displays some information about the book, as well as a handler to remove it from the collection. The last view in the app shows more information about a particular book (views/book-details.js).

There's only one Backbone Model in the app and it doesn't have any particular functionality. There's also one Backbone Collection to handle comunication with the server, as well as providing methods to sort the list of books it contains.

Other third-party libraries I used: Backbone.Radio for the communication between different modules of the app, Moment.js for readable timestamps, and Mousetrap for keyboard support.

In addition to the basic functionality of the app, it also has a few of the suggested features:
- The collection of books can be sorted by ID, Title and Date in ascendant or descendant order (linkable).
- Two possible layouts to display the collection, table and grid with thumbnails (linkable).
- Keyboard shortcuts to navigate through the app.

The folder structure is also very simple:

```
  src/
    app/
      controllers/
      models/
      templates/
      views/
      app.js
      router.js
    scss/
    bootstrap.js
    main.js
    index.html
```

## Postmortem

I had a lot of fun with this project, it was very simple and straightforward, but with a lot of room for creativity. I only wish I had more time to make it pretty.

I have to recognize it took me more time than I though it would. I didn't suffer any major issues, but I did block myself a couple of times when I was creating the structure. I couldn't decide about the database layer, my first choice was MongoDB but I wanted something simpler to configure and deploy, then I tried Firebase but it was painfully slow (with the free plan). I ended up creating a JavaScript object in memory, it's not the most elegant solution, but I only needed something I could read from and write to, so I could spend more time working on the client-side.

When I started working on the Marionette app I wanted to make it very simple, with as few models and views as possible. But looking at it now, I see that I could have used more room to decouple some of the functionality. For example, the main content view (book-list.js) contains not only the list of books, but also the logic for adding a new book, sorting the list and changing the table layout. I know I could have separate that into multiple views, and that's a problem I often have when using Marionette's CompositeViews, because in addition to the collection you want to show, you can put as much logic as you want in that single view. That would be the first thing I'd do differently next time.

Also, I think that some functionality could be abstracted into separate modules. For example, the logic to handle keyboard shortcuts could live in a mixin or a Marionette Behavior and then implemented in each view as needed.

From a technology standpoint, I don't regret the choices I made for the stack. I used what I'm most familiar with and I think that helped me speed up the development of the app.

I'm very satisfied with the overall result, it needs improvements and some cleanup here and there, but it was a good excercise and I think it was very helpful to identify possible weak points for my next project.