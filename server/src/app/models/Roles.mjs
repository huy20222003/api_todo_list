import { Schema, model } from "mongoose";

const Roles = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    {
        timestamps: true
    }
);

export default model('roles', Roles);