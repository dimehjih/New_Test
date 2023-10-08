require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');
const db = require('./config/database');

const corsOptions = {
  origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:5175'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // This allows cookies and other credentials to be included in the request
  optionsSuccessStatus: 204, // Set the status code for successful preflight requests
  preflightContinue: false, // Disable preflight caching
  maxAge: 3600, // Set the maximum age (in seconds) for the browser to cache preflight requests
};

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
