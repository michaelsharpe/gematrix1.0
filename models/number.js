const mongoose = require('mongoose');

const NumberSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  addedAt: { type: Date, required: true, default: Date.now() }
});

function toJSON() {
  return {
    number: this.number
  };
}

Object.assign(NumberSchema.methods, {
  toJSON
});

module.exports = mongoose.model('Number', NumberSchema);
