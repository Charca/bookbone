var Marionette = require('backbone.marionette');

var BookDetails = Marionette.ItemView.extend({
  template: require('../templates/book-details.hbs'),
  className: 'row',

  modelEvents: {
    'sync': 'render'
  },

  initialize: function() {
    this.model.fetch();
  }
});

module.exports = BookDetails;
