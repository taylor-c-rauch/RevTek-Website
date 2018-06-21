import React, { Component } from "react";
import TopBar from "./top-bar";
import "./SignUp.css";

export default class NotApproved extends Component {
  render() {
    return (
      <div class="backdrop">
        <section>
          <TopBar
            person={this.props.person}
            status="home"
            user={this.props.user}
            updateField={this.props.updateField}
          />
          <div class="HeaderFiller" />
          <div class="LoginBackground">
            <h1 class="RobotoTitle">Your account is not yet approved</h1>

            <p2> Registration requires instructor approval. </p2>
            <p2>
              You will receive an email soon regarding your account status.
            </p2>
            <p2> Please try again later. </p2>
          </div>
        </section>
      </div>
    );
  }
}
