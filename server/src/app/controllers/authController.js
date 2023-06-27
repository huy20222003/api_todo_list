const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


class authController {
    async users(req, res) {
        try {
            const user = await Users.findById(req._id).select('-password');
            if(!user) {
                res.status(400).json({status: false, message: 'User not found!'});
            } else {
                res.status(200).json({status: true, message: 'User found!', user});
            }
        } catch (error) {
            res.status(400).json({status: false, message: error});
        }
    }

    async register(req, res) {
        const { fullName, username, email, password, confirmPassword } = req.body;
        if(!username || !fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({status: false, message: 'Please check the information again!'});
        }
        try {
            const user = await Users.findOne({ username, email });
            if(user) {
                return res.status(400).json({ status: false, message: 'Username or email already exists!' });
            }else {
                const newUser = new Users({ fullName, username, email, password, comfirmPassword });
                const accessToken = jwt.sign({ newUser }, 'TOKEN_SECRET');
                await newUser.save();
                return res.status(200).json({ status: true, message: 'Register successful!', accessToken });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({ status: false, message: 'Please check the information again!' });
        }

        try {
            const user = await Users.findOne({ username });
            if (!user) {
            return res.status(401).json({ status: false, message: 'User not found!' });
            }

            // So sánh mật khẩu đã băm
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch);
            if (!passwordMatch) {
                return res.status(401).json({ status: false, message: 'Invalid username or password!' });
            }
            const accessToken = jwt.sign({ user }, 'TOKEN_SECRET');
            res.status(201).json({ status: true, message: 'Logged successfully! ', accessToken });
        } catch(error) {
            res.status(400).json({ status: false, message: error });
        }
    }
}

module.exports = new authController();

