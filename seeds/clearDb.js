const mongoose = require('mongoose');
const config = require('../config');

function clearDB() {
  for (let i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {});
  }
}


if (mongoose.connection.readyState === 0) {
  mongoose.connect(config.db.test, function (err) {
    if (err) {
      throw err;
    }
    clearDB();
  });
} else {
  clearDB();
}
