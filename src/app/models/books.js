var Backbone = require('backbone');
var Book = require('./book');

var Books = Backbone.Collection.extend({
  model: Book,
  comparator: function(book) {
    return book.get('title').toLowerCase();
  },
  url: '/books'
});

module.exports = Books;
