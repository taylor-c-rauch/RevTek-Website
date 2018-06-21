import React, { Component } from 'react';
import TopBar from "./top-bar";

export default class NotApproved extends Component {
  render() {
    return (
      <div>
        <TopBar person={this.props.person} status="home" user={this.props.user} updateField={this.props.updateField} />
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <h1>Your account is not yet approved! Please try again later!</h1>
          <h2> Registration requires instructor approval. You will receive an email soon regarding your account status. </h2>
          <p> Please sign out. </p>
        </div>
      </div>
    )
  }
}