import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

async function authVerify(req, res, next) {
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
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req._id = decoded._id; 

      next(); // Cho phép đi tiếp tới middleware hoặc route tiếp theo
    }
  } catch (error) {
    res.status(401).json({ status: false, message: 'Unauthorized' });
  }
}

export default authVerify;
