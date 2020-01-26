'use strict';

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Book = require('../models/book');

function getBook(req, res) {
  var bookId = req.params.id;

  Book.findById(bookId).exec((err, book) => {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' });
    } else {
      if (!album) {
        res.status(404).send({ message: 'El libro no existe' });
      } else {
        res.status(200).send({ book: book });
      }
    }
  });
}

function getBooks(req, res) {
  if (req.params.page) {
    var page = req.params.page;
  } else {
    var page = 1;
  }

  var itemsPerPage = 4;

  Book.find()
    .sort('title')
    .paginate(page, itemsPerPage, function(err, books, total) {
      if (err) {
        res.status(500).send({ message: 'Error en la peticion' });
      } else {
        if (!books) {
          res.status(404).send({ message: 'No hay libros' });
        } else {
          return res.status(200).send({
            total_items: total,
            books: books
          });
        }
      }
    });
}

function getBookByName(req, res) {
  if (req.params.page) {
    var page = req.params.page;
  } else {
    var page = 1;
  }
  var itemsPerPage = 4;

  var bookName = req.params.name;
  var ExpReg = new RegExp(bookName);

  Book.find({ title: ExpReg }).paginate(page, itemsPerPage, function(
    err,
    books,
    total
  ) {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' });
    } else {
      if (!books) {
        res.status(404).send({ message: 'No hay libros' });
      } else {
        return res.status(200).send({
          total_items: total,
          books: books
        });
      }
    }
  });
}

function updateBook(req, res) {
  var bookId = req.params.id;
  var update = req.body;

  Book.findByIdAndUpdate(bookId, update, (err, bookUpdated) => {
    if (err) {
      res.status(500).send({ message: 'Error al guardar el libro' });
    } else {
      if (!artistUpdated) {
        res.status(404).send({ message: 'El libro no ha sido actualizado' });
      } else {
        res.status(200).send({ book: bookUpdated });
      }
    }
  });
}

function deleteBook(req, res) {
  var bookId = req.params.id;

  Book.findByIdAndRemove(bookId, (err, bookRemoved) => {
    if (err) {
      res.status(500).send({ message: 'Error al borrar el libro' });
    } else {
      if (!bookRemoved) {
        res.status(404).send({ message: 'El libro no ha sido eliminado' });
      } else {
        res.status(200).send({ book: bookRemoved });
      }
    }
  });
}

function saveBook(req, res) {
  var book = new Book();
  var params = req.body;

  book.title = params.name;
  book.description = params.description;
  book.author = params.author;
  book.year = params.year;
  book.readYear = 0;
  book.description = params.description;
  book.category = params.category;
  book.format = params.format;
  book.image = 'null';

  book.save((err, bookStored) => {
    console.info(err);
    if (err) {
      res.status(500).send({ message: 'Error al guardar el libro' });
    } else {
      if (!bookStored) {
        res.status(404).send({ message: 'El libro no ha sido guardado' });
      } else {
        res.status(200).send({ book: bookStored });
      }
    }
  });
}

function uploadImage(req, res) {
  var bookId = req.params.id;
  var file_name = 'No subido...';

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('.');
    var file_ext = ext_split[1];

    if (
      file_ext.toUpperCase() == 'PNG' ||
      file_ext.toUpperCase() == 'JPG' ||
      file_ext.toUpperCase() == 'GIF'
    ) {
      Book.findByIdAndUpdate(
        bookId,
        { image: file_name },
        (err, bookUpdated) => {
          if (!bookUpdated) {
            res
              .status(404)
              .send({ message: 'No se ha podido actualizar el libro' });
          } else {
            res.status(200).send({ book: bookUpdated });
          }
        }
      );
    } else {
      res.status(200).send({ message: 'Extension del archivo no correcta' });
    }
    console.log(file_split);
  } else {
    res.status(200).send({ message: 'No ha subido ninguna imagen...' });
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './uploads/books/' + imageFile;
  console.log(path_file);

  fs.exists(path_file, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ message: 'No existe la imagen...' });
    }
  });
}

module.exports = {
  getBook,
  getBookByName,
  updateBook,
  deleteBook,
  saveBook,
  uploadImage,
  getImageFile,
  getBooks
};
