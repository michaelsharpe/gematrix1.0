const mongoose = require('mongoose');
const Entry = require('./entry');
const Comment = require('./comment');

const NumeralSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  math: [{ type: String }],
  comments: [Comment.schema],
  entries: [Entry.schema],
  see: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Numeral' }],
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() }
});

function toJSON() {
  return {
    id: this.id,
    value: this.value,
    comments: this.comments,
    entries: this.entries,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

Object.assign(NumeralSchema.methods, {
  toJSON
});

module.exports = mongoose.model('Numeral', NumeralSchema);
