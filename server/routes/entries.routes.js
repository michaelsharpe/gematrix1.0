const express = require('express');
const router = express.Router();

const entryController = require('../controllers/entry.controller');

// Not as neccessary
router.route('/entries')
  .get(entryController.getEntries)
  .post(entryController.postEntry);

// Neccessary
router.route('/entries/:entry_id')
  .get(entryController.getEntry)
  .put(entryController.putEntry)
  .delete(entryController.deleteEntry);

router.route('/entries/:entry_id/comments')
  .get(entryController.getEntryComments)
  .post(entryController.postEntryComment);

module.exports = router;
