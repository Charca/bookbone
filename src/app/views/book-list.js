var $ = require('jquery');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Mousetrap = require('mousetrap');
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
    'addBookBtn': '#add-book-btn',
    'sortListBtn': '.sort-list'
  },

  events: {
    'click @ui.addBookBtn': 'addBook',
    'click @ui.sortListBtn': 'sortList'
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
  },

  sortList: function(event) {
    event.preventDefault();
    var hash;
    var routerChannel = Radio.channel('router');

    var sortAttr = $(event.target).attr('data-sort-by');
    if(this.collection.sortAttr === sortAttr) {
      this.collection.sortOrder *= -1;
    } else {
      this.collection.sortOrder = 1;
    }

    this.collection.sortAttr = sortAttr;
    this.collection.sort();

    hash = 'index/s:' + sortAttr + '/o:' + ((this.collection.sortOrder > 0) ? 'asc' : 'desc');
    routerChannel.command('navigate', hash);
  }
});

module.exports = BookList;
