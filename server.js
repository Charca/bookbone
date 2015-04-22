var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser');
var books = require('./database');
var app = express();
var server;

app.use(bodyParser.json());

// Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

// Service Routes
app.get('/books', function(req, res) {
  res.json(books);
});

app.get('/books/:id', function(req, res) {
  var book = _.findWhere(books, {id: parseInt(req.params.id, 10)});
  if(!book) {
    res.statusCode = 404;
    return res.send('Error 404: Book not found');
  }
  res.json(book);
});

app.post('/books', function(req, res) {
  var book = req.body;
  var maxId = _.max(books, function(book) {
    return book.id;
  });
  var id = maxId.id + 1;

  book.id = id;
  books.push(book);
  res.json(book);
});

app.delete('/books/:id', function(req, res) {
  var book = _.findWhere(books, {id: parseInt(req.params.id, 10)});

  books = _.without(books, book);
  res.json({});
});

// Static files serve
app.use(express.static('public'));

// Run the server
server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App running at http://%s:%s', host, port);
});