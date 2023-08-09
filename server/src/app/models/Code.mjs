import { Schema, model } from 'mongoose';

const Codes = new Schema(
  {
    code: {
      type: Number,
      default: '',
      required: true,
    },
    codeExpiration: {
      type: Date,
      required: true,
    },
    userEmail: {
      type: Schema.Types.String,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

export default model('codes', Codes);
