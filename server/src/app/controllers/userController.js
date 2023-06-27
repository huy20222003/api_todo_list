const Users = require('../models/Users');
const bcrypt = require('bcryptjs');

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
          res.status(400).json({ status: false, message: error });
        }
    }
}

module.exports = new userController();
