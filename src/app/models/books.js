var Backbone = require('backbone');
var Book = require('./book');

var Books = Backbone.Collection.extend({
  model: Book,
  url: '/books'
});

module.exports = Books;
