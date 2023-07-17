const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Codes = new Schema({
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
        ref: "users"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('codes', Codes);
