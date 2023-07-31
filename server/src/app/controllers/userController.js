const Users = require('../models/Users');
const Codes = require('../models/Code');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const cloudinary = require('../../config/cloudinary');

class userController {
  async sendCode(req, res) {
    try {
      const { email } = req.body;
      const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
      const codeExpiration = new Date(Date.now() + 3600000); // Thời gian hết hạn: 1 giờ

      const user = await Users.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: 'Email not found.' });
      } else {
        const newCode = new Codes({ code, codeExpiration, userEmail: email });
        await newCode.save();
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: '(Todo List Webapp) todolistwebappv1@gmail.com',
          to: email,
          subject: 'Your Verification Code',
          html: `Your verification code is: <b>${code}</b>. If you did not initiate this action, please change your password to secure your account.`,
        };

        await transporter.sendMail(mailOptions);

        res
          .status(200)
          .json({ status: true, message: 'An email has been sent.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          status: false,
          message: 'An error occurred while processing the request.',
        });
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, code } = req.body;
      const codeInfo = await Codes.findOne({
        code,
        userEmail: email,
        codeExpiration: { $gt: Date.now() },
      });
      if (!codeInfo) {
        return res
          .status(404)
          .json({ status: false, message: 'Code not found.' });
      } else {
        if (code === codeInfo.code) {
          return res
            .status(200)
            .json({ status: true, message: 'Correct verification code' });
        } else {
          return res
            .status(404)
            .json({ status: false, message: 'Verification code is incorrect' });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({
          status: false,
          message: 'An error occurred while processing the request.',
        });
    }
  }

  async resetPassword(req, res) {
    const { newPassword, email } = req.body;
    try {
      if (!newPassword || !email) {
        return res
          .status(400)
          .json({ status: false, message: 'Missing password or new password' });
      } else {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        const user = await Users.findOneAndUpdate(
          { email },
          { password: hashedNewPassword }
        );

        if (!user) {
          return res
            .status(400)
            .json({ status: false, message: 'Invalid user' });
        } else {
          return res
            .status(200)
            .json({
              status: true,
              message: 'Password has been reset successfully.',
            });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          status: false,
          message: 'An error occurred while processing the request.',
        });
    }
  }

  async updateUserInfo(req, res) {
    try {
      const { fullName, username, email } = req.body;

      if (!fullName || !username || !email) {
        res.status(400).json({ status: false, message: 'Missing infomation' });
      } else {
        const user = await Users.findByIdAndUpdate(req._id, req.body);
        if (!user) {
          res.status(403).json({ status: false, message: 'User not found' });
        } else {
          res.status(200).json({ status: true, message: 'User updated' });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({
          status: false,
          message: 'An error occurred while processing the request.',
        });
    }
  }

  async uploadFile(req, res) {
    try {
      const { file } = req.body;

      if (!file) {
        return res
          .status(400)
          .json({ status: false, message: 'Missing information' });
      } else {
        const user = await Users.findById(req._id);
        if (!user) {
          return res
            .status(403)
            .json({ status: false, message: 'User not found' });
        } else {
          const result = await cloudinary.uploader.upload(file, {
            upload_preset: 'todolist',
          });
          const imageUrl = result.secure_url;
          user.avatar = imageUrl;
          await user.save();
          return res
            .status(200)
            .json({ status: true, message: 'User updated' });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: 'Error uploading image' });
    }
  }
}

module.exports = new userController();
