'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Categorychema = Schema({
  name: String
});

module.exports = mongoose.model('Category', Categorychema);
