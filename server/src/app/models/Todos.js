const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todos = new Schema({
    name: {
        type: String, 
        default: '',
        required: true,
        minLength: 1
    },
    description: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: '',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('todos', Todos);