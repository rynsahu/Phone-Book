const express = require('express');
const contacts = require('../routes/contacts');
const groups = require('../routes/groups');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/contacts', contacts);
  app.use('/groups', groups);
  app.use(error);
};

