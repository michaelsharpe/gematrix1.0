const mongoose = require('mongoose');
const Comment = require('./comment');

const EntrySchema = new mongoose.Schema({
  numeralId: { type: mongoose.Schema.Types.ObjectId, ref: 'Numeral', required: true },
  word: { type: 'String', required: true, unique: true },
  language: { type: 'String', required: true },
  pronunciation: { type: 'String' },
  definition: { type: 'String' },
  comments: [Comment.schema],
  see: [{ type: Number }]
});

function seeUrl(num) {
  return `/numerals/${num}`;
}

function toJSON() {
  return {
    id: this.id,
    numeralId: this.numeral,
    word: this.word,
    language: this.language,
    pronunciation: this.pronunciation,
    definition: this.definition,
    comments: this.comments,
    see: this.see.map(seeUrl)
  };
}

Object.assign(EntrySchema.methods, {
  toJSON
});

module.exports = mongoose.model('Entry', EntrySchema);
