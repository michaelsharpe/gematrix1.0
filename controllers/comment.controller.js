const Comment = require('../models/comment');
const { createError, errorCodes } = require('../helpers/error_helper');

function getComment(req, res, next) {
  next();
}

function postComment(req, res, next) {
  next();
}

function putComment(req, res, next) {
  next();
}

function deleteComment(req, res, next) {
  next();
}

module.exports = Object.freeze({
  getComment,
  postComment,
  putComment,
  deleteComment
});
