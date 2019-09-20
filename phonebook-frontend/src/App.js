import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Contacts from "../src/components/contacts";
import ContactSummary from "./components/contactSummary";
import { getContacts } from "./services/contactService";
import NotFound from "./components/not-found";
import ContactForm from "./components/contactForm";
import "./App.css";

class App extends Component {
  state = {
    contacts: [],
    currentContactId: " "
  };

  async componentDidMount() {
    const { data } = await getContacts();
    const contacts = [...data];
    this.setState({ contacts });
  }

  handleClick = contactId => {
    let currentContactId = this.state.currentContactId;
    currentContactId = contactId;

    this.setState({ currentContactId });
  };

  render() {
    const { contacts, currentContactId } = this.state;

    return (
      <React.Fragment>
        <div>
          <Link
            className="btn btn-primary"
            style={{ marginBottom: "10px" }}
            to="/ContactForm"
          >
            Add contact
          </Link>
          <Link
            className="btn btn-primary"
            style={{ marginBottom: "10px", float: "right" }}
            to="/groups/:id"
          >
            Create Group
          </Link>
        </div>
        <main className="row">
          <div className="col-3">
            <Contacts contacts={contacts} onClick={this.handleClick} />
          </div>
          <div className="col-6">
            <Switch>
              <Route path="/" exact component={ContactSummary} />
              <Route
                path="/contactSummary"
                render={props => (
                  <ContactSummary
                    contacts={contacts}
                    currentContactId={currentContactId}
                    {...props}
                  />
                )}
              />
              <Route path="/ContactForm" component={ContactForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
          <div className="col-3"></div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
