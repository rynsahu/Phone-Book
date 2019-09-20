import React, { Component } from "react";

class ContactSummary extends Component {
  state = {
    contact: {
      isFavorite: "",
      name: "",
      phone: "",
      _id: ""
    }
  };

  render() {
    const { currentContactId } = this.props;

    return (
      <React.Fragment>
        <div className="ContactSummary-coverImg"></div>
        <h2>{`Contact id: ${currentContactId}`}</h2>
      </React.Fragment>
    );
  }
}

export default ContactSummary;
