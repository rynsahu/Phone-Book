import React from "react";
import Form from "./common/Form";
import Joi from "joi";
import { createContact } from "../services/contactService";

class ContactForm extends Form {
  state = {
    data: { name: "", phone: "", email: "" },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    phone: Joi.string()
      .length(12)
      .required()
      .regex(/91[0-9]{10}/)
      .label("91 + phone no.")
  };

  doSubmit = async () => {
    try {
      const { name, phone } = this.state.data;
      await createContact(name, phone);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="form">
        <h1>Contact Form</h1>
        <form onSubmit={this.handleSubmit} className="form-style">
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("email", "Email")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default ContactForm;
