'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = Schema({
  title: String,
  author: String,
  year: Number,
  category: { type: Schema.ObjectId, ref: 'Category' },
  description: String,
  readYear: Number,
  image: String,
  format: { type: Schema.ObjectId, ref: 'Format' }
});

module.exports = mongoose.model('Book', BookSchema);
