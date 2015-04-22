var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var AppLayout = require('./views/app-layout');
var Router = require('./router');

var App = Marionette.Application.extend({
  regions: {
    main: '#main'
  },

  initialize: function() {
    this.router = new Router({
      app: this
    });

    this.layout = new AppLayout();
    this.getRegion('main').show(this.layout);
    this.contentRegion = this.layout.getRegion('content');
  },

  onStart: function() {
    Backbone.history.start();
  }
});

module.exports = App;
