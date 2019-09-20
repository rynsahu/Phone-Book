import React, { Component } from "react";
import { Link } from "react-router-dom";

class Contacts extends Component {
  render() {
    const { contacts, currentContactId, onClick } = this.props;

    return (
      <div className="list-group">
        {contacts.map(contact => (
          <Link
            key={contact._id}
            className="list-group-item list-group-item-action"
            to={`/contactSummary/${currentContactId}`}
            onClick={() => onClick(contact._id)}
          >
            {contact.name}
          </Link>
        ))}
      </div>
    );
  }
}

export default Contacts;
