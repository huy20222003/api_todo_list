const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

class userController {
    async update_password(req, res) {
        const { oldPassword, newPassword, confirmPassword } = req.body;
      
        if (!oldPassword || !newPassword || !confirmPassword) {
          res.status(400).json({ status: false, message: 'Missing password or new password' });
          return;
        }
      
        try {
          const hashedNewPassword = await bcrypt.hash(newPassword, 8);
          const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 8);
      
          const user = await Users.findByIdAndUpdate(req._id, {
            password: hashedNewPassword,
            confirmPassword: hashedConfirmPassword,
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

    async forgotPassword(req, res) {
      try {
        const { email } = req.body;
        const resetToken = Math.floor((Math.random() * (999999 - 100000 + 1) + 100000));
        const resetTokenExpiration = new Date(Date.now() + 3600000); // Thời gian hết hạn: 1 giờ

        const user = await Users.findOneAndUpdate({email}, {
          resetToken,
          resetTokenExpiration
        }, {new: true});
    
        if (!user) {
          return res.status(404).json({ error: 'Email not found.' });
        } else {
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
            subject: 'Reset Your Password',
            text: `You are performing a password reset on the TodoList Webapp.
                    Your verification code is: ${resetToken}
                  If you do not perform this action. Please change your password to secure your account.`,
          };
      
          await transporter.sendMail(mailOptions);
      
          res.status(200).json({ status: true, message: 'An email with instructions to reset your password has been sent.' });
        }
      } catch (error) {
        res.status(500).json({ status: false, message: 'An error occurred while processing the request.' });
      }
    }
    
    async resetPassword(req, res) {
      const { newPassword, confirmPassword, token } = req.body;
      if (!newPassword || !confirmPassword) {
        res.status(400).json({ status: false, message: 'Missing password or new password' });
        return;
      }
      try {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
  
        const user = await Users.findOneAndUpdate({
          resetToken: token,
          resetTokenExpiration: { $gt: Date.now() }, // Kiểm tra xem mã thông báo còn hiệu lực hay không
        }, {
            password: hashedNewPassword,
            confirmPassword: hashedConfirmPassword,
            $unset: { resetTokenExpiration: 1, resetToken: 1 } 
        }, {new: true});
    
        if (!user) {
          return res.status(400).json({status: false, message: 'Invalid or expired token.' });
        } else {
          res.status(200).json({status: true, message: 'Password has been reset successfully.' });
        }
      } catch (error) {
        res.status(500).json({ status: false, message: 'An error occurred while processing the request.' });
      }    
    }
}

module.exports = new userController();
