require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const corsMiddleware = require('./middleware/corsMiddleware');

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

//router
const route = require('./routes');

//morgan
app.use(morgan('combine'));

//connect database
const database = require('./config/database');
database.connect();

//cors
app.use(corsMiddleware);
//app.options('*', cors());

//router
route(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
