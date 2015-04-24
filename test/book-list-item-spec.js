require('../src/bootstrap');
var Book = require('../src/app/models/book');
var BookListItem = require('../src/app/views/book-list-item');

var server;
var model;
var view;

describe('BookListItem', function() {

  beforeEach(function() {
    server = sinon.fakeServer.create();

    model = new Book({
      id: 1,
      title: 'My first book'
    });

    view = new BookListItem({
      model: model
    });
  });

  afterEach(function() {
    server.restore();
    view.destroy();
  });

  describe('render', function() {
    it('renders a single book', function() {
      view.render();

      expect(view.$('.book-list-item-title').html()).toEqual(model.get('title'));
    });
  });

  describe('events', function() {
    it('removes the model after clicking the delete button', function() {
      view.render();

      spyOn(model, 'destroy');

      view.ui.deleteBookBtn.click();

      expect(model.destroy).toHaveBeenCalled();
    });
  });
});