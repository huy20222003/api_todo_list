const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

//cors
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
const route = require('./routes');

//morgan
app.use(morgan('combine'));

//connect database
const database = require('./config/database');
database.connect();


//router
route(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));