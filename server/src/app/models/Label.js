const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Labels = new Schema(
  {
    name: {
      type: String,
      default: '',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('labels', Labels);
