const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect('mongodb://localhost/phonebook', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connected to mongodb...'))
    .catch(e => console.log(e));
};
