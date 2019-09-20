const express = require('express');
const app = express();
require('express-async-errors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//Database connection
require('./startup/db')();
//Routes
require('./startup/routes')(app);

//PORT
const PORT = process.env.PORT || 5151;
app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}...`);
});
