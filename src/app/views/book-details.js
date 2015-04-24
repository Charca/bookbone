var _ = require('underscore');
var Radio = require('backbone.radio');
var Mousetrap = require('mousetrap');
var Marionette = require('backbone.marionette');

var BookDetails = Marionette.ItemView.extend({
  template: require('../templates/book-details.hbs'),
  className: 'row',

  modelEvents: {
    'sync': 'render'
  },

  initialize: function() {
    this.model.fetch();
    Mousetrap.bind('i', _.bind(this.goToIndex, this));
  },

  goToIndex: function(event) {
    var routerChannel = Radio.channel('router');

    routerChannel.command('navigate', 'index', { trigger: true });
  }
});

module.exports = BookDetails;
