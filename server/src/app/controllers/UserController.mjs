import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import { createTransport } from 'nodemailer';
import cloudinary from '../../config/cloudinary/index.mjs';
import { Base64 } from 'js-base64';
import Users from '../models/Users.mjs';
import Codes from '../models/Code.mjs';

dotenv.config();

class UserController {
  async sendCode(req, res) {
    try {
      const { email } = req.body;
      const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
      const codeExpiration = new Date(Date.now() + 3600000); // Thời gian hết hạn: 1 giờ

      const user = await Users.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'Email not found.' });
      }

      const newCode = new Codes({ code, codeExpiration, userEmail: email });
      await newCode.save();

      const transporter = createTransport({
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

      return res
        .status(200)
        .json({ success: true, message: 'An email has been sent.' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
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
          .json({ success: false, message: 'Code not found.' });
      }

      if (code === codeInfo.code) {
        return res
          .status(200)
          .json({ success: true, message: 'Correct verification code' });
      }

      return res
        .status(404)
        .json({ success: false, message: 'Verification code is incorrect' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async resetPassword(req, res) {
    const { newPassword, email } = req.body;
    try {
      if (!newPassword || !email) {
        return res.status(400).json({
          success: false,
          message: 'Missing password or new password',
        });
      }

      const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
      const user = await Users.findOneAndUpdate(
        { email },
        { password: hashedNewPassword }
      );

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid user' });
      }

      return res.status(200).json({
        success: true,
        message: 'Password has been reset successfully.',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateUserInfo(req, res) {
    const { fullName, username, email, avatar } = req.body;

    try {
      if (!fullName || !username || !email || !avatar) {
        return res
          .status(400)
          .json({ success: false, message: 'Missing information' });
      }

      const user = await Users.findById(req._id);
      if (!user) {
        return res
          .status(403)
          .json({ success: false, message: 'User not found' });
      }

      const uploadResult = await user.uploadFileToCloudinary(avatar);

      if (!uploadResult.status) {
        return res
          .status(500)
          .json({ success: false, message: 'Error uploading avatar' });
      }

      user.fullName = fullName;
      user.username = username;
      user.email = email;
      user.avatar = uploadResult.imageUrl;
      await user.save();

      return res.status(200).json({ success: true, message: 'User updated' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async uploadFile(req, res) {
    const { file } = req.file;
    try {
      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'Missing information',
        });
      }

      const result = await cloudinary.uploader.upload(file, {
        upload_preset: process.env.UPLOAD_PRESET,
      });

      return res.status(200).json({
        success: true,
        message: 'Upload successful',
        imageUrl: result.secure_url,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error uploading image',
        error: error.message,
      });
    }
  }

  async encodeDescription(req, res) {
    const { description, isChecked } = req.body;
    try {
      if (!isChecked) {
        const encode = Base64.encode(description);
        return res.status(200).json({ success: true, message: 'OK', data: encode });
      } else {
        const encode = Base64.encode(description);
        return res.status(200).json({ success: true, message: 'OK', data: encode });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error uploading image',
        error: error.message,
      });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await Users.find({});
      return res
        .status(200)
        .json({ success: true, message: 'Get Successful!', data: users });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async deleteUserById(req, res) {
    try {
      const user = await Users.findByIdAndDelete(req.params._id);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'User not found in system' });
      } else {
        return res
          .status(200)
          .json({ success: true, message: 'Delete user successful!' });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new UserController();
