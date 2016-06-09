const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');

router.route('/comment')
  .get(commentController.getComments)
  .post(commentController.postComment);

router.route('/comments/:comment_id')
  .put(commentController.putComment)
  .delete(commentController.deleteCommment);

module.exports = router;
