var Marionette = require('backbone.marionette');

var BookListItem = Marionette.ItemView.extend({
  template: require('../templates/book-list-item.hbs'),

  tagName: 'tr',

  ui: {
    'deleteBookBtn': '.delete-book'
  },

  events: {
    'click @ui.deleteBookBtn': 'deleteBook'
  },

  deleteBook: function(event) {
    event.preventDefault();

    this.model.destroy();
  }
});

module.exports = BookListItem;
