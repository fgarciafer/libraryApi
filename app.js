'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Routes load
var book_routes = require('./routes/book');
var user_routes = require('./routes/user');
var format_routes = require('./routes/format');
var category_routes = require('./routes/category');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  res.header('Allow', 'GET,POST,PUT,OPTIONS,DELETE');

  next();
});

// base path
app.use('/api', book_routes);
app.use('/api', user_routes);
app.use('/api', format_routes);
app.use('/api', category_routes);
module.exports = app;
