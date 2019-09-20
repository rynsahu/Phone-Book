import React, { Component } from "react";

class ContactSummary extends Component {
  state = {
    isFavorite: "",
    _id: "",
    name: "",
    phone: ""
  };

  componentDidMount() {
    const contactId = this.props.match.params.id;
    console.log(contactId);
  }

  render() {
    const { contacts, currentContactId } = this.props;

    return (
      <React.Fragment>
        <div className="ContactSummary-coverImg"></div>
        <h2>{`Contact id: ${currentContactId}`}</h2>
      </React.Fragment>
    );
  }
}

export default ContactSummary;
