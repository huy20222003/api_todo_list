const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

//router
const route = require('./routes');

//morgan
app.use(morgan('dev')); // Use 'dev' instead of 'combine'

//connect database
const database = require('./config/database');
database.connect();

//cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://todolist-webapp-v1.netlify.app'); // Thay thế URL của ứng dụng web của bạn
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//router
route(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
