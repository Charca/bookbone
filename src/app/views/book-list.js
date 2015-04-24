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
    'bookCoverURL': '[name=book-cover-url]',
    'bookDescription': '[name=book-description]',
    'addBookForm': '#add-book-form',
    'addBookBtn': '#add-book-btn'
  },

  events: {
    'click @ui.addBookBtn': 'addBook'
  },

  initialize: function() {
    this.collection.fetch();
  },

  addBook: function(event) {
    event.preventDefault();

    var book = {
      title: this.ui.bookTitle.val(),
      author: this.ui.bookAuthor.val(),
      cover_url: this.ui.bookCoverURL.val(),
      description: this.ui.bookDescription.val()
    };

    this.collection.create(book, { wait: true });
    this.ui.addBookForm[0].reset();
  }
});

module.exports = BookList;
