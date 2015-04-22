var Marionette = require('backbone.marionette');

var BookListItem = Marionette.ItemView.extend({
  template: require('../templates/book-list-item.hbs'),

  tagName: 'tr'
});

module.exports = BookListItem;
