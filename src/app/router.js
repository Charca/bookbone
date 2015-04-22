var Marionette = require('backbone.marionette');
var AppController = require('./controllers/app-controller');

var Router = Marionette.AppRouter.extend({
  initialize: function(options) {
    this.controller = new AppController({
      app: options.app
    });
  },

  appRoutes: {
    '': 'showIndex',
    'details/:id': 'showDetails'
  }
});

module.exports = Router;
