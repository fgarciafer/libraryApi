'use strict';

var express = require('express');
var BookController = require('../controllers/book');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/books' });

api.get('/book/:id', md_auth.ensureAuth, BookController.getBook);
api.post('/book', md_auth.ensureAuth, BookController.saveBook);
api.get('/books/:page?', md_auth.ensureAuth, BookController.getBooks);
api.put('/book/:id', md_auth.ensureAuth, BookController.updateBook);
api.delete('/book/:id', md_auth.ensureAuth, BookController.deleteBook);
api.post(
  '/upload-image-book/:id',
  [md_auth.ensureAuth, md_upload],
  BookController.uploadImage
);
api.get('/get-image-book/:imageFile', BookController.getImageFile);
api.get(
  '/bookName/:name/:page?',
  md_auth.ensureAuth,
  BookController.getBookByName
);

module.exports = api;
