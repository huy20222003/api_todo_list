require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = new Schema({
    fullName: {
        type: String, 
        default: "",
        required: true,
        trim: true
    },
    username: {
        type: String, 
        default: "",
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String, 
        default: "",
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String, 
        default: "",
        required: true,
        trim: true, 
        minLength: 7
    },
    image: {
        type: String,
        default: "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
    },
});

Users.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

module.exports = mongoose.model('users', Users);