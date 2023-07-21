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
const corsOptions = {
  origin: 'https://todolist-webapp-v1.netlify.app', // Replace with your allowed origin (or '*' for any)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Set the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Set the allowed request headers
};
app.use(cors(corsOptions));
app.options('*', cors());

//router
route(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
