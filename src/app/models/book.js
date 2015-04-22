var Backbone = require('backbone');

var Book = Backbone.Model.extend({
  urlRoot: '/books'
});

module.exports = Book;
