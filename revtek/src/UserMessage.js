import React, { Component } from 'react';
import TopBar from "./top-bar";

export default class UserMessage extends Component {
  render() {
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <TopBar status="home" />
        <h1>Thank you for signing up!</h1>
        <h3> Registration requires instructor approval. You will receive an email soon regarding your account status</h3>
      </div>
    )
  }
}
