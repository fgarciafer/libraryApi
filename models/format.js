'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Formatchema = Schema({
  name: String
});

module.exports = mongoose.model('Format', Formatchema);
