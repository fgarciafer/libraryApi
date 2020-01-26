'use strict';

var fs = require('fs');
var path = require('path');

var Format = require('../models/format');

function getFormat(req, res) {
  var formatId = req.params.id;

  Format.findById(formatId, (err, format) => {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' });
    } else {
      if (!format) {
        res.status(404).send({ message: 'El formato no existe' });
      } else {
        res.status(200).send({ format: format });
      }
    }
  });
}

function saveFormat(req, res) {
  var format = new Format();
  var params = req.body;

  format.name = params.name;

  format.save((err, formatStored) => {
    if (err) {
      res.status(500).send({ message: 'Error al guardar el formato' });
    } else {
      if (!formatStored) {
        res.status(404).send({ message: 'El formato no ha sido guardado' });
      } else {
        res.status(200).send({ format: formatStored });
      }
    }
  });
}

function getFormats(req, res) {
  if (req.params.page) {
    var page = req.params.page;
  } else {
    var page = 1;
  }

  var itemsPerPage = 4;

  Format.find()
    .sort('name')
    .paginate(page, itemsPerPage, function(err, formats, total) {
      if (err) {
        res.status(500).send({ message: 'Error en la peticion' });
      } else {
        if (!formats) {
          res.status(404).send({ message: 'No hay formatos' });
        } else {
          return res.status(200).send({
            total_items: total,
            formats: formats
          });
        }
      }
    });
}

function deleteFormat(req, res) {
  var formatId = req.params.id;

  Format.findByIdAndRemove(formatId, (err, formatRemoved) => {
    if (err) {
      res.status(500).send({ message: 'Error al borrar el formato' });
    } else {
      if (!formatRemoved) {
        res.status(404).send({ message: 'El formato no ha sido eliminado' });
      } else {
        res.status(200).send({ format: formatRemoved });
      }
    }
  });
}

module.exports = {
  getFormat,
  saveFormat,
  getFormats,
  deleteFormat
};
