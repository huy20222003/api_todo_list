// middleware/cors.js
function corsMiddleware(req, res, next) {
    // Thay thế 'https://todolist-webapp-v1.netlify.app' bằng origin của ứng dụng web của bạn
    res.setHeader('Access-Control-Allow-Origin', 'https://todolist-webapp-v1.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Nếu trình duyệt gửi một yêu cầu OPTIONS (preflight request), trả về phản hồi 200
    // để cho phép trình duyệt tiếp tục yêu cầu chính thức.
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      // Nếu không phải yêu cầu OPTIONS, tiếp tục xử lý yêu cầu tiếp theo
      next();
    }
}

module.exports = corsMiddleware;


  