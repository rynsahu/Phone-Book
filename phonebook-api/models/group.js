const mongoose = require("mongoose");
const Joi = require("joi");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
    trim: true
  },
  contacts: {
    type: [
      {
        name: { type: String, maxlength: 100, required: true, trim: true }
      }
    ],

    required: true
  }
});

const Group = mongoose.model("group", groupSchema);

function validate(group) {
  const contactIdSchema = Joi.array()
    .items(Joi.objectId())
    .min(1)
    .unique()
    .required();

  const schema = {
    name: Joi.string()
      .max(100)
      .required()
      .label("Group name"),
    contactsId: contactIdSchema
  };

  return Joi.validate(group, schema);
}

exports.Group = Group;
exports.validate = validate;
