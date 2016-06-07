const Number = require('../models/number');

function getNumber(res, req, next) {
  next();
}

function postNumber(res, req, next) {
  next();
}

function putNumber(res, req, next) {
  next();
}

function deleteNumber(res, req, next) {
  next();
}

module.exports = Object.freeze({
  getNumber,
  postNumber,
  putNumber,
  deleteNumber
});
