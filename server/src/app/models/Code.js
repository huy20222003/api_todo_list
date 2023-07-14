const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Code = new Schema({
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
        type: String,
        default: '',
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('codes', Code);
