

let mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/pwd-api');

mongoose.Promise = Promise;

module.exports.EntryModel = require('./entry.js');

