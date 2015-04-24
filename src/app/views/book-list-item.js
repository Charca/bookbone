var _ = require('underscore');
var Radio = require('backbone.radio');
var Mousetrap = require('mousetrap');
var Marionette = require('backbone.marionette');
var moment = require('moment');


var BookListItem = Marionette.ItemView.extend({
  template: require('../templates/book-list-item.hbs'),

  tagName: 'tr',

  ui: {
    'deleteBookBtn': '.delete-book'
  },

  events: {
    'click @ui.deleteBookBtn': 'deleteBook'
  },

  initialize: function() {
    Mousetrap.bind(this.model.get('id') + '', _.bind(this.goToDetails, this));
  },

  serializeData: function() {
    var data = this.model.toJSON();

    data.created_readable = moment(data.created).calendar();

    return data;
  },

  deleteBook: function(event) {
    event.preventDefault();
    this.model.destroy();
    Mousetrap.unbind(this.model.get('id') + '');
  },

  goToDetails: function(event) {
    var routerChannel = Radio.channel('router');

    routerChannel.command('navigate', 'details/' + this.model.get('id'), { trigger: true });
  }
});

module.exports = BookListItem;
