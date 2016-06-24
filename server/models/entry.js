const mongoose = require('mongoose');
const Comment = require('./comment');

const EntrySchema = new mongoose.Schema({
  numeralId: { type: mongoose.Schema.Types.ObjectId, ref: 'Numeral', required: true },
  word: { type: 'String', required: true },
  language: { type: 'String', required: true },
  pronunciation: { type: 'String' },
  definition: { type: 'String' },
  comments: [Comment.schema],
  see: [{ type: Number }]
});

const seeUrl = (num) => `/numerals/${num}`;

function toJSON() {
  return {
    id: this.id,
    numeralId: this.numeralId,
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
