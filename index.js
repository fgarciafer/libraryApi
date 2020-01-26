'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/library', (err, res) => {
  if (err) {
    throw err;
  }
  console.info('La BBDD esta funcionando correctamente.');
  app.listen(port, function() {
    console.log(`Library api server listen on localhost port ${port}`);
  });
});
