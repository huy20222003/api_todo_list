require('dotenv').config();
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class authController {
  async users(req, res) {
    try {
      const user = await Users.findById(req._id).select('-password');
      if (!user) {
        res.status(400).json({ status: false, message: 'User not found!' });
      } else {
        res.status(200).json({ status: true, message: 'User found!', user });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }

  async register(req, res) {
    const { fullName, username, email, password } = req.body;
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({
        status: false,
        message: 'Please check the information again!',
      });
    }
    try {
      const user = await Users.findOne({ username, email });
      if (user) {
        return res.status(400).json({
          status: false,
          message: 'Username or email already exists!',
        });
      } else {
        const newUser = new Users({ fullName, username, email, password });
        const accessToken = jwt.sign({ newUser }, process.env.TOKEN_SECRET, {
          expiresIn: '3h',
        });
        const refreshToken = jwt.sign({ user }, process.env.TOKEN_SECRET);
        await newUser.save();
        return res.status(200).json({
          status: true,
          message: 'Register successful!',
          accessToken,
          refreshToken,
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: 'Please check the information again!',
      });
    }

    try {
      const user = await Users.findOne({ username });
      if (!user) {
        res.status(401).json({ status: false, message: 'User not found!' });
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res
            .status(401)
            .json({ status: false, message: 'Invalid username or password!' });
        } else {
          const accessToken = jwt.sign({ user }, process.env.TOKEN_SECRET, {
            expiresIn: '3h',
          });
          const refreshToken = jwt.sign({ user }, process.env.TOKEN_SECRET);
          res.status(201).json({
            status: true,
            message: 'Logged successfully! ',
            accessToken,
            refreshToken,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        res
          .status(401)
          .json({ status: false, message: 'RefreshToken not found' });
      } else {
        const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
        if (!decoded) {
          res
            .status(403)
            .json({ status: false, message: 'RefreshToken is invalid' });
        } else {
          const accessToken = jwt.sign(decoded.user, process.env.TOKEN_SECRET, {
            expiresIn: '3h',
          });
          res.status(200).json({
            status: true,
            message: 'Newly issued AccessToken!',
            accessToken: accessToken,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }
}

module.exports = new authController();
