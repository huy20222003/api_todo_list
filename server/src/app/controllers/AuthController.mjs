import dotenv from 'dotenv';
import Users from '../models/Users.mjs';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Roles from '../models/Roles.mjs';

dotenv.config();

class AuthController {
  async getUserProfile(req, res) {
    try {
      const user = await Users.findById(req._id).select('-password');
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found!' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'User found!', data: user });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async register(req, res) {
    const { fullName, username, email, password } = req.body;
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required information.',
      });
    }
    try {
      const existingUser = await Users.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username or email already exists!',
        });
      }

      const newUser = new Users({ fullName, username, email, password });
      const role = new Roles({name: 'user'});
      newUser.addRole(role);

      const accessToken = newUser.generateAccessToken();
      const refreshToken = newUser.generateRefreshToken();

      return res.status(200).json({
        success: true,
        message: 'Register successful!',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password.',
      });
    }

    try {
      const user = await Users.findOne({ username });
      
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid username or password!' });
      }

      const passwordMatch = await bcryptjs.compare(password, user.password);

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid username or password!' });
      }

      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      return res.status(201).json({
        success: true,
        message: 'Logged in successfully!',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        return res
          .status(401)
          .json({ success: false, message: 'RefreshToken not found.' });
      }

      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        if (!decoded) {
          return res
            .status(403)
            .json({ success: false, message: 'RefreshToken is invalid.' });
        } else {
          const user = await Users.findById(decoded._id);
          const accessToken = user.generateAccessToken();

          return res.status(200).json({
            success: true,
            message: 'New AccessToken generated!',
            data: accessToken,
          });
        }
      } catch (verifyError) {
        return res
          .status(403)
          .json({ success: false, message: 'RefreshToken is invalid.' });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateRoles(req, res){
    try {
      const { name } = req.body;
  
      const user = await Users.findById(req._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const role = await Roles.findById(user.roles);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      role.name = name;
      await role.save();
  
      return res.json({ message: 'Updated role successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new AuthController();
