const mongoose = require('mongoose');
const Joi = require('Joi');

const Contact = mongoose.model('contact', mongoose.Schema({
    name: {
      type: String,
      maxlength: 100,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      length: 10,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  })
);

function validate(contact) {
    const schema = {
        name: Joi.string().max(100).required(),
        phone: Joi.string().length(10).required(),
        isFavorite: Joi.boolean()
    }

    return Joi.validate(contact, schema);
}

exports.Contact = Contact;
exports.validate = validate;