const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  typeId: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() }
});

function toJSON() {
  return {
    id: this.id,
    type: this.type,
    typeId: this.typeId,
    content: this.content,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

Object.assign(CommentSchema.methods, {
  toJSON
});

module.exports = mongoose.model('Comment', CommentSchema);
