const mongoose = require('mongoose');
const Comment = require('./comment');

const EntrySchema = new mongoose.Schema({
  numeral: { type: mongoose.Schema.Types.ObjectId, ref: 'Numeral', required: true },
  word: { type: 'String', required: true },
  language: { type: 'String', required: true },
  pronunciation: { type: 'String', required: true },
  alternateSpelling: { type: 'String', required: true },
  comments: [Comment.schema],
  see: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Numeral' }]
});

function toJSON() {
  return {
    id: this.id,
    numeral: this.numeral,
    word: this.word,
    language: this.language,
    pronunciation: this.pronunciation,
    alternateSpelling: this.alternateSpelling,
    comments: this.comments,
    see: this.see
  };
}

Object.assign(EntrySchema.methods, {
  toJSON
});

module.exports = mongoose.model('Entry', EntrySchema);
