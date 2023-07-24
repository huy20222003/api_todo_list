require('dotenv').config();
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
app.use(morgan('dev')); 

//connect database
const database = require('./config/database');
database.connect();

//cors
const corsOptions = {
  origin: 'https://todolist-webapp-v1.netlify.app/', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};
app.use(cors(corsOptions));
// app.options('*', cors());

//router
route(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));