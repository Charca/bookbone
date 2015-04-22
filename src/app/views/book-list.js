var _ = require('underscore');
var Marionette = require('backbone.marionette');

var BookListItem = require('./book-list-item');

var Book = require('../models/book');

var BookList = Marionette.CompositeView.extend({
  template: require('../templates/book-list.hbs'),

  childView: BookListItem,
  childViewContainer: 'tbody',

  ui: {
    'bookTitle': '[name=book-title]',
    'bookAuthor': '[name=book-author]',
    'bookDescription': '[name=book-description]',
    'addBookBtn': '#add-book'
  },

  events: {
    'click @ui.addBookBtn': 'addBook'
  },

  initialize: function() {
    this.collection.fetch();
  },

  addBook: function() {
    var book = {
      title: this.ui.bookTitle.val(),
      author: this.ui.bookAuthor.val(),
      description: this.ui.bookDescription.val()
    };

    this.collection.create(book, {wait: true});
  }
});

module.exports = BookList;
