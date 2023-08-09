import { Schema, model } from 'mongoose';

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

export default model('labels', Labels);
