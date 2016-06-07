const express = require('express');
const router = express.Router();

const numberController = require('../controllers/number.controller');

router.route('/number')
  .get(numberController.getNumber)
  .post(numberController.postNumber)
  .put(numberController.putNumber)
  .delete(numberController.deleteNumber);

module.exports = router;
