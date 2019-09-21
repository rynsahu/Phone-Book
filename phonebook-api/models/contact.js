const mongoose = require("mongoose");
const Joi = require("Joi");

const Contact = mongoose.model(
  "contact",
  mongoose.Schema({
    name: {
      type: String,
      maxlength: 100,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 256,
      unique: true
    },
    phone: {
      type: String,
      length: 12,
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
    name: Joi.string()
      .max(100)
      .required(),
    phone: Joi.string()
      .length(12)
      .required()
      .regex(/91[0-9]{10}/),
    isFavorite: Joi.boolean(),
    email: Joi.string()
      .email()
      .min(6)
      .max(256)
      .required()
  };

  return Joi.validate(contact, schema);
}

exports.Contact = Contact;
exports.validate = validate;
