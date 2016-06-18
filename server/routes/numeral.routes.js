const express = require('express');
const router = express.Router();

const numeralController = require('../controllers/numeral.controller');

router.route('/')
  .get((req, res) => {
    res.json({
      success: true,
      message: 'Welcome to the G-Matrix'
    });
  });

router.route('/numerals')
  .get(numeralController.getNumerals)
  .post(numeralController.postNumeral);

router.route('/numerals/:value')
  .get(numeralController.getNumeral)
  .put(numeralController.putNumeral)
  .delete(numeralController.deleteNumeral);

router.route('/numerals/:numeral_id/comments')
  .post(numeralController.postNumeralComment);

router.route('/numerals/:numeral_id/entries')
  .post(numeralController.postNumeralEntry);

module.exports = router;
