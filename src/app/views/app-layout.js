var Marionette = require('backbone.marionette');

var AppHeader = require('./app-header');

var AppLayout = Marionette.LayoutView.extend({
  template: require('../templates/app-layout.hbs'),

  regions: {
    header: '#header',
    content: '#content'
  },

  onBeforeShow: function(config) {
    this.getRegion('header').show(new AppHeader());
  }
});

module.exports = AppLayout;
