var _ = require('underscore');
var Radio = require('backbone.radio');
var Marionette = require('backbone.marionette');
var AppController = require('./controllers/app-controller');

var Router = Marionette.AppRouter.extend({
  initialize: function(options) {
    var routerChannel = Radio.channel('router');

    routerChannel.comply('navigate', _.bind(this.navigateTo, this));

    this.controller = new AppController({
      app: options.app
    });
  },

  navigateTo: function(hash, options) {
    this.navigate(hash, options);
  },

  appRoutes: {
    '': 'showIndex',
    'index(/s:sort)(/o:order)(/l:layout)': 'showIndex',
    'details/:id': 'showDetails'
  }
});

module.exports = Router;
