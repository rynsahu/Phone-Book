const express = require("express");
const app = express();
require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

require("./startup/db")();
require("./startup/cors")(app);
require("./startup/routes")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}...`);
});
