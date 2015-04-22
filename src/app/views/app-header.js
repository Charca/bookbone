var Marionette = require('backbone.marionette');

var AppHeader = Marionette.ItemView.extend({
  template: require('../templates/app-header.hbs'),
  className: 'page-header'
});

module.exports = AppHeader;
