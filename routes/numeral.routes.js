const express = require('express');
const router = express.Router();

const numeralController = require('../controllers/numeral.controller');

router.route('/numerals')
  .get(numeralController.getNumerals)
  .post(numeralController.postNumeral);

router.route('/numerals/:numeral_id')
  .get(numeralController.getNumeral)
  .put(numeralController.putNumeral)
  .delete(numeralController.deleteNumeral);

router.route('/numerals/:numeral_id/comments')
  .get(numeralController.getNumeralComments)
  .post(numeralController.postNumeralComment);

router.route('/numerals/:numeral_id/entries')
  .get(numeralController.getNumeralEntries)
  .post(numeralController.postNumeralEntry);


module.exports = router;
