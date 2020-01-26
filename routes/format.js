'use strict';

var express = require('express');
var FormatController = require('../controllers/format');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/format/:id', md_auth.ensureAuth, FormatController.getFormat);
api.post('/format', md_auth.ensureAuth, FormatController.saveFormat);
api.get('/formats/:page?', md_auth.ensureAuth, FormatController.getFormats);
api.delete('/format/:id', md_auth.ensureAuth, FormatController.deleteFormat);

module.exports = api;
