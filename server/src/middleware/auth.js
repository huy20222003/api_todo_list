require('dotenv').config();
const jwt = require('jsonwebtoken');

async function verify(req, res, next) {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.replace('Bearer ', '');

    // Kiểm tra xem có tồn tại token hay không
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided' });
    } else {
      // Xác thực token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req._id = decoded.user._id; // Lưu thông tin người dùng vào request

      // Kiểm tra và phân quyền truy cập tại đây
      // ...
      next(); // Cho phép đi tiếp tới middleware hoặc route tiếp theo
    }
  } catch (error) {
    res.status(401).json({ status: false, message: 'Unauthorized' });
  }
}

module.exports = verify;
