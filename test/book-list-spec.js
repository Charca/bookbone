require('../src/bootstrap');
var Books = require('../src/app/models/books');
var BookList = require('../src/app/views/book-list');

var server;
var collection;
var view;

describe('BookList', function() {

  beforeEach(function() {
    server = sinon.fakeServer.create();

    collection = new Books([
      { title: 'My first book' },
      { title: 'My second book' }
    ]);

    view = new BookList({
      collection: collection
    });
  });

  afterEach(function() {
    server.restore();
    view.destroy();
  });

  describe('render', function() {
    it('renders a collection of books', function() {
      view.render();

      expect(view.children.length).toEqual(2);
    });

    it('updates the collection of books after removing a book', function() {
      view.render();

      collection.pop();

      expect(view.children.length).toEqual(1);
    });

    it('updates the collection of books after adding a book', function() {
      view.render();

      collection.create({
        title: 'A brand new book'
      });

      expect(view.children.length).toEqual(3);
    });
  });

  describe('events', function() {
    it('clears the form after adding a book', function() {
      view.render();

      view.ui.bookTitle.val('Title of the new book');
      view.ui.addBookBtn.click();

      expect(view.ui.bookTitle.val()).toEqual('');
    });

    it('sorts the collection in asc and desc orders', function() {
      view.render();

      expect(collection.at(0).get('title')).toBe('My first book');

      view.$('[data-sort-by=title]').click();

      expect(collection.at(0).get('title')).toBe('My second book');
    });
  });
});