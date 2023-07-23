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
app.use(cors({ origin: ['http://localhost:3000', 'http://todolist-sg9c.onrender.com', 'https://todolist-sg9c.onrender.com'], credentials: true }));

//router
route(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
