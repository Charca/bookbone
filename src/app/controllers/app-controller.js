var Marionette = require('backbone.marionette');

// Views
var BookList = require('../views/book-list');
var BookDetails = require('../views/book-details');

// Models - Collections
var Books = require('../models/books');
var Book = require('../models/book');

var AppController = Marionette.Controller.extend({
  initialize: function(options) {
    this.app = options.app;
  },

  showIndex: function(sort, order, layout) {
    var collection = new Books({
      sort: sort,
      order: order
    });

    this.app.contentRegion.show(new BookList({
      collection: collection,
      layout: layout
    }));
  },

  showDetails: function(bookId) {
    this.app.contentRegion.show(new BookDetails({
      model: new Book({id: bookId})
    }));
  }
});

module.exports = AppController;
