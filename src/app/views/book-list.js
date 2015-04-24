var $ = require('jquery');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Mousetrap = require('mousetrap');
var Marionette = require('backbone.marionette');

var BookListItem = require('./book-list-item');

var Book = require('../models/book');

var BookList = Marionette.CompositeView.extend({
  template: require('../templates/book-list.hbs'),

  className: 'book-list',

  childView: BookListItem,
  childViewContainer: 'tbody',

  ui: {
    'table': '.table',
    'bookTitle': '[name=book-title]',
    'bookAuthor': '[name=book-author]',
    'bookCoverURL': '[name=book-cover-url]',
    'bookDescription': '[name=book-description]',
    'addBookForm': '#add-book-form',
    'addBookBtn': '#add-book-btn',
    'sortListBtn': '.sort-list',
    'changeLayoutBtn': '.change-layout'
  },

  events: {
    'click @ui.addBookBtn': 'addBook',
    'click @ui.sortListBtn': 'sortList',
    'click @ui.changeLayoutBtn': 'changeLayout'
  },

  layout: 'table',

  initialize: function(options) {
    this.collection.fetch();
    this.layout = (options.layout) ? options.layout.substring(1) : this.layout;
    Mousetrap.bind(['t', 'g'], _.bind(this.changeLayout, this));
  },

  onRender: function() {
    this.setLayout();
  },

  onDestroy: function() {
    Mousetrap.unbind('t');
    Mousetrap.unbind('g');
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

    var sortAttr = $(event.currentTarget).attr('data-sort-by');
    if(this.collection.sortAttr === sortAttr) {
      this.collection.sortOrder *= -1;
    } else {
      this.collection.sortOrder = 1;
    }

    this.collection.sortAttr = sortAttr;
    this.collection.sort();

    this._triggerNavigate();
  },

  changeLayout: function(event, key) {
    var layout;

    if(event instanceof KeyboardEvent) {
      layout = (key === 'g') ? 'grid' : 'table';
    } else {
      layout = $(event.currentTarget).attr('data-layout');
    }

    this.setLayout(layout);
    this._triggerNavigate();
  },

  setLayout: function(layout) {
    this.layout = layout || this.layout;
    this.ui.changeLayoutBtn.removeClass('active');
    this.$('[data-layout=' + this.layout + ']').addClass('active');

    this.ui.table
      .removeClass (function (index, css) {
        return (css.match (/(^|\s)layout-\S+/g) || []).join(' ');
      })
      .addClass('layout-' + this.layout);
  },

  _triggerNavigate: function() {
    var routerChannel = Radio.channel('router');

    routerChannel.command('navigate', this._generateHash());
  },

  _generateHash: function() {
    var hash = 'index';
    hash += '/s:' + this.collection.sortAttr;
    hash += '/o:' + ((this.collection.sortOrder > 0) ? 'asc' : 'desc');
    hash += '/l:' + this.layout;

    return hash;
  }
});

module.exports = BookList;
