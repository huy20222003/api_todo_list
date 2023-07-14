const Users = require('../models/Users');
const Code = require('../models/Code');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

class userController {
    async update_password(req, res) {
        const { oldPassword, newPassword } = req.body;
      
        if (!oldPassword || !newPassword) {
          res.status(400).json({ status: false, message: 'Missing password or new password' });
          return;
        }
      
        try {
          const hashedNewPassword = await bcrypt.hash(newPassword, 8);
      
          const user = await Users.findByIdAndUpdate(req._id, {
            password: hashedNewPassword
          });
      
          if (!user) {
            res.status(400).json({ status: false, message: 'Password update failed' });
          } else {
            res.status(200).json({ status: true, message: 'Password update successful' });
          }
        } catch (error) {
          res.status(500).json({ status: false, message: error });
        }
    }

    async sendCode(req, res) {
      try {
        const { email } = req.body;
        const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
        const codeExpiration = new Date(Date.now() + 3600000); // Thời gian hết hạn: 1 giờ
    
        const user = await Users.findOne({ email });
    
        if (!user) {
          return res.status(404).json({status: false, message: 'Email not found.' });
        } else {
          const newCode = new Code({ code, codeExpiration, userEmail: email });
          await newCode.save();
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD // Thay YOUR_PASSWORD bằng mật khẩu của tài khoản Gmail của bạn
            }
          });
    
          const mailOptions = {
            from: '(Todo List Webapp) todolistwebappv1@gmail.com',
            to: email,
            subject: 'Your Verification Code',
            html: `Your verification code is: <b>${code}</b>. If you did not initiate this action, please change your password to secure your account.`,
          };
    
          await transporter.sendMail(mailOptions);
    
          res.status(200).json({ status: true, message: 'An email with instructions to reset your password has been sent.' });
        }
      } catch (error) {
        res.status(500).json({ status: false, message: 'An error occurred while processing the request.' });
      }
    }

    async verifyCode(req, res) {
      const { email, code } = req.body;
      try {
        const codeInfo = await Code.findOne({
          code,
          userEmail: email,
          codeExpiration: { $gt: Date.now() }
        });
        if(!codeInfo) {
          return res.status(404).json({ status: false, message: 'Code not found.' });
        } else {
          if(code === codeInfo.code) {
            return res.status(200).json({status: true, message: 'Correct verification code'});
          } else {
            return res.status(404).json({ status: false, message: 'Verification code is incorrect' });
          }
        }
      } catch (error) {
        res.status(500).json({ status: false, message: 'An error occurred while processing the request.' });
      }
    }

    async resetPassword(req, res) {
      const { newPassword, code } = req.body;
      if (!newPassword) {
        res.status(400).json({ status: false, message: 'Missing password or new password' });
        return;
      }
      try {
        const hashedNewPassword = await bcrypt.hash(newPassword, 8);
  
        const user = await Users.findOneAndUpdate(req._id, {
            password: hashedNewPassword}
          );
    
        if (!user) {
          return res.status(400).json({status: false, message: 'Invalid or expired token.' });
        } else {
          res.status(200).json({status: true, message: 'Password has been reset successfully.' });
        }
      } catch (error) {
        res.status(500).json({ status: false, message: 'An error occurred while processing the request.' });
      }    
    }

    async updateUserInfo(req, res) {
      const { fullName, username, email } = req.body;
      if(!fullName || !username || !email) {
        res.status(400).json({status: false, message: 'Missing infomation'});
      } else {
        try {
          const user = Users.findByIdAndUpdate(req._id, {
            fullName,
            username, 
            email
          });
          if(!user) {
            res.status(403).json({status: false, message: 'User not found'});
          } else {
            res.status(200).json({ status: true, message: 'User updated' });
          }
        } catch (error) {
          res.status(500).json({ status: false, message: 'An error occurred while processing the request.' });
        }
      }
    }
}

module.exports = new userController();
