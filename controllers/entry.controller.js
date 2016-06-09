const Entry = require('../models/entry');
const { errorCodes, createError} = require('../helpers/error_helper');

function getEntries(req, res, next) {
  next();
}

function postEntry(req, res, next) {
  next();
}

function getEntry(req, res, next) {
  next();
}

function putEntry(req, res, next) {
  next();
}

function deleteEntry(req, res, next) {
  next();
}

function getEntryComments(req, res, next) {
  next();
}

function postEntryComment(req, res, next) {
  next();
}

module.exports = Object.freeze({
  getEntries,
  postEntry,
  getEntry,
  putEntry,
  deleteEntry,
  getEntryComments,
  postEntryComment
});
