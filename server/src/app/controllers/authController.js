const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


class authController {
    async register(req, res) {
        const { fullName, username, email, password, comfirmPassword } = req.body;
        if(!username || !fullName || !email || !password || !comfirmPassword) {
            return res.status(400).json({status: false, message: 'Please check the information again'});
        }
        try {
            const user = await Users.findOne({ username });
            if(user) {
                return res.status(400).json({ status: false, message: 'Username already exists' });
            }else {
                const newUser = new Users({ fullName, username, email, password, comfirmPassword });
                const accessToken = jwt.sign({ newUser }, proccess.env.TOKEN_SECRET);
                await newUser.save();
                return res.status(200).json({ status: true, message: 'Register successful', accessToken });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({ status: false, message: 'Please check the information again' });
        }

        try {
            const user = await Users.findOne({ username });
            if (!user) {
            return res.status(401).json({ status: false, message: 'User not found' });
            }

            // So sánh mật khẩu đã băm
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ status: false, message: 'Invalid username or password' });
            }
            const accessToken = jwt.sign({ user }, proccess.env.TOKEN_SECRET);
            res.status(201).json({ status: true, message: 'Logged successfully! ', accessToken });
        } catch(error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async logout(req, res, next) {
        //something
    }
}

module.exports = new authController();
