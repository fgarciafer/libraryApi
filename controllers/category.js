'use strict';

var fs = require('fs');
var path = require('path');

var Category = require('../models/category');

function getCategory(req, res) {
  var categoryId = req.params.id;

  Category.findById(categoryId, (err, category) => {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' });
    } else {
      if (!category) {
        res.status(404).send({ message: 'La categoria no existe' });
      } else {
        res.status(200).send({ category: category });
      }
    }
  });
}

function saveCategory(req, res) {
  var category = new Category();
  var params = req.body;

  category.name = params.name;

  category.save((err, categoryStored) => {
    if (err) {
      res.status(500).send({ message: 'Error al guardar la categoria' });
    } else {
      if (!categoryStored) {
        res.status(404).send({ message: 'La categoria no ha sido guardada' });
      } else {
        res.status(200).send({ category: categoryStored });
      }
    }
  });
}

function getCategories(req, res) {
  if (req.params.page) {
    var page = req.params.page;
  } else {
    var page = 1;
  }

  var itemsPerPage = 4;

  Category.find()
    .sort('name')
    .paginate(page, itemsPerPage, function(err, categories, total) {
      if (err) {
        res.status(500).send({ message: 'Error en la peticion' });
      } else {
        if (!categories) {
          res.status(404).send({ message: 'No hay categorias' });
        } else {
          return res.status(200).send({
            total_items: total,
            categories: categories
          });
        }
      }
    });
}

function deleteCategory(req, res) {
  var categoryId = req.params.id;

  Category.findByIdAndRemove(categoryId, (err, categoryRemoved) => {
    if (err) {
      res.status(500).send({ message: 'Error al borrar la categoria' });
    } else {
      if (!categoryRemoved) {
        res.status(404).send({ message: 'La categoria no ha sido eliminada' });
      } else {
        res.status(200).send({ category: categoryRemoved });
      }
    }
  });
}

module.exports = {
  getCategory,
  saveCategory,
  getCategories,
  deleteCategory
};
