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

  showIndex: function(sort, order) {
    var collection = new Books();
    collection.setSortAttr(sort);
    collection.setSortOrder(order);
    this.app.contentRegion.show(new BookList({
      collection: collection
    }));
  },

  showDetails: function(bookId) {
    this.app.contentRegion.show(new BookDetails({
      model: new Book({id: bookId})
    }));
  }
});

module.exports = AppController;
