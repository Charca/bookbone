var Backbone = require('backbone');
var Book = require('./book');

var Books = Backbone.Collection.extend({
  model: Book,
  url: '/books',
  sortAttr: 'title',
  sortOrder: 1,
  initialize: function(options) {
    this.setSortAttr(options.sort);
    this.setSortOrder(options.order);
  },
  comparator: function(a, b) {
    var first = this.prepareValue(a.get(this.sortAttr));
    var second = this.prepareValue(b.get(this.sortAttr));
    return (+(first > second) || +(first === second) - 1) * this.sortOrder;
  },
  prepareValue: function(value) {
    return (typeof value === 'string') ? value.toLowerCase() : value;
  },
  setSortAttr: function(sort) {
    this.sortAttr = (sort) ? sort.substring(1) : this.sortAttr;
  },
  setSortOrder: function(order) {
    this.sortOrder = (order) ? (order.substring(1) === 'asc') ? 1 : -1 : this.sortOrder;
  }
});

module.exports = Books;
