import { Schema, model } from 'mongoose';

const Todos = new Schema(
  {
    name: {
      type: String,
      default: '',
      required: true,
      minLength: 1,
    },
    description: {
      type: String,
      default: '',
    },
    label: {
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

export default model('todos', Todos);
