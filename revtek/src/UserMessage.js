import React, { Component } from "react";
import TopBar from "./top-bar";
import "./SignUp.css";

export default class UserMessage extends Component {
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
            <h1 class="RobotoTitle">Thank you for signing up!</h1>
            <p2>
              {" "}
              Registration requires instructor approval. You will receive an
              email regarding your account status soon.{" "}
            </p2>
          </div>
        </section>
    </div>
      </div>
    );
  }
}
